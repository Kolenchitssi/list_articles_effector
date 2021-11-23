import React, { FC, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Alert, Input, Form, Button } from 'antd';
import { useStore } from 'effector-react';
import {
  getFirestore,
  Firestore,
  collection,
  addDoc,
  doc,
  setDoc,
  getDoc,
} from 'firebase/firestore';
// eslint-disable-next-line import/no-extraneous-dependencies
import { getDownloadURL, getStorage, ref } from '@firebase/storage';
import { IArticle } from '../../models/IArticle';
import { RoutePath } from '../../router/RoutePath';
import { $currentUser } from '../../store/currentUser';
import css from './EditArticle.module.scss';
import { writingImageToFirebase } from '../../utils/writingImageToFirebase';
import { formatDate } from '../../utils/formatDate';

export interface IArticlePicture {
  authorId: string;
  author: string;
  title: string;
  content: string;
  date: string;
  img: FileList | null;
}

const EditArticle: FC = () => {
  const articleId: { id: string } = useParams();
  console.log('articleId', articleId.id, typeof articleId);

  const [currentArticle, setCurrentArticle] = useState<IArticle>(
    {} as IArticle
  );
  const [article, setArticle] = useState<IArticlePicture>(
    {} as IArticlePicture
  );
  const [errorMsg, setErrorMsg] = useState('');
  const user = useStore($currentUser);

  const history = useHistory();
  const db: Firestore = getFirestore();
  const storage = getStorage();
  // при вводе в отдельные поля вся форма перерисовывается :(

  const docRef = doc(db, 'posts', articleId.id);

  const getCurrentArticle = async () => {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      await setCurrentArticle(docSnap.data() as IArticle);
      console.log('Document data:', docSnap.data());
      console.log('currentArticle', currentArticle);
    } else {
      setErrorMsg('Ошибка чтения, статья не найдена');
      // doc.data() will be undefined in this case
      console.log('No such document!');
    }
  };

  useEffect(() => {
    getCurrentArticle();
    console.log('получаем текущую статью');
  }, []);

  const addPostHandler = async () => {
    const imagesPath: string[] = [];
    if (user) {
      try {
        if (article.img) {
          for (let i = 0; i < article.img.length; i++) {
            imagesPath[i] = writingImageToFirebase(article.img[i]).fullPath; // записываем и получаем путь к img файлу
            const imagesRefs = ref(storage, imagesPath[i]);
            // eslint-disable-next-line no-await-in-loop
            const urlImg1 = await getDownloadURL(imagesRefs); // получаем полный url картинки
            imagesPath[i] = urlImg1.toString();
          }
        }

        await setDoc(docRef, { articleId: docRef.id }, { merge: true });

        // const docRef = await addDoc(collection(db, 'posts'), {
        //   // запись поста в Базу Данных
        //   author: user.name,
        //   authorId: user.id,
        //   date: formatDate(new Date()),
        //   title: article.title,
        //   content: article.content,
        //   img: imagesPath,
        // });
        // console.log(
        //   'Document written with ID: ',
        //   docRef.id,
        //   'imagesPath',
        //   imagesPath[0]
        // );
        history.push(RoutePath.HOME);
      } catch (e: any) {
        setErrorMsg(e);
      }
    }
  };

  return (
    <>
      {errorMsg && (
        <Alert
          type='error'
          style={{ marginBottom: 20, textAlign: 'center' }}
          message='Error'
          description={errorMsg}
        />
      )}
      <p>{currentArticle.title}</p>

      <Form
        className={css.form}
        name='basic'
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 12 }}
        initialValues={{ remember: true }}
        onFinish={addPostHandler}
        onFinishFailed={() => setErrorMsg('Error')}
        autoComplete='off'
      >
        {/* <Form.Item
          label='Title'
          name='title'
          rules={[{ required: true, message: 'Title your article!' }]}
        > */}
        <input
          // placeholder='Title'
          value={currentArticle.title}
          onChange={e => {
            setArticle({ ...article, title: e.target.value });
          }}
        />
        {/* </Form.Item> */}

        {/* <Form.Item
          label='Content'
          name='content'
          rules={[{ required: true, message: 'Please input your text!' }]}
        > */}
        <textarea
          className={css.textArea}
          placeholder='Enter text'
          value={currentArticle.content}
          onChange={e => {
            setArticle({ ...article, content: e.target.value });
          }}
        />
        {/* </Form.Item> */}

        {/* <img src={currentArticle.img[0]} alt='' /> */}

        <Form.Item
          label='Img'
          name='img'
          rules={[{ required: false, message: 'Please choose image' }]}
        >
          <Input
            type='file'
            accept='.jpg, .jpeg, .png'
            placeholder='Please choose image'
            multiple
            // value={article.img.}
            onChange={e => {
              setArticle({ ...article, img: e.target.files }); // = FileList: [file1, file2,...  etc]
              console.log(e.target.files);
            }}
          />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button
            type='ghost'
            size='large'
            htmlType='submit'
            className={css.buttonAdd}
          >
            Save
          </Button>
          <Button
            type='ghost'
            size='large'
            htmlType='submit'
            className={css.buttonCancel}
            onClick={() => {
              history.push(RoutePath.HOME);
            }}
          >
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default EditArticle;
