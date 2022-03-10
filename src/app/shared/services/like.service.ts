import { Injectable } from '@angular/core';
import { collectionData, docData, Firestore, setDoc } from '@angular/fire/firestore';
import { addDoc, collection, deleteDoc, doc } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { Like } from '../interfaces/like';

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  constructor(private firestore: Firestore) { }

  async addLike(Like: Like) {
    try {
      const docRef = await addDoc(collection(this.firestore, "likes"), Like);
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  getLikes(): Observable<Like[]> {
    return collectionData(collection(this.firestore, 'likes'), { idField: 'likeId' }) as Observable<Like[]>;
  }

  async deleteLike(id: string) {
    await deleteDoc(doc(this.firestore, `likes/${id}`));
    console.log('eliminado')
  }
}
