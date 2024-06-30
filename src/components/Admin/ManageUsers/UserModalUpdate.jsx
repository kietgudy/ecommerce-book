import { Divider, Form, Input, Modal, message, notification } from "antd";
import React, { useEffect, useState } from "react";
import { callUpdateUser } from "../../../services/api";

const UserModalUpdate = (props) => {
  const [isSubmit, setIsSubmit] = useState(false);
  const { openModalUpdate, setOpenModalUpdate, dataUpdate, setDataUpdate } =
    props;
  const [form] = Form.useForm();
  //fetch

  const onFinish = async (values) => {
    const { fullName, _id, phone } = values;
    setIsSubmit(true);
    const res = await callUpdateUser(_id, fullName, phone);
    if (res && res.data) {
      message.success("Cập nhật người dùng thành công!");
      setOpenModalUpdate(false);
      await props.fetchUser();
    } else {
      notification.error({
        message: "Đã có lỗi xảy ra :(",
        description: res.message,
      });
    }
    setIsSubmit(false);
  };
  useEffect(() => {
    form.setFieldsValue(dataUpdate);
  }, [dataUpdate]);
  return (
    <Modal
      title="Thêm mới người dùng"
      open={openModalUpdate}
      onOk={() => {
        form.submit();
      }}
      onCancel={() => {
        setOpenModalUpdate(false);
        setDataUpdate(null);
      }}
      okText={"Cập nhật"}
      cancelText={"Hủy"}
      confirmLoading={isSubmit}
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
          hidden
          labelCol={{ span: 24 }}
          label="ID"
          name="_id"
          rules={[{ required: true, message: "Vui lòng nhập ID!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          labelCol={{ span: 24 }}
          label="Tên người dùng"
          name="fullName"
          rules={[{ required: true, message: "Vui lòng nhập tên người dùng!" }]}
        >
          <Input />
        </Form.Item>
        {/* <Form.Item
          labelCol={{ span: 24 }}
          label="Password"
          name="password"
          rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
        >
          <Input.Password />
        </Form.Item> */}
        <Form.Item
          labelCol={{ span: 24 }}
          label="Địa chỉ email"
          name="email"
          rules={[{ required: true, message: "Vui lòng nhập địa chỉ email!" }]}
        >
          <Input disabled />
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

export default UserModalUpdate;
