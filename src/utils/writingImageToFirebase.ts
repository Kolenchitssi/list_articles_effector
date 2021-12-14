import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { firebaseApp } from '..';

export const writingImageToFirebase = (imageFile: File) => {
  // const storage=getStorage(firebaseApp)
  const storage = getStorage();

  // Create a reference to 'mountains.jpg'
  // ссылка к файлу в хранилище

  const mountainImagesRef = ref(storage, `images/${imageFile.name}`);

  // загружаем файл
  // 'file' comes from the Blob or File API
  uploadBytes(mountainImagesRef, imageFile).then(snapshot => {
    console.log('Uploaded a blob or file!');
  });
  return mountainImagesRef;
};
