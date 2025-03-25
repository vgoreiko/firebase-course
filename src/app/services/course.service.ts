import {inject, Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {Observable} from 'rxjs';
import {Course} from '../model';

@Injectable({
    providedIn: 'root'
})
export class CourseService {
    private db = inject(AngularFirestore);

    getCoursesByCategory(category: string): Observable<Course[]> {
        return this.db.collection<Course>('courses', ref => ref.where('categories', 'array-contains', category)).valueChanges();
    }
}
