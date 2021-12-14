// eslint-disable-next-line import/no-extraneous-dependencies
import { StorageReference } from '@firebase/storage';

export interface IArticle {
  [key: string]: string | string[] | StorageReference[];
  authorId: string;
  author: string;
  articleId: string;
  title: string;
  content: string;
  date: string;
  img: string[];
}
