import {
  CloudUploadOutlined,
  PlusCircleOutlined,
  ReloadOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Button, Card, Col, Row, Table } from "antd";
import React, { useEffect, useState } from "react";
import { callFetchListOrder } from "../../../services/api";
import moment from "moment";

const OrderTable = () => {
  const [listOrder, setListOrder] = useState([]);
  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filter, setFilter] = useState("");
  const [sortQuery, setSortQuery] = useState("sort=-updatedAt");

  useEffect(() => {
    fetchOrder();
  }, [current, pageSize, filter, sortQuery]);

  const fetchOrder = async () => {
    let query = `current=${current}&pageSize=${pageSize}`;
    if (filter) {
      query += filter;
    }
    if (sortQuery) {
      query += `&${sortQuery}`;
    }
    const res = await callFetchListOrder(query);
    if (res && res.data) {
      setListOrder(res.data.result);
      setTotal(res.data.meta.total);
    }
  };

  const formatVND = (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " đ";
  };
  const columns = [
    {
      title: "ID",
      width: 250,
      dataIndex: "_id",
      render: (text, record, index) => {
        return (
          <div style={{ cursor: "pointer" }}>
            <a>{record._id}</a>
          </div>
        );
      },
    },
    {
      title: "Giá tiền",
      dataIndex: "totalPrice",
      render: (text) => formatVND(text),
      sorter: true,
    },
    {
      title: "Tên người dùng",
      dataIndex: "name",
      sorter: true,
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      sorter: true,
    },
    {
      title: "Số điện thoại",
      width: 120,
      dataIndex: "phone",
      sorter: true,
      width: 180,
    },
    {
      title: "Ngày chỉnh sửa",
      dataIndex: "updatedAt",
      sorter: true,
      render: (text) => moment(text).format("DD-MM-YYYY HH:mm:ss"),
      width: 180,
    },
  ];

  const onChange = (pagination, filters, sorter, extra) => {
    if (pagination && pagination.current !== current) {
      setCurrent(pagination.current);
    }
    if (pagination && pagination.pageSize !== pageSize) {
      setPageSize(pagination.pageSize);
      setCurrent(1);
    }
    if (sorter && sorter.field) {
      const q =
        sorter.order === "ascend"
          ? `sort=${sorter.field}`
          : `sort=-${sorter.field}`;
      setSortQuery(q);
    }
  };

  return (
    <div>
      <Row gutter={[20, 20]}>
        <Col span={24}>{/* <InputSearch handleSearch={handleSearch} /> */}</Col>
        <Col span={24}>
          <Card
            title="QUẢN LÝ ĐƠN HÀNG"
            extra={
              <div style={{ display: "flex", gap: 15 }}>
                <Button type="primary">
                  <UploadOutlined />
                  Export
                </Button>
                <Button disabled={true} type="primary">
                  <CloudUploadOutlined />
                  Import
                </Button>
                <Button type="primary">
                  <PlusCircleOutlined />
                  Add new
                </Button>
                <ReloadOutlined type="ghost" style={{ fontSize: "17px" }} />
              </div>
            }
          >
            <Table
              columns={columns}
              onChange={onChange}
              dataSource={listOrder}
              rowKey="_id"
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default OrderTable;
