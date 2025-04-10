// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  useEmulators: false,
  firebase: {
    apiKey: 'AIzaSyANzpAaFvsSOlaKtuvoqvJ03VCDQbH_LXk',
    authDomain: 'fir-course-recording-8dc68.firebaseapp.com',
    projectId: 'fir-course-recording-8dc68',
    storageBucket: 'fir-course-recording-8dc68.firebasestorage.app',
    messagingSenderId: '570264323903',
    appId: '1:570264323903:web:32ecc45191163db1df358a'
  },
  api: {

  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
