import React, { FC, useEffect, useState } from 'react';
import {
  collection,
  getDocs,
  onSnapshot,
  getFirestore,
} from 'firebase/firestore';
import css from './Home.module.scss';
import { IArticle } from '../../models/IArticle';
import ArticleBlank from '../../components/ArticleBlank/ArticleBlank';

const Home: FC = () => {
  const [articles, setArticles] = useState<IArticle[]>([]);
  useEffect(() => {
    const db = getFirestore();

    const getDb = async () => {
      const querySnapshot = await getDocs(collection(db, 'posts'));
      console.log('querySnapshot', querySnapshot);
      const arrArticles: IArticle[] = [];
      querySnapshot.forEach(doc => {
        arrArticles.push(doc.data() as IArticle);
        // console.log(`${doc.id} => ${doc.data()}`);
      });
      setArticles(arrArticles);
    };
    getDb();
  }, []);

  console.log('get DB');

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
    <>
      <div> здесь будет фильтр и возможно чтотот еще</div>
      <div className={css.content}>
        {articles.map((article, index) => (
          <ArticleBlank
            key={article.authorId}
            authorId={article.authorId}
            author={article.author}
            title={article.title}
            content={article.content}
            date={article.date}
            img={article.img}
          />
        ))}
      </div>
    </>
  );
};

export default Home;
