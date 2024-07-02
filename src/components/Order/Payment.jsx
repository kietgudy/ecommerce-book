import React, { useEffect, useState } from "react";
import "./payment.scss";
import { Divider, Form, Input, Radio, message, notification } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useDispatch, useSelector } from "react-redux";
import { callPlaceOrder } from "../../services/api";
import { doPlaceOrderAction } from "../../redux/order/orderSlice";
import { LoadingOutlined } from "@ant-design/icons";

const Payment = (props) => {
  const carts = useSelector((state) => state.order.carts);
  const [isSubmit, setIsSubmit] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  const dispatch = useDispatch();
  console.log("cart,", carts);
  const [form] = Form.useForm();

  useEffect(() => {
    if (carts && carts.length > 0) {
      let sum = 0;
      carts.map((item) => {
        sum += item.quantity * item.detail.price;
      });
      setTotalPrice(sum);
    } else {
      setTotalPrice(0);
    }
  }, [carts]);

  

  const onFinish = async (values) => {
    const detailOrder = carts.map((item) => ({
      bookName: item.detail.mainText,
      quantity: item.quantity,
      _id: item._id,
    }));
    const data = {
      name: values.name,
      address: values.address,
      phone: values.phone,
      totalPrice: totalPrice,
      detail: detailOrder,
    };
    const res = await callPlaceOrder(data);
    if (res && res.data) {
      message.success("Đặt hàng thành công!");
      dispatch(doPlaceOrderAction());
      props.setCurrentStep(2);
    } else {
      notification.error({
        message: "Đã có lỗi xảy ra :(",
        description: res.message,
      });
    }
  };
  return (
    <div className="payment">
      <div className="payment-info">
        <Form form={form}>
          <Form.Item
            style={{ margin: 0 }}
            labelCol={{ span: 24 }}
            label="Tên người nhận"
            name="name"
            rules={[
              {
                required: true,
                message: "Tên người nhận không được để trống!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            style={{ margin: 0 }}
            labelCol={{ span: 24 }}
            label="Số điện thoại"
            name="phone"
            rules={[
              { required: true, message: "Số điện thoại không được để trống!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            style={{ margin: 0 }}
            labelCol={{ span: 24 }}
            label="Thông tin địa chỉ"
            name="address"
            rules={[
              {
                required: true,
                message: "Thông tin địa chỉ không được để trống!",
              },
            ]}
          >
            <TextArea autoFocus rows={4} />
          </Form.Item>
        </Form>
      </div>
      <div className="payment-order">
        <div className="method">
          <div className="method-title">Hình thức thanh toán</div>
          <Radio checked>Thanh toán khi nhận hàng</Radio>
        </div>
        <Divider style={{ margin: "15px 0" }} />
        <div className="sum">
          <strong>Tổng tiền: </strong>
          <span className="sum-final">
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(totalPrice)}
          </span>
          <Divider style={{ margin: "15px 0" }} />
          <button
            onClick={() => {
              setCurrentStep(1);
              form.submit();
            }}
          >
            {isSubmit && (
              <span>
                <LoadingOutlined /> &nbsp;
              </span>
            )}
            Đặt Hàng ({carts?.length ?? 0})
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
