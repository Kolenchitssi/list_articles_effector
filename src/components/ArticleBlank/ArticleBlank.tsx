import { Card, Image } from 'antd';
import React, { FC, useState } from 'react';
import { IArticle } from '../../models/IArticle';
import css from './ArticleBlank.module.scss';

const ArticleBlank: FC<IArticle> = ({
  title,
  content,
  date,
  img,
  author,
  authorId,
}) => {
  const [visible, setVisible] = useState(false);
  const imgPath = `gs://listarticleseffector.appspot.com/${img[0]}`;
  return (
    <Card title={title} bordered={false} className={css.card}>
      <p className={css.content}>{content}</p>
      {img.length > 1 && img[0] !== '' ? (
        <div>
          <Image
            preview={{ visible: false }}
            width={200}
            src={img[0]}
            alt='picture'
            title='Щелкните по картинке чтобы просмотреть все'
            onClick={() => setVisible(true)}
          />
          <div style={{ display: 'none' }}>
            <Image.PreviewGroup
              preview={{ visible, onVisibleChange: vis => setVisible(vis) }}
            >
              {img.map(url => (
                <Image src={url} key={url} />
              ))}
            </Image.PreviewGroup>
          </div>
        </div>
      ) : null}

      <p className={css.author}>{author}</p>

      <p className={css.date}>{date}</p>
    </Card>
  );
};

export default ArticleBlank;
