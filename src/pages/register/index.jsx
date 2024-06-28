import React, { useState } from 'react';
import './register.scss';
import { Button, Divider, Form, Input, message, notification } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { callRegister } from '../../services/api';

const RegisterPage = () => {
  const navigate = useNavigate()
  const [isSubmit, setIsSubmit] = useState(false)

  const onFinish =  async (values) => {
    const { fullName, email, password, phone} = values
    setIsSubmit(true);
    const res = await callRegister(fullName, email, password, phone);
    setIsSubmit(false);
    if (res?.data?._id) {
      message.success("Đăng ký tài khoản thành công!")
      navigate('/login')
    } else (
      notification.error({
        message: "Có lỗi xảy ra",
        description: res.message && Array.isArray(res.message) ? res.message[0] : res.message,
        duration: 5,
      })
    )
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
            <Button block type="primary" htmlType="submit" loading={isSubmit}>
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
