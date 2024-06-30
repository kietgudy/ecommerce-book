import React, { useState } from "react";
import { Badge, Descriptions, Drawer } from "antd";
import moment from "moment/moment";

const BookViewDetail = (props) => {
  const [open, setOpen] = useState(false);
  const {
    openViewDetail,
    setOpenViewDetail,
    dataViewDetail,
  } = props;
  const onClose = () => {
    setOpenViewDetail(false);
  };
  const formatVND = (value) => {
    if (value != null) {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " đ";
    }
    return "";
  };

  return (
    <>
      <Drawer
        title="Xem chi tiết"
        width={"50vw"}
        onClose={onClose}
        open={openViewDetail}
      >
        <Descriptions title="Thông tin sách" bordered column={2}>
          <Descriptions.Item label="ID">
            {dataViewDetail?._id}
          </Descriptions.Item>
          <Descriptions.Item label="Tên sách">
            {dataViewDetail?.mainText}
          </Descriptions.Item>
          <Descriptions.Item label="Tác giả">
            {dataViewDetail?.author}
          </Descriptions.Item>
          <Descriptions.Item label="Giá tiền">
            {formatVND(dataViewDetail?.price)}
          </Descriptions.Item>
          <Descriptions.Item label="Thể loại" span={2}>
            <Badge status="processing" text={dataViewDetail?.category} />
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

export default BookViewDetail;
