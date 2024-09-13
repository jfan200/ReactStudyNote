import React, {useEffect, useState} from 'react';
import { Avatar, Badge, Breadcrumb, Layout, Menu, Popconfirm } from 'antd';
import {
    DashboardOutlined,
    UserOutlined,
    BuildOutlined,
    LogoutOutlined,
    BellOutlined,
} from '@ant-design/icons';
import logo from '@/assets/Logo.svg';
import './index.scss';
import {removeBasicAuth, removeUserInfo} from "@/utils";
import {Outlet, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {fetchBuildingsList} from "@/store/modules/building";


const { Header, Sider, Content } = Layout;
const menuItems = [
    {
        label: 'Dashboard',
        key: '1',
        icon: <DashboardOutlined />,
    },
    {
        label: 'Staff',
        key: '2',
        icon: <UserOutlined />,
    },
    {
        label: 'Building',
        key: '3',
        icon: <BuildOutlined />,
    },
];




const CPLayout = () => {
    const userName = useSelector((state) => state.user.userName)
    const navigate = useNavigate();
    const handleLogout = () => {
        removeBasicAuth();
        removeUserInfo();
        navigate("/login")
    };
    const handleClick = (e) => {
        switch (e.key) {
            case '1': navigate("/"); break;
            case '2': navigate("/staff"); break;
            case '3': navigate("/building"); break;
            default: break;
        }
    }


    return (
        <Layout>
            <Header className="globalHeader" >
                <div className="leftSection">
                    <img src={logo} alt="logo" className="logo" />
                </div>
                <div className="rightSection">
                    <Badge count={11} overflowCount={10}>
                        <BellOutlined className="notificationIcon" />
                    </Badge>
                    <div className="userSection">
                        <Avatar icon={<UserOutlined />} />
                        <span className="username"> {userName} </span>
                        <Popconfirm
                            title="Do you confirm to logout?"
                            onConfirm={handleLogout}
                            okText="Logout"
                            cancelText="Cancel"
                        >
                            <span className="logout">
                                <LogoutOutlined/> Logout
                            </span>
                        </Popconfirm>
                    </div>
                </div>
            </Header>
            <Layout>
                <Sider className="sideBar">
                    <Menu mode="inline" theme="dark" defaultSelectedKeys={['1']} items={menuItems} onClick={handleClick} />
                </Sider>
                <div className="contentContainer">
                    <Outlet />
                </div>
            </Layout>
        </Layout>
    );
}

export default CPLayout;