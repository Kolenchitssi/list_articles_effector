import React, { FC, useEffect, useState } from 'react';
import {
  collection,
  getDocs,
  getFirestore,
  Firestore,
} from 'firebase/firestore';
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  FirebaseStorage,
  getDownloadURL,
  getStorage,
  ref,
  StorageReference,
} from '@firebase/storage';
import { IArticle } from '../../models/IArticle';
import ArticleBlank from '../../components/ArticleBlank/ArticleBlank';
import { getImgRefsStoreFirebase } from '../../utils/getImgFromStoreFirebase';
import css from './Home.module.scss';

interface IArticleUrlImages extends IArticle {
  listUrlImages: StorageReference[];
}

const getDb = async () => {
  const db: Firestore = getFirestore();

  const querySnapshot = await getDocs(collection(db, 'posts'));
  const arrArticles: IArticle[] = [];

  querySnapshot.forEach(doc => {
    arrArticles.push(doc.data() as IArticle);
    // console.log(`${doc.id} => ${doc.data()}`);
  });

  return arrArticles;
};

const Home: FC = () => {
  const [articles, setArticles] = useState<IArticle[]>([] as IArticle[]);
  const [urlImgList, setUrlImgList] = useState<string[]>([]);
  const urlImgList2: string[] = [];

  const getListWithUrlsImg = async () => {
    const arrArticles = await getDb();
    setArticles(arrArticles);
  };

  useEffect(() => {
    getListWithUrlsImg();
  }, []);

  // console.log('get DB', articles);

  return (
    <>
      <div className={css.homeMenu}>
        {' '}
        здесь будет фильтр и возможно что-то еще
      </div>
      <div>
        <p> Щелкните по картинке чтобы просмотреть все</p>
      </div>
      <div className={css.content}>
        {articles.map((article, index) => (
          <ArticleBlank
            key={article.authorId + article.date}
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
