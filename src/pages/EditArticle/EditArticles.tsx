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

export interface INewImages {
  img: FileList | null;
  pathImages: string[];
}

const EditArticle: FC = () => {
  const articleId: { id: string } = useParams();
  console.log('articleId', articleId.id, typeof articleId);

  const [currentArticle, setCurrentArticle] = useState<IArticle>(
    {} as IArticle
  );
  const [newImages, setNewImages] = useState<INewImages>({} as INewImages);
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
        if (newImages.img) {
          for (let i = 0; i < newImages.img.length; i++) {
            imagesPath[i] = writingImageToFirebase(newImages.img[i]).fullPath; // записываем и получаем путь к img файлу
            const imagesRefs = ref(storage, imagesPath[i]);
            // eslint-disable-next-line no-await-in-loop
            const urlImg1 = await getDownloadURL(imagesRefs); // получаем полный url картинки
            imagesPath[i] = urlImg1.toString();
          }
          setNewImages({ ...newImages, pathImages: imagesPath });
        }

        await setDoc(
          docRef,
          {
            title: currentArticle.title,
            content: currentArticle.content,
            img: imagesPath,
          },
          { merge: true }
        );

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
          placeholder='Title'
          value={currentArticle.title}
          className={css.titleArticle}
          onChange={e => {
            setCurrentArticle({ ...currentArticle, title: e.target.value });
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
            setCurrentArticle({ ...currentArticle, content: e.target.value });
            console.log(currentArticle);
          }}
        />
        {/* </Form.Item> */}

        {currentArticle.img &&
        currentArticle.img.length > 0 &&
        currentArticle.img[0] !== '' ? (
          <div className={css.pictureGrid}>
            {currentArticle.img.map(item => (
              <div className={css.wrapImg}>
                {' '}
                <img src={item} alt='' key={item} />
              </div>
            ))}
          </div>
        ) : null}

        <Form.Item
          label='Заменить изображения на:'
          name='img'
          rules={[{ required: false, message: 'Please choose image' }]}
        >
          <Input
            type='file'
            accept='.jpg, .jpeg, .png'
            placeholder='Please choose image'
            name='file'
            multiple
            onChange={e => {
              setNewImages({ ...newImages, img: e.target.files }); // = FileList: [file1, file2,...  etc]
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
