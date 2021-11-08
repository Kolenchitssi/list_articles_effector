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
      {img && img[0] !== '' ? (
        <div>
          <Image
            preview={{ visible: false }}
            width={200}
            src={img[0]}
            onClick={() => setVisible(true)}
          />
          <div style={{ display: 'none' }}>
            <Image.PreviewGroup
              preview={{ visible, onVisibleChange: vis => setVisible(vis) }}
            >
              <Image src='https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp' />
              <Image src='https://gw.alipayobjects.com/zos/antfincdn/cV16ZqzMjW/photo-1473091540282-9b846e7965e3.webp' />
              <Image src='https://gw.alipayobjects.com/zos/antfincdn/x43I27A55%26/photo-1438109491414-7198515b166b.webp' />
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
