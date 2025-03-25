import { Component, OnInit, inject } from '@angular/core';
import {Course} from '../model';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import { MatMiniFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTabGroup, MatTab } from '@angular/material/tabs';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {AsyncPipe, NgForOf} from '@angular/common';
import {CourseService} from '../services';


@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    standalone: true,
    imports: [MatMiniFabButton, MatIcon, MatTabGroup, MatTab, AsyncPipe, NgForOf]
})
export class HomeComponent implements OnInit {
    private router = inject(Router);
    private db = inject(AngularFirestore);
    private coursesService = inject(CourseService);
    courses$: Observable<Course[]>;
    beginnersCourses$: Observable<Course[]>;
    advancedCourses$: Observable<Course[]>;

    /** Inserted by Angular inject() migration for backwards compatibility */
    constructor(...args: unknown[]);

    constructor() {

    }

    ngOnInit() {
        this.courses$ = this.db.collection('courses').valueChanges() as Observable<Course[]>;
        this.beginnersCourses$ = this.coursesService.getCoursesByCategory('BEGINNER');
        this.advancedCourses$ = this.coursesService.getCoursesByCategory('ADVANCED');
    }

}
