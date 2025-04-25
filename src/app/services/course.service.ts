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
  deleteDoc, getDocs, writeBatch
} from "@angular/fire/firestore";
import { concatMap, from, map, Observable, tap } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CourseService {
  private db = inject(Firestore);

  getCoursesByCategory(category: string): Observable<Course[]> {
    const coursesCollection = collection(this.db, "courses");
    const q = query(
      coursesCollection,
      where("categories", "array-contains", category),
    );
    return collectionData(q, { idField: "id" }).pipe(
      tap((data) => console.log("Fetched data:", data)),
    ) as Observable<Course[]>;
  }

  updateCourse(course: Course): Observable<void> {
    const coursesCollection = collection(this.db, "courses");
    const courseDoc = doc(coursesCollection, course.id);
    return from(updateDoc(courseDoc, { ...course }));
  }

  deleteCourse(course: Course): Observable<void> {
    const coursesCollection = collection(this.db, "courses");
    const courseDoc = doc(coursesCollection, course.id);
    return from(deleteDoc(courseDoc));
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
      })
    );
  }
}
