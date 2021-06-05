import React from 'react';
import { Form, Input, Button, Checkbox, Divider } from 'antd';

import { useHistory } from 'react-router-dom';
import cogoToast from 'cogo-toast';

import Banner from '../img/banner.jpg';
import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";

function Login() {
  const history = useHistory();
  const dispatch = useDispatch()

  const onFinish = (values) => {
    const userData = JSON.parse(localStorage.getItem('userData'));

    if (userData === null || userData === undefined || userData?.length === 0) {
      cogoToast.info('Account not found. Please register first.');
    } else {
      const user = userData.find((el) => el.email === values.email);

      if (user === undefined) {
        cogoToast.info('Email or Password is wrong.');
      } else {
        if (user.password === values.password) {
          cogoToast.success('Login Successful');
          localStorage.setItem('isAuthenticated', true);
          localStorage.setItem('activeUser', JSON.stringify(user))
          dispatch({ type: "loggedInInfo", payload: user })
          history.push('/');
        } else {
          cogoToast.info('Email or Password is wrong.');
        }
      }
    }
  };

  return (
    <div className='container'>
      <div className='img__wrapper'>
        <img src={Banner} alt='Banner' />
      </div>
      <div className='form__wrapper'>
        <div className='form__wrapper__content'>
          <h1>Welcome back!</h1>
          <p>Please login to your account.</p>
          <Form
            className='login-form'
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name='email'
              rules={[
                { required: true, message: 'Please input your Email!' },
                { type: 'email', message: 'Please enter a valid Email!' },
              ]}
            >
              <Input className='form__input' type='email' placeholder='Email' />
            </Form.Item>
            <Form.Item
              name='password'
              rules={[
                { required: true, message: 'Please input your Password!' },
              ]}
            >
              <Input
                className='form__input'
                type='password'
                placeholder='Password'
              />
            </Form.Item>
            <Form.Item className='form__item'>
              <Form.Item name='remember' valuePropName='checked' noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Link className='login-form-forgot' href='/login'>
                Forgot password
              </Link>
            </Form.Item>

            <Form.Item>
              <Button
                type='primary'
                htmlType='submit'
                block
                size='large'
                shape='round'
                className='login-form-button'
              >
                Login
              </Button>
            </Form.Item>

            <Divider />

            <p>
              Don't have an account? <Link to='/register'>Register Now</Link>
            </p>

            <p style={{ textDecoration: 'underline' }}>
              Terms of use & Privacy Policy
            </p>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Login;
