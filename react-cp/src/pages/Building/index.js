import React, { useEffect, useState } from 'react';
import {Breadcrumb, Col, Image, Layout, Row, Table, Tag} from "antd";
import { fetchBuildingsList } from "@/store/modules/building";
import { BuildingInfo } from "@/component/BuildingInfo";
import { useDispatch, useSelector } from "react-redux";
import Search from "antd/es/input/Search";
import { useNavigate } from "react-router-dom";
import image from "@/assets/building_img.jpg"
import "./index.scss";

const Building = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const buildingsList = useSelector(state => state.building.buildingsList);
    const [filteredBuildings, setFilteredBuildings] = useState(buildingsList); // 用于存储过滤后的建筑数据
    useEffect(() => {
        setFilteredBuildings(buildingsList);
    }, [buildingsList]);
    useEffect(() => {
        dispatch(fetchBuildingsList());
    }, [dispatch]);

    const handleAddressSearch = (e) => {
        const value = e.target.value;
        if (value === "") {
            setFilteredBuildings(buildingsList);
        } else {
            const filteredData = buildingsList.filter((building) =>
                building.building_info.building_name.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredBuildings(filteredData);
        }
    };
    const handleOwnerSearch = (e) => {
        const value = e.target.value;
        if (value === "") {
            setFilteredBuildings(buildingsList);
        } else {
            const filteredData = buildingsList.filter((building) =>
                building.building_info.owner_corporation.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredBuildings(filteredData);
        }
    };

    const columns = [
        {
            title: 'Building ID',
            dataIndex: 'building_id',
            key: 'building_id'
        },
        {
            title: 'Building Name',
            dataIndex: 'building_info',
            key: 'building_name',
            render: (building_info) => <p>{building_info.building_name}</p>
        },
        {
            title: "Suburb",
            dataIndex: "building_info",
            key: "suburb",
            render: (building_info) => <p>{building_info.suburb}</p>
        },
        {
            title: "Building Image",
            dataIndex: "img",
            key: "img",
            render: (img) => <Image height={150} src={image}/>
        },
        {
            title: 'Building Info',
            dataIndex: 'building_info',
            key: 'info',
            render: (building) => <BuildingInfo building={building} />
        },
        {
            title: 'Contract',
            dataIndex: 'status',
            key: 'status',
            filters: [
                {
                    text: 'VALID',
                    value: 'Valid',
                },
                {
                    text: 'EXPIRED',
                    value: 'Expired',
                },
            ],
            onFilter: (value, record) => record.status === value,
            render: (status) => (
                <Tag color={status === "Valid" ? 'green' : 'red'}>{status.toUpperCase()}</Tag>
            ),
        },
        {
            title: 'Tasks',
            dataIndex: 'building_id',
            key: 'tasks',
            render: (building_id, record) => <a onClick={() => navigate(`/building/BuildingTask?id=${building_id}&name=${record.building_info.building_name}`)}>View</a>
        }
    ];

    const breadItems = [
        {
            title: <a href="/">Dashboard</a>
        },
        {
            title: "Buildings Table"
        }
    ]

    return (
        <div style={{ padding: '64px 24px 0 24px'}}>
            <Breadcrumb items={ breadItems } style={{ margin: '16px 0' }} />

            <Layout className="contentContainer" >
                <Row gutter={[16, 16]}>
                    <Col span={12}>
                        <Search
                            placeholder="Search building name"
                            onChange={handleAddressSearch}
                            addonBefore="Building name:"
                            allowClear
                        />
                    </Col>
                    <Col span={12}>
                        <Search
                            placeholder="Search owner corporation"
                            onChange={handleOwnerSearch}
                            addonBefore="Owner corporation:"
                            allowClear
                        />
                    </Col>
                </Row>

                <div style={{ marginTop: '24px' }}>
                    {filteredBuildings ? <Table columns={columns} dataSource={filteredBuildings} /> : <p>No data</p>}
                </div>
            </Layout>
        </div>
    );
};

export default Building;