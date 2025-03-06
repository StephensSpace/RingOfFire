import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { initializeApp } from "firebase/app";
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

const firebaseConfig = {
  apiKey: "AIzaSyDHydntUF9G7UBLfgQTaabBK0tLa9D7SzU",
  authDomain: "ringoffire-10968.firebaseapp.com",
  projectId: "ringoffire-10968",
  storageBucket: "ringoffire-10968.firebasestorage.app",
  messagingSenderId: "68311956445",
  appId: "1:68311956445:web:10f1f1c90a8377de475434"
};

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync()],

};

const app = initializeApp(firebaseConfig);
