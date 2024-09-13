import React, { useEffect, useState } from 'react';
import { Breadcrumb, Col, Layout, Row, Table, Tag } from "antd";
import { fetchBuildingsList } from "@/store/modules/building";
import { BuildingInfo } from "@/component/BuildingInfo";
import { useDispatch, useSelector } from "react-redux";
import Search from "antd/es/input/Search";
import { useNavigate } from "react-router-dom";
import {fetchUsersList} from "@/store/modules/user";
import {StaffRole} from "@/component/StaffRole";
import {StaffBuildings} from "@/component/StaffBuildings";


const Staff = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const usersList = useSelector(state => state.user.usersList);
    const [filteredUsers, setFilteredUSers] = useState(usersList); // 用于存储过滤后的建筑数据
    useEffect(() => {
        setFilteredUSers(usersList);
    }, [usersList]);
    useEffect(() => {
        dispatch(fetchUsersList());
    }, [dispatch]);

    const handleUserNameSearch = (e) => {
        const value = e.target.value;
        if (value === "") {
            setFilteredUSers(usersList);
        } else {
            const filteredData = usersList.filter((user) =>
                user.name.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredUSers(filteredData);
        }
    };
    const handlePhoneNumberSearch = (e) => {
        const value = e.target.value;
        if (value === "") {
            setFilteredUSers(usersList);
        } else {
            const filteredData = usersList.filter((user) =>
                user.phone.includes(value)
            );
            setFilteredUSers(filteredData);
        }
    };

    const columns = [
        {
            title: 'User Name',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Photo Number',
            dataIndex: 'phone',
            key: 'phone'
        },
        {
            title: 'Password',
            dataIndex: 'password',
            key: 'password'
        },
        {
            title: 'Assigned Buildings',
            dataIndex: 'building_ids',
            key: 'building_ids',
            render: (building_ids) => (
                <StaffBuildings building_ids={building_ids}/>
            ),
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            filters: [
                {
                    text: 'Admin',
                    value: 'admin',
                },
                {
                    text: 'Internal Manager',
                    value: 'internal',
                },
                {
                    text: 'Subcontractor',
                    value: 'subcontractor',
                },
                {
                    text: 'Cleaner',
                    value: 'cleaner',
                }
            ],
            onFilter: (role, record) => record.role === role,
            render: (role) => (
                <StaffRole role={role}/>
            ),
        },
        {
            title: 'Edit',
            dataIndex: 'user_id',
            key: 'user_id',
            render: (user_id, record) => <a onClick={() => navigate(`/staff/StaffInfo?id=${user_id}&name=${record.name}`)}>Edit</a>
        }
    ];

    const breadItems = [
        {
            title: <a href="/">Dashboard</a>
        },
        {
            title: "Staffs Table"
        }
    ]

    return (
        <div style={{ padding: '64px 24px 0 24px'}}>
            <Breadcrumb items={ breadItems } style={{ margin: '16px 0' }} />

            <Layout className="contentContainer" >
                <Row gutter={[16, 16]}>
                    <Col span={12}>
                        <Search
                            placeholder="Search user name"
                            onChange={handleUserNameSearch}
                            addonBefore="User name:"
                            allowClear
                        />
                    </Col>
                    <Col span={12}>
                        <Search
                            placeholder="Search phone number"
                            onChange={handlePhoneNumberSearch}
                            addonBefore="Phone number:"
                            allowClear
                        />
                    </Col>
                </Row>

                <div style={{ marginTop: '24px' }}>
                    {filteredUsers ? <Table columns={columns} dataSource={filteredUsers} /> : <p>No data</p>}
                </div>
            </Layout>
        </div>
    );
};

export default Staff;