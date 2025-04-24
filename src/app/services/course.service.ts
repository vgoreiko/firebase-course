import {inject, Injectable} from '@angular/core';
import { Course } from "../model";
import {
  collection,
  Firestore,
  query,
  where,
  collectionData, doc, updateDoc, deleteDoc
} from "@angular/fire/firestore";
import { from, Observable, tap } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CourseService {
  private db = inject(Firestore);

  getCoursesByCategory(category: string): Observable<Course[]> {
    const coursesCollection = collection(this.db, "courses");
    const q = query(coursesCollection, where("categories", "array-contains", category));
    return collectionData(q, { idField: "id" }).pipe(
        tap((data) => console.log("Fetched data:", data))
    ) as Observable<Course[]>;
  }

  updateCourse(course: Course): Observable<void> {
    const coursesCollection = collection(this.db, "courses");
    const courseDoc = doc(coursesCollection, course.id);
    console.log(courseDoc);
    return from(updateDoc(courseDoc, { ...course }));
  }

  deleteCourse(course: Course): Observable<void> {
    const coursesCollection = collection(this.db, "courses");
    const courseDoc = doc(coursesCollection, course.id);
    return from(deleteDoc(courseDoc));
  }
}

