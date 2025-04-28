import { inject, Injectable } from "@angular/core";
import { Course } from "../model";
import {
  collection,
  Firestore,
  query,
  where,
  collectionData,
  doc,
  updateDoc,
  getDocs,
  writeBatch,
  limit,
  orderBy,
  startAfter,
  getCountFromServer,
} from "@angular/fire/firestore";
import { combineLatest, concatMap, from, map, Observable } from "rxjs";
import firebase from "firebase/compat";
import OrderByDirection = firebase.firestore.OrderByDirection;

export interface IGetCoursesByCategory {
  category: string;
  sortOrder?: OrderByDirection;
  pageNumber?: number;
  pageSize?: number;
}

@Injectable({
  providedIn: "root",
})
export class CourseService {
  private db = inject(Firestore);

  getCoursesByCategory(
    param: IGetCoursesByCategory,
  ): Observable<{ data: Course[]; count: number }> {
    console.log("getCoursesByCategory", param);
    const { category, sortOrder = "asc", pageNumber = 0, pageSize = 3 } = param;
    const coursesCollection = collection(this.db, "courses");
    const q = query(
      coursesCollection,
      where("categories", "array-contains", category),
      orderBy("seqNo", sortOrder),
      limit(pageSize),
      startAfter(pageSize * pageNumber),
    );
    const data = collectionData(q, { idField: "id" }) as Observable<Course[]>;
    const countQuery = getCountFromServer(
      query(coursesCollection, where("categories", "array-contains", category)),
    );
    const count = from(countQuery).pipe(
      map((countResult) => countResult.data().count),
    );

    return combineLatest([data, count]).pipe(map(([data, count]) => ({ data, count })));
  }

  updateCourse(course: Course): Observable<void> {
    const coursesCollection = collection(this.db, "courses");
    const courseDoc = doc(coursesCollection, course.id);
    return from(updateDoc(courseDoc, { ...course }));
  }

  deleteCourseAndLessons(course: Course): Observable<void> {
    const lessons = collection(this.db, `courses/${course.id}/lessons`);
    const courseRef = doc(this.db, `courses/${course.id}`);
    return from(getDocs(lessons)).pipe(
      concatMap((snapshot) => {
        const batch = writeBatch(this.db);
        batch.delete(courseRef);
        snapshot.forEach((doc) => {
          batch.delete(doc.ref);
        });
        return batch.commit();
      }),
    );
  }
}
