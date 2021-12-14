import React, { FC, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Alert, Input, Form, Button } from 'antd';
import { useStore } from 'effector-react';
import {
  getFirestore,
  Firestore,
  collection,
  addDoc,
  setDoc,
  getDocs,
} from 'firebase/firestore';
// eslint-disable-next-line import/no-extraneous-dependencies
import { getDownloadURL, getStorage, ref } from '@firebase/storage';
import { IArticle } from '../../models/IArticle';
import { RoutePath } from '../../router/RoutePath';
import { $currentUser } from '../../store/currentUser';
import css from './AddArticle.module.scss';
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

const AddArticle: FC = () => {
  const [article, setArticle] = useState<IArticlePicture>(
    {} as IArticlePicture
  );
  const [errorMsg, setErrorMsg] = useState('');
  const user = useStore($currentUser);
  // console.log('user', $currentUser);

  const history = useHistory();
  const db: Firestore = getFirestore();
  const storage = getStorage();
  // при вводе в отдельные поля вся форма перерисовывается :(

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
        const docRef = await addDoc(collection(db, 'posts'), {
          // запись поста в Базу Данных
          author: user.name,
          authorId: user.id,
          date: formatDate(new Date()),
          title: article.title,
          content: article.content,
          img: imagesPath,
        });
        await setDoc(docRef, { articleId: docRef.id }, { merge: true });
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

      <Form
        className={css.form}
        name='basic'
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 12 }}
        initialValues={{ remember: true }}
        onFinish={addPostHandler}
        onFinishFailed={() => setErrorMsg('Ошибка сохранения')}
        autoComplete='off'
      >
        <Form.Item
          label='Title'
          name='title'
          rules={[{ required: true, message: 'Title your article!' }]}
        >
          <Input
            placeholder='title'
            value={article.title}
            onChange={e => {
              setArticle({ ...article, title: e.target.value });
            }}
          />
        </Form.Item>

        <Form.Item
          label='Content'
          name='content'
          rules={[{ required: true, message: 'Please input your text!' }]}
        >
          <Input.TextArea
            rows={12}
            placeholder='your text'
            value={article.content}
            onChange={e => {
              setArticle({ ...article, content: e.target.value });
            }}
          />
        </Form.Item>

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

export default AddArticle;
