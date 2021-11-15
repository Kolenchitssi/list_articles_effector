import React, { useCallback, useEffect, useState } from 'react';
import { Form, Input, Button, Select, Row, Col, Alert, DatePicker } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { IArticle } from '../../models/IArticle';
import css from './FilterArticle.module.scss';
import { getDataArrayFromFirebase } from '../../utils/getDataArrayFromFirebase';
import { IUser } from '../../models/IUser';

const { Option } = Select;
// let AllUserArr: IUser[] = []; // неправильный 2й вариант не вызовет перерендер, но у меня работал почему-то

interface Iprops {
  arrArticles: IArticle[];
  setResultFilter: React.Dispatch<React.SetStateAction<IArticle[]>>;
}

const FilterArticle = (props: Iprops) => {
  const { arrArticles, setResultFilter } = props;
  const [allAuthors, setAllAuthors] = useState([] as IUser[]);
  const [filter, setFilter] = useState('');
  const [filterVal, setFilterVal] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // при ее использоавние не получаю список авторов
  // const memoizedSetAllAuthor = useCallback(
  //   () => setAllAuthors(allAuthors),
  //   [allAuthors]
  // );

  // -------получаем массив авторов -/- get an array of authors
  const getAllAuthors = async () => {
    const arrAuthors = await getDataArrayFromFirebase<IUser>('allUsers');
    // memoizedSetAllAuthor();
    setAllAuthors(arrAuthors); // 1й вариант - заношу в state
    // AllUserArr = [...arrAuthors]; // 2й вариант - неправильный но работал - заношу в переменую за асинхронной функцией
  };

  useEffect(() => {
    getAllAuthors();
    setErrorMsg('');
  }, []);

  // ------------------------------------

  const onFinish = (
    arr: IArticle[],
    filterKey: string,
    filterValue: string
  ) => {
    if (filterKey === 'authorId' || filterKey === 'date') {
      const result = arr.filter(
        (item: IArticle) => item[filterKey] === filterValue
      );
      setResultFilter(result);
    }

    if (filterKey === 'title' && filterValue) {
      const result = arr.filter((item: IArticle) => {
        const lowerCaseTitle = item[filterKey].toLowerCase();
        const lowerCaseText = filterValue.toLowerCase();
        if (lowerCaseTitle.includes(lowerCaseText)) {
          return true;
        }
        return false;
      });
      setResultFilter(result);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    setErrorMsg(errorInfo.msg.toString());
    console.log('Failed:', errorInfo);
  };

  return (
    <div className={css.filter}>
      {errorMsg && (
        <Alert
          type='error'
          style={{ marginBottom: 20, textAlign: 'center' }}
          message='Error'
          description={errorMsg}
        />
      )}
      <Form
        name='basic'
        labelCol={{ span: 12 }}
        wrapperCol={{ span: 12 }}
        initialValues={{ remember: true }}
        onFinish={() => onFinish(arrArticles, filter, filterVal)}
        onFinishFailed={onFinishFailed}
        autoComplete='off'
      >
        <Row
          justify='space-around'
          style={{ margin: 0, padding: 0, height: '40px' }}
        >
          <Col span={6}>
            <Form.Item
              label='Filter'
              name='filter'
              rules={[{ required: true, message: 'Please select filter!' }]}
            >
              <Select
                value={filter}
                style={{ width: 180, margin: '0 8px' }}
                onChange={(filterValue: string) => {
                  setResultFilter(arrArticles);
                  setFilter(filterValue);
                }}
              >
                <Option value='all'>Все</Option>
                <Option value='authorId'>Автор</Option>
                <Option value='title'>Заголовок</Option>
                <Option value='date'>Дата</Option>
              </Select>
            </Form.Item>
          </Col>

          {filter === 'all' && null}

          {filter === 'authorId' ? (
            <Col span={10}>
              <Form.Item
                label='Имя:'
                name='AuthorValue'
                rules={[{ required: true, message: 'Please select author' }]}
              >
                <Select
                  value={filter}
                  style={{ width: 180, margin: '0 8px' }}
                  onChange={(author: string) => setFilterVal(author)}
                >
                  {allAuthors.map(author => (
                    <Option value={author.id} key={author.id}>
                      {author.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          ) : null}

          {filter === 'title' ? (
            <Col span={10}>
              <Form.Item
                label='Заголовок содержит:'
                name='titleValue'
                rules={[{ required: true, message: 'Please input title' }]}
              >
                <Input
                  value={filterVal}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setFilterVal(e.target.value);
                  }}
                />
              </Form.Item>
            </Col>
          ) : null}
          {filter === 'date' ? (
            <Col span={10}>
              <Form.Item
                label='Статья написана:'
                name='titleValue'
                rules={[{ required: true, message: 'Please select date' }]}
              >
                <DatePicker
                  onChange={(date, dateString) => {
                    // console.log(date, dateString);
                    setFilterVal(dateString);
                  }}
                />
              </Form.Item>
            </Col>
          ) : null}

          {filter !== 'all' ? (
            <Col span={6}>
              <Form.Item wrapperCol={{ span: 4 }}>
                <Button type='primary' htmlType='submit'>
                  <SearchOutlined /> Search
                </Button>
              </Form.Item>
            </Col>
          ) : null}
        </Row>
      </Form>
    </div>
  );
};

export default FilterArticle;
