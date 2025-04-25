import { Component, inject, input, output } from "@angular/core";
import { Course } from "../model";
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
import { CourseService } from "../services";

@Component({
  selector: "courses-card-list",
  templateUrl: "./courses-card-list.component.html",
  styleUrls: ["./courses-card-list.component.css"],
  standalone: true,
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
    MatIcon,
  ],
})
export class CoursesCardListComponent {
  private dialog = inject(MatDialog);
  private courseService = inject(CourseService);
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
      .subscribe((val?: Course) => this.handleDialogClose(val));
  }

  private handleDialogClose(val?: Course) {
    if (!val) return;
    return this.courseService.updateCourse(val).subscribe({
      next: () => {
        this.courseEdited.emit();
      },
      error: (err) => {
        console.error("Error updating course", err);
      },
    });
  }

  deleteCourse(course: Course): void {
    this.courseService.deleteCourseAndLessons(course).subscribe({
      next: () => {
        this.courseDeleted.emit(course);
      },
      error: (err) => {
        console.error("Error deleting course", err);
      },
    });
  }
}
