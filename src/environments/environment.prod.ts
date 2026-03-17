export const environment = {
  production: true,
  firebase: {
    apiKey: process.env['FIREBASE_API_KEY'] || '',
    authDomain: 'sign-wave.firebaseapp.com',
    projectId: 'sign-wave',
    storageBucket: 'sign-wave.firebasestorage.app',
    messagingSenderId: '514998232606',
    appId: '1:514998232606:web:9e6c4bde0268530ec6b00f',
    measurementId: null,
  },
  reCAPTCHAKey: '6Ldsxb8oAAAAAGyUZbyd0QruivPSudqAWFygR-4t',
};
