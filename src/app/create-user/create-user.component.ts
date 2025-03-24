import { Component, inject } from '@angular/core';
import { UntypedFormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'create-user',
    templateUrl: 'create-user.component.html',
    styleUrls: ['create-user.component.css'],
    standalone: true,
    imports: [ReactiveFormsModule, MatFormField, MatInput, MatSlideToggle, MatButton]
})
export class CreateUserComponent {
    private fb = inject(UntypedFormBuilder);
    private http = inject(HttpClient);


    form = this.fb.group({
        email: ['', [Validators.email, Validators.required]],
        password: ['', [Validators.required, Validators.minLength(5)]],
        admin: [false]
    });

    /** Inserted by Angular inject() migration for backwards compatibility */
    constructor(...args: unknown[]);

  constructor() {

  }

    onCreateUser() {

        const user = this.form.value;

        console.log(user);

    }

}
