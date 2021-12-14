/* eslint-disable import/no-extraneous-dependencies */
import {
  collection,
  Firestore,
  getDocs,
  getFirestore,
} from '@firebase/firestore';

export const getDataArrayFromFirebase = async <T>(key: string) => {
  const db: Firestore = getFirestore();

  const querySnapshot = await getDocs(collection(db, key));
  const arrData: T[] = [];

  querySnapshot.forEach(doc => {
    arrData.push(doc.data() as T);
    // console.log(`${doc.id} => ${doc.data()}`);
  });

  return arrData;
};

//--------------------------

interface Iobj {
  // [key: string]: string;
  id: string;
  dd: string;
}

const a: Iobj = {
  id: 'fff',
  dd: 'aaaa',
};

const b = 'id';

const c = a[b];
