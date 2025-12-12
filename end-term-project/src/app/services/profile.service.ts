import { inject, Injectable } from '@angular/core';
import { Firestore, doc, getDoc, setDoc } from '@angular/fire/firestore';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private firestore = inject(Firestore);
  private storage = inject(Storage);

  private readonly PROFILES_COLLECTION = 'userProfiles';
  private readonly PROFILE_PICS_FOLDER = 'profile_pictures';

  constructor() { }

  async uploadImage(userId: string, imageBlob: Blob): Promise<string> {
    const storagePath = `${this.PROFILE_PICS_FOLDER}/${userId}/avatar.jpg`;
    const storageRef = ref(this.storage, storagePath);

    // Загружаем файл
    await uploadBytes(storageRef, imageBlob);

    // Получаем URL
    const imageUrl = await getDownloadURL(storageRef);

    // Сохраняем URL в Firestore
    await this.saveImageUrlToFirestore(userId, imageUrl);

    return imageUrl;
  }

  private async saveImageUrlToFirestore(userId: string, imageUrl: string): Promise<void> {
    const profileDocRef = doc(this.firestore, this.PROFILES_COLLECTION, userId);
    await setDoc(profileDocRef, { profilePictureUrl: imageUrl }, { merge: true });
  }

  getProfileImageUrl(userId: string): Observable<string | null> {
    const profileDocRef = doc(this.firestore, this.PROFILES_COLLECTION, userId);

    return from(getDoc(profileDocRef)).pipe(
      map(docSnap => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          return data?.['profilePictureUrl'] || null;
        }
        return null;
      })
    );
  }
}
