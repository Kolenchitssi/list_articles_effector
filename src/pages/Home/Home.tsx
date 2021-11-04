import React, { FC, useEffect, useState } from 'react';
import {
  collection,
  getDocs,
  onSnapshot,
  getFirestore,
} from 'firebase/firestore';
import css from './Home.module.scss';

const Home: FC = () => {
  const db = getFirestore();
  const [posts, setPosts] = useState<any[]>([]);

  // const getDb = async () => {
  //   const querySnapshot = await getDocs(collection(db, 'users'));
  //   querySnapshot.forEach(doc => {
  //     console.log(`${doc.id} => ${doc.data()}`);
  //   });
  //   console.log('get DB');

  //! Чтение и отображение постов из БД
  // useEffect(() => {
  // const unsub = onSnapshot(collection(db, 'users'), doc => {
  //   const arrPosts: any[] = [];
  //   doc.forEach((d: any) => {
  //     arrPosts.push(d.data());
  //   });
  //   setPosts(arrPosts);
  // });
  // console.log(posts);
  // return () => {
  //   unsub();
  // };
  //   }, []);
  // };

  // getDb();

  return (
    <div className={css.content}>
      Home Page
      {posts.map((post, index) => (
        <p> post</p>
      ))}
    </div>
  );
};

export default Home;
