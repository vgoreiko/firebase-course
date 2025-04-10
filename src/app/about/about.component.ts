import { Component, inject } from "@angular/core";
import {
  Firestore,
  collection,
  collectionData,
  addDoc,
} from "@angular/fire/firestore";
import { COURSES, findLessonsForCourse } from "./db-data";
import { MatButton } from "@angular/material/button";
import { Course } from "../model";
import { firstValueFrom, Observable } from "rxjs";

@Component({
  selector: "app-about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.css"],
  standalone: true,
  imports: [MatButton],
})
export class AboutComponent {
  private db = inject(Firestore);

  // TODO: Implement uploadData method
  async uploadData(): Promise<void> {
    const coursesCollection = collection(this.db, "courses");
    const courses = await firstValueFrom(
      collectionData(coursesCollection) as Observable<Course[]>,
    );
    console.log(courses);
    for (const course of Object.values(COURSES)) {
      const newCourse = this.removeId(course);
      const courseRef = await addDoc(coursesCollection, newCourse);
      const courseLessons = findLessonsForCourse(course["id"]);
      const lessonsCollection = collection(
        this.db,
        "courses",
        courseRef.id,
        "lessons",
      );
      console.log(`Uploading course ${course["description"]}`);
      for (const lesson of courseLessons) {
        const newLesson = this.removeId(lesson);
        delete newLesson.courseId;
        await addDoc(lessonsCollection, newLesson);
      }
    }
  }

  removeId<T extends { id: string | number }>(data: T): Omit<T, "id"> {
    const newData = { ...data };
    delete newData.id;
    return newData;
  }

  readDocument($event: MouseEvent) {
    console.log($event);
  }
}
