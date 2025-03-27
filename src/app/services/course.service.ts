import { inject, Injectable } from "@angular/core";
import { Course } from "../model";
import {
  collection,
  Firestore,
  query,
  where,
  collectionData,
} from "@angular/fire/firestore";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CourseService {
  private db = inject(Firestore);

  getCoursesByCategory(category: string): Observable<Course[]> {
    const coursesCollection = collection(this.db, "courses");
    const q = query(coursesCollection, where("category", "==", category));
    return collectionData(q) as Observable<Course[]>;
  }
}
