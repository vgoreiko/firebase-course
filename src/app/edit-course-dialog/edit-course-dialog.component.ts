import {Component, OnInit, inject} from '@angular/core';
import {
    MatDialogRef,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions
} from '@angular/material/dialog';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import {CdkScrollable} from '@angular/cdk/scrolling';
import {MatFormField} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {MatButton} from '@angular/material/button';

@Component({
    selector: 'edit-course-dialog',
    templateUrl: './edit-course-dialog.component.html',
    styleUrls: ['./edit-course-dialog.component.css'],
    standalone: true,
    imports: [
        MatDialogTitle,
        CdkScrollable, MatDialogContent, MatFormField, MatInput, MatSlideToggle, MatDialogActions, MatButton
    ]
})
export class EditCourseDialogComponent implements OnInit {
    private fb = inject(FormBuilder);
    private dialogRef = inject<MatDialogRef<EditCourseDialogComponent>>(MatDialogRef);


    form: FormGroup;
    description: string;

    constructor() {
        this.form = this.fb.group({
            description: ['', Validators.required],
            longDescription: ['', Validators.required]
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
