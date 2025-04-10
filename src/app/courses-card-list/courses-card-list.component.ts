import { Component, inject, input, output } from "@angular/core";
import { Course } from "../model/course";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { EditCourseDialogComponent } from "../edit-course-dialog/edit-course-dialog.component";
import { RouterLink } from "@angular/router";

import {
  MatCard,
  MatCardHeader,
  MatCardTitle,
  MatCardImage,
  MatCardContent,
  MatCardActions,
} from "@angular/material/card";
import { MatButton, MatMiniFabButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";

@Component({
    selector: "courses-card-list",
    templateUrl: "./courses-card-list.component.html",
    styleUrls: ["./courses-card-list.component.css"],
    imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardImage,
    MatCardContent,
    MatCardActions,
    MatButton,
    RouterLink,
    MatMiniFabButton,
    MatIcon
]
})
export class CoursesCardListComponent {
  private dialog = inject(MatDialog);

  readonly courses = input<Course[]>([]);

  readonly courseEdited = output<void>();

  readonly courseDeleted = output<Course>();

  editCourse(course: Course): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = "400px";

    dialogConfig.data = course;

    this.dialog
      .open(EditCourseDialogComponent, dialogConfig)
      .afterClosed()
      .subscribe((val) => {
        if (val) {
          // TODO: The 'emit' function requires a mandatory void argument
          this.courseEdited.emit();
        }
      });
  }
}
