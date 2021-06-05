import React, {  useState } from "react";

import { Spin, Divider, Form, Input, Button } from "antd";
import { useHistory } from "react-router-dom";

import { useDispatch } from "react-redux";

function Add() {
  const history = useHistory();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    console.log(values)
    dispatch({ type: "member/add", payload: values });
    history.push('/');
  };

  return (
    <div className="home__wrapper">
      {loading ? (
        <Spin />
      ) : (
        <>
          <div className="header">
            <h1>ADD MEMBER</h1>
          </div>
          <Divider />
          <Form style={{width:'300px'}}
            className='login-form'
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name='first_name'
              rules={[{ required: true, message: 'Please input First Name!' }]}
            >
              <Input className='form__input' type='text' placeholder='First Name' />
            </Form.Item>
            <Form.Item
              name='last_name'
              rules={[{ required: true, message: 'Please input Last Name!' }]}
            >
              <Input className='form__input' type='text' placeholder='Last Name' />
            </Form.Item>
            <Form.Item
              name='email'
              rules={[
                { required: true, message: 'Please input Email!' },
                { type: 'email', message: 'Please enter a valid Email!' },
              ]}
            >
              <Input className='form__input' type='email' placeholder='Email' />
            </Form.Item>
            <Form.Item
              name='id'
              rules={[
                { required: true, message: 'Please input Member Id!' },
              ]}
            >
              <Input
                className='form__input'
                type='number'
                placeholder='Member Id'
              />
            </Form.Item>
            <Form.Item
              name='avatar'
            >
              <Input
                className='form__input'
                type='text'
                placeholder='Avatar url'
              />
            </Form.Item>
            <Form.Item>
              <Button
                type='primary'
                htmlType='submit'
                block
                size='medium'
                shape='round'
                className='login-form-button'
              >
                ADD
              </Button>
            </Form.Item>
            <Button
                type='primary'
                size='medium'
                shape='round'
               block
               onClick={()=>history.push('/')}
              >
                BACK
              </Button>
          </Form>
          <Divider/>
        </>
      )}
    </div>
  );
}

export default Add;
