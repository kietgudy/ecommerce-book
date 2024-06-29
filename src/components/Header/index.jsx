import React, { useState } from "react";
import { Divider, Badge, Drawer, Button } from "antd";
import {
  DownOutlined,
  HomeOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import "./Header.scss";
import { useSelector } from "react-redux";

const Header = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);
  const user = useSelector((state) => state.account.user);

  const items = [
    {
      label: <label style={{ cursor: "pointer" }}>Quản lý tài khoản</label>,
      key: "account",
    },
    {
      label: <label style={{ cursor: "pointer" }}>Đăng xuất</label>,
      key: "logout",
    },
  ];
  return (
    <>
      <div className="header-container">
        <header className="page-header">
          <div className="page-header__top">
            <div
              className="page-header__toggle"
              onClick={() => {
                setOpenDrawer(true);
              }}
            >
              ☰
            </div>
            <div className="page-header__logo">
              <img src="./logo.jpg" alt="logo shop" style={{ height: "95px" }} />
            </div>
            <div className="page-header__search">
              <SearchOutlined
                style={{ fontSize: "18px" }}
                className="icon-search"
              />
              <input
                className="input-search"
                type={"text"}
                placeholder="Bạn tìm gì hôm nay"
              />
              <Button className="custom-button" type="link">
                Tìm kiếm
              </Button>
            </div>
          </div>
          <nav className="page-header__bottom">
            <div id="navigation" className="navigation">
              <div className="navigation-home">
                <HomeOutlined />
                Trang chủ
              </div>
              <div className="navigation__item mobile">
                <Divider type="vertical" />
              </div>
              <div className="navigation__item mobile">
                {!isAuthenticated ? (
                  <span>Tài Khoản</span>
                ) : (
                  <Dropdown menu={{ items }} trigger={["click"]}>
                    <a onClick={(e) => e.preventDefault()}>
                      <Space>
                        {user?.fullName}
                        <DownOutlined />
                      </Space>
                    </a>
                  </Dropdown>
                )}
                <div className="navigation__item">
                  <Badge count={5} size={"small"}>
                    <ShoppingCartOutlined style={{fontSize: "25px"}} />
                  </Badge>
                </div>
              </div>
            </div>
          </nav>
        </header>
      </div>
      <Drawer
        title="Menu chức năng"
        placement="left"
        onClose={() => setOpenDrawer(false)}
        open={openDrawer}
      >
        <p>Quản lý tài khoản</p>
        <Divider />

        <p>Đăng xuất</p>
        <Divider />
      </Drawer>
    </>
  );
};

export default Header;