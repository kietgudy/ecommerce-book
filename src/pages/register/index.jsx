import React from 'react';
import './register.scss';
import { Button, Divider, Form, Input } from 'antd';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="register-page">
      <section className="wrapper">
        <div className="heading">
          <h2 className="text text-large">Đăng Ký Tài Khoản</h2>
          <Divider />
        </div>
        <Form
          name="basic"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Họ tên"
            name="fullName"
            rules={[{ required: true, message: 'Họ tên không được để trống!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Email không được để trống!' }]}
          >
            <Input/>
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: 'Mật khẩu không được để trống!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Số điện thoại"
            name="phone"
            rules={[{ required: true, message: 'Số điện thoại không được để trống!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Đăng ký
            </Button>
          </Form.Item>

          <Divider>Or</Divider>
          <p className="text text-normal">
            Đã có tài khoản?
            <span>
              <Link to='/login'> Đăng Nhập </Link>
            </span>
          </p>
        </Form>
      </section>
    </div>
  );
};

export default RegisterPage;
