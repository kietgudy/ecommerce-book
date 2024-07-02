import React from "react";
import { Space, Table, Tag } from "antd";
import "./history.scss";
import { HistoryOutlined } from "@ant-design/icons";

const columns = [
  {
    title: "STT",
    dataIndex: "stt",
    key: "stt",
  },
  {
    title: "Đơn hàng",
    dataIndex: "order",
    key: "order",
  },
  {
    title: "Tổng tiền",
    dataIndex: "total",
    key: "total",
  },
  {
    title: "Trạng thái",
    dataIndex: "state",
    key: "state",
  },
  {
    title: "Thời gian",
    dataIndex: "time",
    key: "time",
  },
];

const data = [
  {
    key: "1",
    stt: "1",
    order: "DH001",
    total: "1,000,000 VND",
    state: ["pending"],
    time: "2024-07-03 10:30:00",
  },
];

const History = () => {
  return (
    <div className="history">
      <div className="title">
        <HistoryOutlined /> Lịch sử mua hàng
      </div>
      <Table columns={columns} dataSource={data} pagination={false} />
    </div>
  );
};

export default History;
