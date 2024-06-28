import React from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import './notfound.scss'

const NotFoundPage = () => {
    const navigate = useNavigate();
    return (
        <div className='main-notfound'>
            <Result
            status="404"
            title="404"
            style={{paddingTop: "30px"}}
            subTitle="Xin lỗi, trang bạn truy cập không tồn tại :("
            extra={<Button type="primary" onClick={() => navigate("/")}>Về trang chủ</Button>}
            />
        </div>
    )};
export default NotFoundPage;