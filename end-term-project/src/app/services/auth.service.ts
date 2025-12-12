import { Injectable, inject } from '@angular/core';
import { Auth, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, User } from '@angular/fire/auth';
import { Firestore, doc, setDoc, serverTimestamp } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth = inject(Auth);       // ✅ inject вместо конструктора
  private firestore = inject(Firestore);

  public authState$: Observable<User | null> = authState(this.auth);

  async register(name: string, email: string, password: string) {
    if (!this.auth.app) throw new Error('Firebase Auth не инициализирован');

    const credential = await createUserWithEmailAndPassword(this.auth, email, password);

    if (credential.user) {
      await updateProfile(credential.user, { displayName: name });

      const userRef = doc(this.firestore, `users/${credential.user.uid}`);
      await setDoc(userRef, {
        uid: credential.user.uid,
        name,
        email,
        createdAt: serverTimestamp()
      });
    }

    return credential;
  }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    return signOut(this.auth);
  }
}
