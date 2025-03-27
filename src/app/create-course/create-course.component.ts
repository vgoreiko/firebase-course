import { Component } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import {
  MatFormField,
  MatLabel,
  MatSuffix,
} from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { MatSelect } from "@angular/material/select";
import { MatOption } from "@angular/material/core";
import { MatSlideToggle } from "@angular/material/slide-toggle";
import {
  MatDatepickerInput,
  MatDatepickerToggle,
  MatDatepicker,
} from "@angular/material/datepicker";
import { MatButton } from "@angular/material/button";

@Component({
  selector: "create-course",
  templateUrl: "create-course.component.html",
  styleUrls: ["create-course.component.css"],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatSelect,
    MatOption,
    MatSlideToggle,
    MatLabel,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatSuffix,
    MatDatepicker,
    MatButton,
  ],
})
export class CreateCourseComponent {
}
