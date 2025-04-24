import { Component, effect, Inject, inject } from "@angular/core";
import {
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogConfig, MAT_DIALOG_DATA
} from "@angular/material/dialog";
import {
  Validators,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  FormControl,
} from "@angular/forms";
import { MatFormField } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { MatSlideToggle } from "@angular/material/slide-toggle";
import { MatButton } from "@angular/material/button";
import { Course } from "../model";

interface EditCourseForm {
  description: FormControl<string>;
  longDescription: FormControl<string>;
  promo: FormControl<boolean>;
}

@Component({
  selector: "edit-course-dialog",
  templateUrl: "./edit-course-dialog.component.html",
  styleUrls: ["./edit-course-dialog.component.css"],
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatFormField,
    MatInput,
    MatSlideToggle,
    MatDialogActions,
    MatButton,
    ReactiveFormsModule,
  ],
  providers: [MatDialogConfig]
})
export class EditCourseDialogComponent {
  private fb = inject(NonNullableFormBuilder);
  private dialogRef =
    inject<MatDialogRef<EditCourseDialogComponent>>(MatDialogRef);
  form: FormGroup<EditCourseForm>;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Course) {
    effect(() => {
      this.form = this.getForm();
    });
  }

  save(): void {
    return this.dialogRef.close({
      ...this.form.value,
      id: this.data.id,
    });
  }

  close(): void {
    return this.dialogRef.close();
  }

  private getForm(): FormGroup<EditCourseForm> {
    return this.fb.group({
      description: [this.data.description, Validators.required],
      longDescription: [this.data.longDescription, Validators.required],
      promo: [this.data.promo],
    });
  }
}
