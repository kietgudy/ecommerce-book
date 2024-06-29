import React from "react";
import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
import "./NotPermitted.scss";

const NotPermitted = () => {
  const navigate = useNavigate();
  return (
    <div className="main-notfound">
      <Result
        status="403"
        title="403"
        style={{ paddingTop: "30px" }}
        subTitle="Xin lỗi, bạn không được phép truy cập trang này :("
        extra={
          <Button type="primary" onClick={() => navigate("/")}>
            Về trang chủ
          </Button>
        }
      />
    </div>
  );
};

export default NotPermitted;
