import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { BrowserModule } from "@angular/platform-browser";
import { provideAnimations } from "@angular/platform-browser/animations";
import { initializeApp, provideFirebaseApp } from "@angular/fire/app";
import {connectFirestoreEmulator, getFirestore, provideFirestore} from '@angular/fire/firestore';
import {connectStorageEmulator, getStorage, provideStorage} from '@angular/fire/storage';
import {ApplicationConfig} from '@angular/core';
import { environment} from '../environments/environment';
import {provideRouter} from '@angular/router';
import {routes} from './app-routing.module';
import {connectAuthEmulator, getAuth, provideAuth} from '@angular/fire/auth';
import {connectFunctionsEmulator, getFunctions, provideFunctions} from '@angular/fire/functions';

console.log(environment.firebase);
console.log('isProduction:', environment.production);
export const appConfig: ApplicationConfig = {
    providers: [
        BrowserModule,
        provideAnimations(),
        provideAnimationsAsync(),
        provideRouter(routes),
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideFirestore(() => {
            const fireStore = getFirestore();
            if(!environment.production) {
                connectFirestoreEmulator(fireStore, 'localhost', 8080);
                return getFirestore();
            }
            return fireStore;
        }),
        provideStorage(() => {
            const storage = getStorage();
            if (!environment.production) {
                connectStorageEmulator(storage, 'localhost', 9199);
                return storage;
            }
            return storage;
        }),
        provideAuth(() => {
            const auth = getAuth();
            if (!environment.production) {
                connectAuthEmulator(auth, 'http://localhost:9099');
            }
            return auth;
        }),
        provideFunctions(() => {
            const functions = getFunctions();
            if (!environment.production) {
                connectFunctionsEmulator(functions, 'localhost', 5001);
            }
            return functions;
        }),
    ],
}