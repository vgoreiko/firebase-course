import { Component, OnInit, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle, MatDialogContent, MatDialogActions } from '@angular/material/dialog';
import { Course } from '../model/course';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'edit-course-dialog',
    templateUrl: './edit-course-dialog.component.html',
    styleUrls: ['./edit-course-dialog.component.css'],
    standalone: true,
    imports: [MatDialogTitle, CdkScrollable, MatDialogContent, MatFormField, MatInput, MatSlideToggle, MatDialogActions, MatButton]
})
export class EditCourseDialogComponent implements OnInit {
    private fb = inject(FormBuilder);
    private dialogRef = inject<MatDialogRef<EditCourseDialogComponent>>(MatDialogRef);


    form: FormGroup;
    description: string;

    /** Inserted by Angular inject() migration for backwards compatibility */
    constructor(...args: unknown[]);

    constructor() {
        const fb = this.fb;


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
