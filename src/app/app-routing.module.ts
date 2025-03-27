import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'create-course',
    loadComponent: () => import('./create-course/create-course.component').then(m => m.CreateCourseComponent)

  },
  {
    path: 'create-user',
    loadComponent: () => import('./create-user/create-user.component').then(m => m.CreateUserComponent)

  },
  {
    path: 'about',
    loadComponent: () => import('./about/about.component').then(m => m.AboutComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'courses/:courseUrl',
    loadComponent: () => import('./course/course.component').then(m => m.CourseComponent)
  },
  {
    path: '**',
    redirectTo: '/'
  }
];