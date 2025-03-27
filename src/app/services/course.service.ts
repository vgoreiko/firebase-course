import { inject, Injectable } from "@angular/core";
import { Course } from "../model";
import {collection, Firestore, query, where, getDocs} from '@angular/fire/firestore';

@Injectable({
  providedIn: "root",
})
export class CourseService {
  private db = inject(Firestore);

  async getCoursesByCategory(category: string): Promise<Course[]> {
    const coursesCollection = collection(this.db, "courses");
    const coursesQuery = query(coursesCollection, where('category', '==', category));
    const result = await getDocs(coursesQuery);
    return result.docs.map(doc => {
        const data = doc.data() as Course;
        return {
            ...data,
        };
    });
  }
}
