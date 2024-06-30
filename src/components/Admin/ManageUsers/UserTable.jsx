import React, { useEffect, useState } from "react";
import { Table, Row, Col, Card, Button } from "antd";
import { callFetchListUser } from "../../../services/api";
import InputSearch from "./InputSearch.jsx";
import {
  CloudUploadOutlined,
  DeleteFilled,
  EyeFilled,
  PlusCircleOutlined,
  ReloadOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import UserViewDetail from "./UserViewDetail.jsx";

const UserTable = () => {
  const [listUser, setListUser] = useState([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState("");
  const [sortQuery, setSortQuery] = useState("");
  const [dataViewDetail, setDataViewDetail] = useState(null);
  const [openViewDetail, setOpenViewDetail] = useState(false);

  useEffect(() => {
    fetchUser();
  }, [current, pageSize, filter, sortQuery]);

  const fetchUser = async () => {
    setIsLoading(true);
    let query = `current=${current}&pageSize=${pageSize}`;
    if (filter) {
      query += filter;
    }
    if (sortQuery) {
      query += `&${sortQuery}`;
    }
    const res = await callFetchListUser(query);
    if (res && res.data) {
      setListUser(res.data.result);
      setTotal(res.data.meta.total);
    }
    setIsLoading(false);
  };

  const columns = [
    {
      title: "ID",
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
      title: "Tên người dùng",
      dataIndex: "fullName",
      sorter: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: true,
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      sorter: true,
    },
    {
      title: "Action",
      render: (text, record, index) => {
        return (
          <>
            <DeleteFilled
              style={{ fontSize: "17px", color: "red", cursor: "pointer" }}
            />
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
            title="QUẢN LÝ NGƯỜI DÙNG"
            extra={
              <div style={{ display: "flex", gap: 15 }}>
                <Button type="primary">
                  Export
                  <UploadOutlined />
                </Button>
                <Button type="primary">
                  Import
                  <CloudUploadOutlined />
                </Button>
                <Button type="primary">
                  Add new
                  <PlusCircleOutlined />
                </Button>
                <ReloadOutlined
                  onClick={() => {
                    setFilter("");
                    setSortQuery("");
                    setCurrent(1);
                    setPageSize(5);
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
              dataSource={listUser}
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
      <UserViewDetail
        openViewDetail={openViewDetail}
        setOpenViewDetail={setOpenViewDetail}
        dataViewDetail={dataViewDetail}
        setDataViewDetail={setDataViewDetail}
      />
    </>
  );
};

export default UserTable;
