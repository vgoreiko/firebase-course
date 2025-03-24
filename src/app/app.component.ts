import {Component, OnInit} from '@angular/core';
import { MatSidenavContainer, MatSidenav } from '@angular/material/sidenav';
import { MatNavList, MatListItem } from '@angular/material/list';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIconButton } from '@angular/material/button';
// import {AngularFireAuth} from '@angular/fire/auth';
// import {from, Observable} from 'rxjs';
// import {concatMap, filter, map} from 'rxjs/operators';
// import {AngularFirestore} from '@angular/fire/firestore';
// import {Router} from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: true,
    imports: [MatSidenavContainer, MatSidenav, MatNavList, MatListItem, RouterLink, MatIcon, MatToolbar, MatIconButton, RouterOutlet]
})
export class AppComponent implements OnInit {

  constructor() {

  }

  ngOnInit() {

  }

}
