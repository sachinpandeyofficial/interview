import React from "react";
import { Form, Input, Button, Divider, DatePicker } from "antd";

import { useHistory } from "react-router-dom";
import cogoToast from "cogo-toast";

import Banner from "../img/banner.jpg";
import { Link } from "react-router-dom";

function Register() {
  const history = useHistory();

  const onFinish = (values) => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    let newUser = values
    newUser.birthMonth = values.dob._d.getMonth() 
    newUser.birthDate = values.dob._d.getDate()
    if (userData === null || userData === undefined) {
      const data = [newUser];
      localStorage.setItem("userData", JSON.stringify(data));
    } else {
      console.log(newUser)
      userData.push(newUser);
      localStorage.setItem("userData", JSON.stringify(userData));
    }
    cogoToast.success("Registration successfull.");

    history.push("/login");
  };

  return (
    <div className="container">
      <div className="img__wrapper">
        <img src={Banner} alt="Banner" />
      </div>
      <div className="form__wrapper">
        <div className="form__wrapper__content">
          <h1>Register now!</h1>
          <p>Please create you account.</p>
          <Form
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name="name"
              rules={[{ required: true, message: "Please input your Name!" }]}
            >
              <Input className="form__input" type="text" placeholder="Name" />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Please input your Email!" },
                { type: "email", message: "Please enter a valid Email!" },
              ]}
            >
              <Input className="form__input" type="email" placeholder="Email" />
            </Form.Item>
            <Form.Item
              name="mobileNumber"
            >
              <Form.Item
                name="dob"
                rules={[
                  {
                    required: true,
                    message: "Please input your Date Of Birth!",
                  },
                ]}
              >
                <DatePicker placeholder='Date of Birth'/>
              </Form.Item>
              <Input
                className="form__input"
                type="text"
                placeholder="Mobile Number"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <Input
                className="form__input"
                type="password"
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                size="large"
                shape="round"
                className="login-form-button"
              >
                Register
              </Button>
            </Form.Item>

            <Divider />

            <p>
              Already have an account? <Link to="/login">Login Now</Link>
            </p>

            <p style={{ textDecoration: "underline" }}>
              Terms of use & Privacy Policy
            </p>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Register;
