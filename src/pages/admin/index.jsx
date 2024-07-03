import React, { useEffect, useState } from "react";
import { callFetchDashBoard } from "../../services/api";
import { Card, Col, Row, Statistic } from "antd";
import CountUp from "react-countup";

const AdminPage = () => {
  const [dataDashBoard, setDataDashBoard] = useState({
    countOrder: 0,
    countUser: 0,
  });
  useEffect(() => {
    const initDashBoard = async () => {
      const res = await callFetchDashBoard();
      if (res && res.data) setDataDashBoard(res.data);
      console.log(res.data);
    };
    initDashBoard();
  }, []);
  const formatter = (value) => <CountUp end={value} separator="," />;
  return (
    <Row gutter={[40, 40]} style={{margin: "30px 20px"}}>
      <Col span={10}>
      <Card title="" bordered={false}>
        <Statistic title="Tổng người dùng" value={dataDashBoard.countUser} formatter={formatter}/>
      </Card>
      </Col>
      <Col span={10}>
      <Card title="" bordered={false}>
        <Statistic title="Tổng đơn hàng" value={dataDashBoard.countOrder} formatter={formatter}/>
      </Card>
      </Col>
    </Row>
  );
};

export default AdminPage;
