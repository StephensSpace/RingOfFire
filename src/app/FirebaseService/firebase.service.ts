import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, getDocs, doc, getDoc, onSnapshot } from '@angular/fire/firestore';
import { initializeApp } from 'firebase/app';
import { getFirestore, DocumentData } from 'firebase/firestore';
import { Observable, BehaviorSubject } from 'rxjs';
import { Game } from '../../models/game';

// Firebase Initialisierung
const firebaseConfig = {
    apiKey: "AIzaSyDHydntUF9G7UBLfgQTaabBK0tLa9D7SzU",
    authDomain: "ringoffire-10968.firebaseapp.com",
    projectId: "ringoffire-10968",
    storageBucket: "ringoffire-10968.firebasestorage.app",
    messagingSenderId: "68311956445",
    appId: "1:68311956445:web:10f1f1c90a8377de475434"
};



@Injectable({
    providedIn: 'root'
})
export class FirebaseService {
    public app = initializeApp(firebaseConfig);
    public firestore = getFirestore(this.app);
    private currentGameSubject = new BehaviorSubject<DocumentData | null>(null);
    currentGame$ = this.currentGameSubject.asObservable();
    unSubGames;

    constructor() {
        this.unSubGames = this.subGamesList();
    }

    ngonDestroy() {
        this.unSubGames();

    }

    subCurrentGame(id: string) {
        return onSnapshot(this.getSingleDoc(id),
            (game) => {
                if (game.exists()) {
                    this.currentGameSubject.next(game.data()); // Wert setzen
                } else {
                    console.error('Game not found!');
                }
            })
    }

    subGamesList() {
        return onSnapshot(this.getGamesRef(),
            (list) => {
                list.forEach(element => {
                });
            });
    }

    async addGame(item: {} | undefined) {
        const docRef: any = await addDoc(this.getGamesRef(), item).catch(
            (err) => { console.error(err) }
        ).then((docRef) => {
            console.log("Document written with ID:", docRef?.id);
        })
        return { id: docRef.id, ...item };
    }

    getGamesRef() {
        return collection(this.firestore, 'games');
    }

    getSingleDoc(docId: string) {
        return doc(collection(this.firestore, 'games'), docId)
    }

}