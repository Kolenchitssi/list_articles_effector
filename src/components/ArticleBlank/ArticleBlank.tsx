import { DeleteTwoTone, EditTwoTone } from '@ant-design/icons';
import { Button, Card, Image } from 'antd';
import React, { FC, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { IArticle } from '../../models/IArticle';
import { RoutePath } from '../../router/RoutePath';
import css from './ArticleBlank.module.scss';

const ArticleBlank: FC<IArticle> = ({
  title,
  content,
  date,
  img,
  author,
  authorId,
  articleId,
}) => {
  const history = useHistory();
  const [visible, setVisible] = useState(false);

  return (
    <Card title={title} bordered={false} className={css.card}>
      <p className={css.content}>{content}</p>
      {img.length > 0 && img[0] !== '' ? (
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
      <div className={css.footerButton}>
        <Button
          type='ghost'
          size='large'
          className={css.editButton}
          onClick={e => {
            console.log(e);
            history.push(`/edit_article/${articleId}`);
          }}
        >
          <EditTwoTone twoToneColor='#5b98c6' style={{ fontSize: '24px' }} />
        </Button>
        <Button type='ghost' size='large' className={css.deleteButton}>
          <DeleteTwoTone twoToneColor='#eb2f96' style={{ fontSize: '24px' }} />
        </Button>
      </div>
    </Card>
  );
};

export default ArticleBlank;
