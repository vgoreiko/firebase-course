import { Component, inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { MatProgressSpinner } from "@angular/material/progress-spinner";
import {
  MatTable,
  MatColumnDef,
  MatHeaderCellDef,
  MatHeaderCell,
  MatCellDef,
  MatCell,
  MatHeaderRowDef,
  MatHeaderRow,
  MatRowDef,
  MatRow,
} from "@angular/material/table";
import { MatButton } from "@angular/material/button";

@Component({
    selector: "course",
    templateUrl: "./course.component.html",
    styleUrls: ["./course.component.css"],
    imports: [
    MatProgressSpinner,
    MatTable,
    MatColumnDef,
    MatHeaderCellDef,
    MatHeaderCell,
    MatCellDef,
    MatCell,
    MatHeaderRowDef,
    MatHeaderRow,
    MatRowDef,
    MatRow,
    MatButton
]
})
export class CourseComponent {
  private route = inject(ActivatedRoute);
  loading = false;
  displayedColumns = ["seqNo", "description", "duration"];
}
