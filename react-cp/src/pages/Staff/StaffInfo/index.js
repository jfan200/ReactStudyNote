import React from "react";
import {Breadcrumb} from "antd";
import {useSearchParams} from "react-router-dom";


const StaffInfo = () => {
    const [params] = useSearchParams()
    const staff_id = params.get('id')
    const staff_name = params.get('name')

    const breadItems = [
        {
            title: <a href="/">Dashboard</a>
        },
        {
            title: <a href="/staff">Staffs Table</a>
        },
        {
            title: staff_name
        }
    ]



    return (
        <div style={{ padding: '64px 24px 0 24px'}}>
            <Breadcrumb items={ breadItems } style={{ margin: '16px 0' }} />
        </div>
    )
}

export default StaffInfo