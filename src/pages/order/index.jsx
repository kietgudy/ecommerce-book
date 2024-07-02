import React, { useState } from "react";
import ViewOrder from "../../components/Order/ViewOrder";
import { Result, Steps } from "antd";
import Payment from "../../components/Order/Payment";
import "./order.scss";

const OrderPage = (props) => {
  const [currentStep, setCurrentStep] = useState(0);
  return (
    <div style={{ background: "#efefef", padding: "20px 0" }}>
      <div className="order-container">
        <div className="order-step">
          <Steps
            size="small"
            current={currentStep}
            status={"finish"}
            items={[
              {
                title: "Đơn hàng",
              },
              {
                title: "Đặt hàng",
              },
              {
                title: "Thanh toán",
              },
            ]}
          />
        </div>
        {
          <ViewOrder
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
          />
        }
        {currentStep === 2 && (
          <Result
            status="success"
            title="Chúc mừng bạn đặt hàng thành công!"
            extra={[
              <Button type="primary" key="console">
                Xem lịch sử đặt hàng
              </Button>,
            ]}
          />
        )}
      </div>
    </div>
  );
};

export default OrderPage;
