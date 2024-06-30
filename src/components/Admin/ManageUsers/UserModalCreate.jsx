import { Divider, Form, Input, Modal, message, notification } from "antd";
import React, { useState } from "react";
import { callCreateUser } from "../../../services/api";

const UserModalCreate = (props) => {
  const [isSubmit, setIsSubmit] = useState(false);
  const { openModalCreate, setOpenModalCreate } = props;
  const [form] = Form.useForm();
  //fetch
  const onFinish = async (values) => {
    const { fullName, password, email, phone } = values;
    setIsSubmit(true);
    const res = await callCreateUser(fullName, password, email, phone);
    if (res && res.data) {
      message.success("Tạo mới người dùng thành công!");
      form.resetFields();
      setOpenModalCreate(false);
      await props.fetchUser();
    } else {
      notification.error({
        message: "Đã có lỗi xảy ra :(",
        description: res.message,
      });
    }
    setIsSubmit(false);
  };
  return (
    <Modal
      title="Thêm mới người dùng"
      open={openModalCreate}
      onOk={() => {
        form.submit();
      }}
      confirmLoading={isSubmit}
      onCancel={() => setOpenModalCreate(false)}
      okText={"Tạo mới"}
      cancelText={"Hủy"}
    >
      <Divider />
      <Form
        form={form}
        name="basic"
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          labelCol={{ span: 24 }}
          label="Tên người dùng"
          name="fullName"
          rules={[{ required: true, message: "Vui lòng nhập tên người dùng!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          labelCol={{ span: 24 }}
          label="Password"
          name="password"
          rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          labelCol={{ span: 24 }}
          label="Địa chỉ email"
          name="email"
          rules={[{ required: true, message: "Vui lòng nhập địa chỉ email!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          labelCol={{ span: 24 }}
          label="Số điện thoại"
          name="phone"
          rules={[{ required: true, message: "Vui lòng nhập số điện thoại!" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserModalCreate;
