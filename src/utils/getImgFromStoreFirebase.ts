import {
  getStorage,
  ref,
  StorageReference,
  getDownloadURL,
} from 'firebase/storage';

export const getImgRefsStoreFirebase = (imagesPaths: string[] = []) => {
  const storage = getStorage();
  // const listImagesRefs: StorageReference[] = [];
  // Create a child reference
  // получаем массив ref для картинок в текущей статье
  const listImagesRefs = imagesPaths.map(element => ref(storage, element));

  const listUrlsImages: string[] = [];
  listImagesRefs.forEach(async (item, index) => {
    const listUrls = await getDownloadURL(item);
    console.log(listUrls, 'listUrls');
    listUrlsImages[index] = listUrls;
  });
  return listUrlsImages;
};

//-------------------

// listImagesRefs = getImgRefsStoreFirebase(doc.data().img); // получаем массив ref для картинок в текущей статье

// const listUrlsImages = listImagesRefs.map(async item => {
//   const listUrls = await getDownloadURL(item);
//   return listUrls;
// });

// console.log('listUrlsImages', listUrlsImages);

// const docWithListUrlImages = {
//   ...doc,
//   listUrlsImages: listUrlsImages[0],
// };
