import React from "react";
import { HomeOutlined } from "@ant-design/icons";
import {useNavigate} from "react-router-dom"; // 使用正确的图标导入

export const StaffBuildings = ({ building_ids }) => {
    const navigate = useNavigate()
    return (
        <>
            {building_ids.map(building_id => (
                <a key={building_id} onClick={() => navigate(`/building/${building_id}`)} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                    <HomeOutlined style={{ fontSize: '16px', marginRight: '8px' }} />
                    <p>{building_id}</p>
                </a>
            ))}
        </>
    );
};