import {Component} from '@angular/core';

import 'firebase/firestore';

import {COURSES, findLessonsForCourse} from './db-data';
import {AngularFirestore} from '@angular/fire/compat/firestore';


@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css']
})
export class AboutComponent {

    constructor(private db: AngularFirestore) {
    }

    async uploadData(): Promise<void> {
        const coursesCollection = this.db.collection('courses');
        const courses = await this.db.collection('courses').get();
        for (const course of Object.values(COURSES)) {
            const newCourse = this.removeId(course);
            const courseRef = await coursesCollection.add(newCourse);
            const lessons = await courseRef.collection('lessons');
            const courseLessons = findLessonsForCourse(course['id']);
            console.log(`Uploading course ${course['description']}`);
            for (const lesson of courseLessons) {
                const newLesson = this.removeId(lesson);
                delete newLesson.courseId;
                await lessons.add(newLesson);
            }
        }
    }

    removeId(data: any): any {
        const newData: any = {...data};
        delete newData.id;
        return newData;
    }


    readDocument($event: MouseEvent) {

    }
}
















