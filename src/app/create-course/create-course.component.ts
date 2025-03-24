import {Component, OnInit} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatDatepickerInput, MatDatepickerToggle, MatDatepicker } from '@angular/material/datepicker';
import { MatButton } from '@angular/material/button';
// import {FormBuilder, FormGroup, Validators} from '@angular/forms';
// import {AngularFirestore} from '@angular/fire/firestore';
// import {Course} from '../model/course';
// import {catchError, concatMap, last, map, take, tap} from 'rxjs/operators';
// import {from, Observable, throwError} from 'rxjs';
// import {Router} from '@angular/router';
// import {AngularFireStorage} from '@angular/fire/storage';
// import firebase from 'firebase/app';
// import Timestamp = firebase.firestore.Timestamp;

@Component({
    selector: 'create-course',
    templateUrl: 'create-course.component.html',
    styleUrls: ['create-course.component.css'],
    standalone: true,
    imports: [ReactiveFormsModule, MatFormField, MatInput, MatSelect, MatOption, MatSlideToggle, MatLabel, MatDatepickerInput, MatDatepickerToggle, MatSuffix, MatDatepicker, MatButton]
})
export class CreateCourseComponent implements OnInit {

  constructor() {

  }

  ngOnInit() {

  }

}
