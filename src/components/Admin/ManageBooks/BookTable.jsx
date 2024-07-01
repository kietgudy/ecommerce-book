import React, { useEffect, useState } from "react";
import {
  Table,
  Row,
  Col,
  Card,
  Button,
  Popconfirm,
  message,
  notification,
} from "antd";
import InputSearch from "./InputSearch.jsx";
import {
  CloudUploadOutlined,
  DeleteFilled,
  EditFilled,
  EyeFilled,
  PlusCircleOutlined,
  ReloadOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { callFetchListBook } from "../../../services/api.js";
import moment from "moment/moment";
import BookViewDetail from "./BookViewDetail.jsx";
import BookModalCreate from "./BookModalCreate.jsx";
import BookModalUpdate from "./BookModalUpdate.jsx";

const BookTable = () => {
  const [listBook, setListBook] = useState([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState("");
  const [sortQuery, setSortQuery] = useState("sort=-updatedAt");
  const [dataViewDetail, setDataViewDetail] = useState(null);
  const [openViewDetail, setOpenViewDetail] = useState(false);
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [dataUpdate, setDataUpdate] = useState(null);

  useEffect(() => {
    fetchBook();
  }, [current, pageSize, filter, sortQuery]);

  const fetchBook = async () => {
    setIsLoading(true);
    let query = `current=${current}&pageSize=${pageSize}`;
    if (filter) {
      query += filter;
    }
    if (sortQuery) {
      query += `&${sortQuery}`;
    }
    const res = await callFetchListBook(query);
    if (res && res.data) {
      setListBook(res.data.result);
      setTotal(res.data.meta.total);
    }
    setIsLoading(false);
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
          <div
            onClick={() => {
              setDataViewDetail(record); //data row
              setOpenViewDetail(true);
            }}
            style={{ cursor: "pointer" }}
          >
            <EyeFilled
              style={{
                fontSize: "17px",
                marginRight: "10px",
                marginTop: "3px",
              }}
            />
            <a>{record._id}</a>
          </div>
        );
      },
    },
    {
      title: "Tên sách",
      dataIndex: "mainText",
      sorter: true,
    },
    {
      title: "Tác giả",
      dataIndex: "author",
      sorter: true,
    },
    {
      title: "Thể loại",
      dataIndex: "category",
      sorter: true,
    },
    {
      title: "Giá tiền",
      width: 120,
      dataIndex: "price",
      sorter: true,
      render: (text) => formatVND(text),
    },
    {
      title: "Ngày chỉnh sửa",
      dataIndex: "updatedAt",
      sorter: true,
      render: (text) => moment(text).format("DD-MM-YYYY HH:mm:ss"),
    },
    {
      title: "Action",
      width: 100,
      render: (text, record, index) => {
        return (
          <>
            <EditFilled
              style={{
                fontSize: "19px",
                color: "#00cd00",
                cursor: "pointer",
                marginRight: 15,
              }}
              onClick={() => {
                setOpenModalUpdate(true);
                setDataUpdate(record);
              }}
            />
            <Popconfirm
              placement="left"
              title={"Xác nhận xóa sách"}
              description={"Bạn có chắc chắn muốn xóa sách này?"}
              okText="Xác nhận"
              cancelText="Hủy"
            >
              <DeleteFilled
                style={{ fontSize: "19px", color: "red", cursor: "pointer" }}
              />
            </Popconfirm>
          </>
        );
      },
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
  const handleSearch = (query) => {
    setFilter(query);
  };

  return (
    <>
      <Row gutter={[20, 20]}>
        <Col span={24}>
          <InputSearch handleSearch={handleSearch} />
        </Col>
        <Col span={24}>
          <Card
            title="QUẢN LÝ SÁCH"
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
                <Button type="primary" onClick={() => setOpenModalCreate(true)}>
                  <PlusCircleOutlined />
                  Add new
                </Button>
                <ReloadOutlined
                  onClick={() => {
                    setFilter("");
                    setSortQuery("");
                    setCurrent(1);
                    setPageSize(10);
                  }}
                  type="ghost"
                  style={{ fontSize: "17px" }}
                />
              </div>
            }
          >
            <Table
              columns={columns}
              loading={isLoading}
              dataSource={listBook}
              onChange={onChange}
              rowKey="_id"
              pagination={{
                current: current,
                pageSize: pageSize,
                showSizeChanger: true,
                total: total,
                showTotal: (total, range) => {
                  return (
                    <div>
                      {range[0]}-{range[1]} trên {total} rows
                    </div>
                  );
                },
              }}
            />
          </Card>
        </Col>
      </Row>
      <BookViewDetail
        openViewDetail={openViewDetail}
        setOpenViewDetail={setOpenViewDetail}
        dataViewDetail={dataViewDetail}
        setDataViewDetail={setDataViewDetail}
      />
      <BookModalCreate
        openModalCreate={openModalCreate}
        setOpenModalCreate={setOpenModalCreate}
        fetchBook={fetchBook}
      />
      <BookModalUpdate
        openModalUpdate={openModalUpdate}
        setOpenModalUpdate={setOpenModalUpdate}
        dataUpdate={dataUpdate}
        setDataUpdate={setDataUpdate}
      />
    </>
  );
};

export default BookTable;
