import {Component, EventEmitter, Input, OnInit, Output, inject} from '@angular/core';
import {Course} from '../model/course';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {EditCourseDialogComponent} from '../edit-course-dialog/edit-course-dialog.component';
import {Router, RouterLink} from '@angular/router';
import {NgFor} from '@angular/common';
import {
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardImage,
    MatCardContent,
    MatCardActions
} from '@angular/material/card';
import {MatButton, MatMiniFabButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';

@Component({
    selector: 'courses-card-list',
    templateUrl: './courses-card-list.component.html',
    styleUrls: ['./courses-card-list.component.css'],
    standalone: true,
    imports: [NgFor, MatCard, MatCardHeader, MatCardTitle, MatCardImage, MatCardContent, MatCardActions, MatButton, RouterLink, MatMiniFabButton, MatIcon]
})
export class CoursesCardListComponent implements OnInit {
    private dialog = inject(MatDialog);
    private router = inject(Router);


    @Input()
    courses: Course[];

    @Output()
    courseEdited = new EventEmitter<void>();

    @Output()
    courseDeleted = new EventEmitter<Course>();

    /** Inserted by Angular inject() migration for backwards compatibility */
    constructor(...args: unknown[]);

    constructor() {
    }

    ngOnInit(): void {
    }

    editCourse(course: Course): void {

        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.minWidth = '400px';

        dialogConfig.data = course;

        this.dialog.open(EditCourseDialogComponent, dialogConfig)
            .afterClosed()
            .subscribe(val => {
                if (val) {
                    this.courseEdited.emit();
                }
            });

    }

}
