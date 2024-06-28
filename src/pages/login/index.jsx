import React, { useState } from 'react';
import { Button, Divider, Form, Input, message, notification } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { callRegister } from '../../services/api';

const LoginPage = () => {
  
  const onFinish =  async (values) => {
    
  };


  return (
    <div className="register-page">
      <section className="wrapper">
        <div className="heading">
          <h2 className="text text-large">Đăng Nhập Tài Khoản</h2>
          <Divider />
        </div>
        <Form
          name="basic"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >

          <Form.Item
            label="Email"
            name="username"
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
          
          <Form.Item>
            <Button block type="primary" htmlType="submit">
              Đăng nhập
            </Button>
          </Form.Item>
          <Divider>Or</Divider>
          <p className="text text-normal">
            Chưa có tài khoản?
            <span>
              <Link to='/login'> Đăng Ký </Link>
            </span>
          </p>
        </Form>
      </section>
    </div>
  );
};

export default LoginPage;
