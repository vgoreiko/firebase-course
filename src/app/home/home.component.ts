import { Component, OnInit, inject } from "@angular/core";
import { Course } from "../model";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { MatMiniFabButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { MatTabGroup, MatTab } from "@angular/material/tabs";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { AsyncPipe } from "@angular/common";
import { CourseService } from "../services";
import { CoursesCardListComponent } from "../courses-card-list/courses-card-list.component";

@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
  standalone: true,
  imports: [
    MatMiniFabButton,
    MatIcon,
    MatTabGroup,
    MatTab,
    AsyncPipe,
    CoursesCardListComponent,
  ],
})
export class HomeComponent implements OnInit {
  private router = inject(Router);
  private db = inject(AngularFirestore);
  private coursesService = inject(CourseService);
  courses$: Observable<Course[]>;
  beginnersCourses$: Observable<Course[]>;
  advancedCourses$: Observable<Course[]>;

  ngOnInit() {
    this.courses$ = this.db.collection("courses").valueChanges() as Observable<
      Course[]
    >;
    this.beginnersCourses$ =
      this.coursesService.getCoursesByCategory("BEGINNER");
    this.advancedCourses$ =
      this.coursesService.getCoursesByCategory("ADVANCED");
  }
}
