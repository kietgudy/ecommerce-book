import React from "react";
import { Button, Col, Form, Input, Row, theme } from "antd";

const InputSearch = (props) => {
  const { token } = theme.useToken();
  const [form] = Form.useForm();

  const formStyle = {
    maxWidth: "none",
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    padding: "10px 24px",
  };

  const onFinish = (values) => {
    let query = "";
    if (values.mainText) {
      query += `&mainText=/${values.mainText}/i`;
    }
    if (values.author) {
      query += `&author=/${values.author}/i`;
    }
    if (values.category) {
      query += `&category=/${values.category}/i`;
    }
    if (query) {
      props.handleSearch(query);
    }
  };

  return (
    <Form
      form={form}
      name="advanced_search"
      style={formStyle}
      onFinish={onFinish}
    >
      <Row gutter={24}>
        <Col span={8}>
          <Form.Item labelCol={{ span: 24 }} name={`mainText`} label={`Tên sách`}>
            <Input placeholder="Tìm kiếm theo tên sách" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item labelCol={{ span: 24 }} name={`author`} label={`Tác giả`}>
            <Input placeholder="Tìm kiếm theo tác giả" />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item
            labelCol={{ span: 24 }}
            name={`category`}
            label={`Thể loại`}
          >
            <Input placeholder="Tìm kiếm theo danh mục" />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24} style={{ textAlign: "right" }}>
          <Button type="primary" htmlType="submit">
            Search
          </Button>
          <Button
            style={{ margin: "0 8px" }}
            onClick={() => {
              form.resetFields();
              props.handleSearch(""); // Clear search
            }}
          >
            Clear
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default InputSearch;
