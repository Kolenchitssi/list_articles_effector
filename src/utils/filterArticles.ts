import { IArticle } from '../models/IArticle';

export const filterArticle = (
  articles: IArticle[],
  filter: [key: keyof IArticle, value: string]
) => {
  const [key, value] = filter;
  return articles.filter(item => {
    if (item[key] === value) {
      return true;
    }
    return false;
  });
};
