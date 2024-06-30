import React, { useState } from "react";
import { Badge, Descriptions, Drawer } from "antd";
import moment from "moment/moment";

const UserViewDetail = (props) => {
  const [open, setOpen] = useState(false);
  const {
    openViewDetail,
    setOpenViewDetail,
    dataViewDetail,
  } = props;
  const onClose = () => {
    setOpenViewDetail(false);
  };

  return (
    <>
      <Drawer
        title="Xem chi tiết"
        width={"50vw"}
        onClose={onClose}
        open={openViewDetail}
      >
        <Descriptions title="Thông tin người dùng" bordered column={2}>
          <Descriptions.Item label="ID">
            {dataViewDetail?._id}
          </Descriptions.Item>
          <Descriptions.Item label="Tên người dùng">
            {dataViewDetail?.fullName}
          </Descriptions.Item>
          <Descriptions.Item label="Email">
            {dataViewDetail?.email}
          </Descriptions.Item>
          <Descriptions.Item label="Số điện thoại">
            {dataViewDetail?.phone}
          </Descriptions.Item>
          <Descriptions.Item label="Role" span={2}>
            <Badge status="processing" text={dataViewDetail?.role} />
          </Descriptions.Item>
          <Descriptions.Item label="Ngày tạo">
            {moment(dataViewDetail?.createdAt).format("DD-MM-YYYY HH:mm:ss")}
          </Descriptions.Item>
          <Descriptions.Item label="Ngày chỉnh sửa">
            {moment(dataViewDetail?.updatedAt).format("DD-MM-YYYY HH:mm:ss")}
          </Descriptions.Item>
        </Descriptions>
      </Drawer>
    </>
  );
};

export default UserViewDetail;
