import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Course } from '../model/course';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
    selector: 'edit-course-dialog',
    templateUrl: './edit-course-dialog.component.html',
    styleUrls: ['./edit-course-dialog.component.css']
})
export class EditCourseDialogComponent implements OnInit {

    form: FormGroup;
    description: string;

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<EditCourseDialogComponent>,
        @Inject(MAT_DIALOG_DATA) { description, longDescription }: Course) {

        this.description = description;

        this.form = fb.group({
            description: [description, Validators.required],
            longDescription: [longDescription, Validators.required]
        });

    }

    ngOnInit(): void {
    }

    save(): void {
        this.dialogRef.close(this.form.value);
    }

    close(): void {
        this.dialogRef.close();
    }

}
