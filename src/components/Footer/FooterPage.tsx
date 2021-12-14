import React, { FC } from 'react';
import { Footer } from 'antd/lib/layout/layout';
import css from './FooterPage.module.scss';

const FooterPage: FC = () => (
  <Footer className={css.footer}>
    <p>Сайт разработан с помощью React and Effector </p>
  </Footer>
);

export default FooterPage;
