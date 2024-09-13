import isBetween from "dayjs/plugin/isBetween";
import dayjs from "dayjs";
import {Badge, Tag} from "antd";

export const BuildingStatus = ( { building } ) => {
    dayjs.extend(isBetween)
    const isValid = dayjs().isBetween(dayjs(building.contract_start_date), dayjs(building.contract_end_date), null, '[]');
    const statusText = isValid ? 'Valid' : 'Expired';
    let color= isValid ? 'green' : 'red';


    return (
        <div>
            {/*使用点➕文字*/}
            {/*<Badge status={isValid ? "success" : "error"} text={statusText} />*/}
            {/*使用tag框*/}
            <Tag color={color} >
                {statusText.toUpperCase()}
            </Tag>
        </div>

    )
}
