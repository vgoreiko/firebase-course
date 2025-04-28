import {
  ChangeDetectionStrategy,
  Component,
  computed, DestroyRef, effect,
  inject, OnInit,
  signal
} from "@angular/core";
import { Course } from "../model";
import { MatMiniFabButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { MatTabGroup, MatTab, MatTabChangeEvent } from "@angular/material/tabs";
import { CourseService, IGetCoursesByCategory } from "../services";
import { CoursesCardListComponent } from "../courses-card-list/courses-card-list.component";
import { map, Observable, tap } from "rxjs";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

export enum Category {
  BEGINNER = "BEGINNER",
  ADVANCED = "ADVANCED",
}

@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
  imports: [
    MatMiniFabButton,
    MatIcon,
    MatTabGroup,
    MatTab,
    CoursesCardListComponent,
    MatPaginator,
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  private coursesService = inject(CourseService);
  private destroyRef = inject(DestroyRef);
  categories = Category;
  beginnerPaging = signal<PageEvent>({
    length: 50,
    pageSize: 5,
    pageIndex: 0,
  });
  advancedPaging = signal<PageEvent>({
    length: 50,
    pageSize: 5,
    pageIndex: 0,
  });
  pageSizeOptions = signal<number[]>([5, 10, 25]);
  activeTab = signal<Category>(Category.BEGINNER);
  beginnersCourses = signal<Course[]>([]);
  advancedCourses = signal<Course[]>([]);
  paging = computed(() => {
    return this.activeTab() === Category.BEGINNER
      ? this.beginnerPaging()
      : this.advancedPaging();
  });

  handlePageEvent(e: PageEvent) {
    if (this.activeTab() === Category.BEGINNER) {
      this.beginnerPaging.set(e);
      this.getBeginnerCourses().subscribe(); // TODO: provide better way to handle this
    } else {
      this.advancedPaging.set(e);
      this.getAdvancedCourses().subscribe();
    }
  }

  ngOnInit() {
    this.getBeginnerCourses().subscribe();
    this.getAdvancedCourses().subscribe();
  }

  tabChange(event: MatTabChangeEvent) {
    this.activeTab.set(event.tab.id as Category);
  }

  private getCoursesByCategory(category: Category): Observable<{data: Course[]; count: number}> {
    const sortOrder = "asc";
    const pageEvent =
      category === Category.BEGINNER
        ? this.beginnerPaging()
        : this.advancedPaging();
    const { pageIndex: pageNumber, pageSize } = pageEvent;
    const params: IGetCoursesByCategory = {
      pageSize,
      pageNumber,
      category,
      sortOrder,
    };
    return this.coursesService.getCoursesByCategory(params).pipe(
      takeUntilDestroyed(this.destroyRef),
      tap((response: { data: Course[]; count: number }) => {
        const page =
          category === Category.BEGINNER
            ? this.beginnerPaging
            : this.advancedPaging;
        console.log(response);
        return page.set({ ...page(), length: response.count });
      }),
    );
  }

  private getBeginnerCourses(): Observable<{data: Course[]; count: number}> {
    const category = Category.BEGINNER;
    return this.getCoursesByCategory(category).pipe(
      takeUntilDestroyed(this.destroyRef),
      tap((response: { data: Course[]; count: number }) => {
        const page = this.beginnerPaging;
        this.beginnersCourses.set(response.data);
        return page.set({ ...page(), length: response.count });
      })
    );
  }

  private getAdvancedCourses(): Observable<{data: Course[]; count: number}> {
    const category = Category.ADVANCED;
    return this.getCoursesByCategory(category).pipe(
      takeUntilDestroyed(this.destroyRef),
      tap((response: { data: Course[]; count: number }) => {
        const page = this.advancedPaging;
        this.advancedCourses.set(response.data);
        return page.set({ ...page(), length: response.count });
      })
    );
  }
}
