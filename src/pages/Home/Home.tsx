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

  console.log('arrArticles', arrArticles);

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
    console.log('arrListArticles!!!', articles);

    // getImgLinks(arrListArticles);
  }, []);

  console.log('get DB', articles);

  return (
    <>
      <div className={css.homeMenu}>
        {' '}
        здесь будет фильтр и возможно что-то еще
      </div>
      <div>
        {' '}
        <img src={urlImgList[0]} alt='w' style={{ display: 'block' }} />
        poipoipoipoip
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

// const [listArticlesWithUrl, setlistArticlesWithUrl] = useState<IArticleUrlImages[]>([]);
// let listImagesRefs: StorageReference[] = [];
// const listArticlewithImagesUrls: any = [];

// articles.forEach((article, index) => {
// const urlImages = await getImgRefsStoreFirebase(article.img);
// console.log(urlImages, 'urlImages');

//   if (article.img && article.img[0] !== '') {
//     const imagesRefs = ref(storage, article.img[0]);
//     // const listUrls = await getDownloadURL(imagesRefs);
//     console.log(article.img[0]);
//     console.log('входим в  IF!');

//     getDownloadURL(imagesRefs).then(listUrls => {
//       console.log('listUrls', listUrls);
//       listArticlewithImagesUrls[index] = {
//         ...article,
//         listUrlImages: listUrls,
//       };
//     });
//   } else {
//     listArticlewithImagesUrls[index] = {
//       ...article,
//       listUrlImages: null,
//     };
//   }
// });

// console.log(listArticlewithImagesUrls, 'listArticlewithImagesUrls');
// setlistArticlesWithUrl(listArticlewithImagesUrls);

// console.log('listArticlewithImagesUrls', listArticlewithImagesUrls);
// console.log('listArticlesWithUrl', listArticlesWithUrl);

// const getDb = async () => {
//   const db: Firestore = getFirestore();
//   const querySnapshot = await getDocs(collection(db, 'posts'));
//   const arrArticles: IArticle[] = [];

//   querySnapshot.forEach(doc => {
//     arrArticles.push(doc.data() as IArticle);
//     // console.log(`${doc.id} => ${doc.data()}`);
//   });
//   // console.log('arrArticles===', arrArticles, 'arrArticles');

//   return arrArticles;
// };

// const getImgLinks = async (arrArticles: IArticle[]) => {
//   // const images1Refs = ref(storage, 'images/111.jpg');
//   const storage = getStorage();

//   arrArticles.forEach(article => {
//     article.img.forEach(async (imgArrlink, index) => {
//       const imagesRefs = ref(storage, imgArrlink);
//       const urlImg1 = await getDownloadURL(imagesRefs);
//       // eslint-disable-next-line no-param-reassign
//       article.img[index] = urlImg1;
//     });
//   });
