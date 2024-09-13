import React from "react";
import { Tag } from "antd";

export const StaffRole = ({ role }) => {
    let color = "";
    let roleText = "";

    switch (role) {
        case "admin":
            color = "cyan";
            roleText = "Admin";
            break;
        case "internal":
            color = "purple";
            roleText = "Internal Manager";
            break;
        case "subcontractor":
            color = "orange";
            roleText = "Subcontractor";
            break;
        case "cleaner":
            color = "blue";
            roleText = "Cleaner";
            break;
        default:
            color = "default";
            roleText = "Unknown StaffRole";
    }

    return (
        <div>
            <Tag color={color}>
                {roleText}
            </Tag>
        </div>
    );
};