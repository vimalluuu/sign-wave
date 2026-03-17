// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import type {InitialNavigation} from '@angular/router';

export const environment = {
  production: false,
  apiUrl: 'https://sign-wave-backend.onrender.com',
  firebase: {
    apiKey: 'AIzaSyBz3jWNewhOr2vBaKw5Cl-_ECp4q_AfInw',
    authDomain: 'sign-wave.firebaseapp.com',
    projectId: 'sign-wave',
    storageBucket: 'sign-wave.firebasestorage.app',
    messagingSenderId: '514998232606',
    appId: '1:514998232606:web:9e6c4bde0268530ec6b00f',
    measurementId: null,
  },
  reCAPTCHAKey: '',
  initialNavigation: 'enabledNonBlocking' as InitialNavigation,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
