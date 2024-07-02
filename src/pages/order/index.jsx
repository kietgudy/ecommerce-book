import React, { useState } from "react";
import ViewOrder from "../../components/Order/ViewOrder";
import { Result, Steps, Button } from "antd";
import "./order.scss";

const OrderPage = () => {
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
        {currentStep === 2 && (
          <Result className="result"
            status="success"
            title="Chúc mừng bạn đặt hàng thành công!"
            extra={[
              <Button type="primary" key="console">
                Xem lịch sử đặt hàng
              </Button>,
            ]}
          />
        )}
        {currentStep !== 2 && (
          <ViewOrder currentStep={currentStep} setCurrentStep={setCurrentStep} />
        )}
      </div>
    </div>
  );
};

export default OrderPage;
