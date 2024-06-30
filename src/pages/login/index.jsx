import React, { useState } from "react";
import { Button, Divider, Form, Input, message, notification } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { callLogin } from "../../services/api";
import "./login.scss";
import { SmileOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { doLoginAction } from "../../redux/account/accountSlice";

const LoginPage = () => {
  const navigate = useNavigate();
  const [isSubmit, setIsSubmit] = useState(false);

  const dispatch = useDispatch();

  const onFinish = async (values) => {
    const { username, password } = values;
    setIsSubmit(true);
    const res = await callLogin(username, password);
    setIsSubmit(false);
    if (res?.data) {
      localStorage.setItem("access_token", res.data.access_token);
      dispatch(doLoginAction(res.data.user));
      if (res.data.user?.role === "ADMIN") {
        message.success("Xin chào Admin!");
      } else {
        message.success("Đăng nhập tài khoản thành công!");
      }
      navigate("/");
    } else {
      notification.error({
        message: "Có lỗi xảy ra",
        description:
          res.message && Array.isArray(res.message)
            ? res.message[0]
            : res.message,
        duration: 5,
      });
    }
  };

  return (
    <div className="register-page">
      <section className="wrapper">
        <div className="heading">
          <span style={{ fontSize: "25px", color: "#188ee3" }}>
            <SmileOutlined />
          </span>
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
            rules={[{ required: true, message: "Email không được để trống!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[
              { required: true, message: "Mật khẩu không được để trống!" },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button block type="primary" htmlType="submit" loading={isSubmit}>
              Đăng nhập
            </Button>
          </Form.Item>
          <Divider style={{ fontSize: "14px", fontWeight: "400" }}>
            Hoặc
          </Divider>
          <p className="text text-normal">
            Chưa có tài khoản?
            <span>
              <Link to="/register"> Đăng Ký </Link>
            </span>
          </p>
        </Form>
      </section>
    </div>
  );
};

export default LoginPage;
