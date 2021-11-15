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
import FilterArticle from '../../components/FilterArticle/FilterArticle';
import { getDataArrayFromFirebase } from '../../utils/getDataArrayFromFirebase';

interface IArticleUrlImages extends IArticle {
  listUrlImages: StorageReference[];
}

// const getDb = async () => {
//   const db: Firestore = getFirestore();

//   const querySnapshot = await getDocs(collection(db, 'posts'));
//   const arrArticles: IArticle[] = [];

//   querySnapshot.forEach(doc => {
//     arrArticles.push(doc.data() as IArticle);
//     // console.log(`${doc.id} => ${doc.data()}`);
//   });

//   return arrArticles;
// };

// вынес отдельнов функцию getDataArrayFromFirebase

const Home: FC = () => {
  const [articles, setArticles] = useState<IArticle[]>([] as IArticle[]);
  const [resultFilter, setResultFilter] = useState<IArticle[]>(articles);

  const getListWithUrlsImg = async () => {
    const arrArticles = await getDataArrayFromFirebase<IArticle>('posts');

    setArticles(arrArticles);
    setResultFilter(arrArticles);
  };

  useEffect(() => {
    getListWithUrlsImg();
  }, []);

  // console.log('get DB', articles);
  // console.log('resultFilter', resultFilter);
  return (
    <>
      <div className={css.homeMenu}>
        <FilterArticle
          arrArticles={articles}
          setResultFilter={setResultFilter}
        />
      </div>
      <div className={css.upperText}>
        <p> Щелкните по картинке чтобы просмотреть все</p>
      </div>
      <div className={css.content}>
        {resultFilter.map((article, index) => (
          <ArticleBlank
            key={article.authorId + article.date + article.title}
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
