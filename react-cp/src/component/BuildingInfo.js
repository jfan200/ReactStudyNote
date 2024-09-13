import {Descriptions} from "antd";
import React from "react";
import dayjs from "dayjs";


export const BuildingInfo = ( { building } ) => {
    return (
        <Descriptions  bordered column={1}>
            <Descriptions.Item label="Owner corporation">{building.owner_corporation}</Descriptions.Item>
            <Descriptions.Item label="Contract Start Date">{dayjs(building.contract_start_date).format("DD-MMM-YYYY")}</Descriptions.Item>
            <Descriptions.Item label="Contract End Date">{dayjs(building.contract_end_date).format("DD-MMM-YYYY")}</Descriptions.Item>
        </Descriptions>
    )
}
