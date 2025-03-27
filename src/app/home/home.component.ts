import { Component, OnInit, inject } from "@angular/core";
import { Course } from "../model";
import { MatMiniFabButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { MatTabGroup, MatTab } from "@angular/material/tabs";
import { AsyncPipe } from "@angular/common";
import { CourseService } from "../services";
import { CoursesCardListComponent } from "../courses-card-list/courses-card-list.component";
import {Observable} from 'rxjs';

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
  private coursesService = inject(CourseService);
  beginnersCourses$: Observable<Course[]>;
  advancedCourses$: Observable<Course[]>;

  ngOnInit() {
    this.beginnersCourses$ = this.coursesService.getCoursesByCategory("BEGINNER");
    this.advancedCourses$ = this.coursesService.getCoursesByCategory("ADVANCED");
  }
}
