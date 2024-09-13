import {Breadcrumb, Layout} from "antd";
import {Outlet} from "react-router-dom";
import React from "react";
import {Content} from "antd/es/layout/layout";
import "./index.scss"

const Dashboard = () => {
    const breadItems = [
        {
            title: "Dashboard",
        }
    ]

    return (
        <div style={{ padding: '64px 24px 0 24px'}}>
            <Breadcrumb items={breadItems} style={{ margin: '16px 0' }} />
            <Content className="content">
                Dashboard
            </Content>
        </div>
    )
}

export default Dashboard;