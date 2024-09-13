import React from "react";
import {Breadcrumb} from "antd";
import {useSearchParams} from "react-router-dom";


const BuildingTask = () => {
    const [params] = useSearchParams()
    const building_id = params.get('id')
    const building_name = params.get('name')

    const breadItems = [
        {
            title: <a href="/">Dashboard</a>
        },
        {
            title: <a href="/building">Buildings Table</a>
        },
        {
            title: building_name
        }
    ]



    return (
       <div style={{ padding: '64px 24px 0 24px'}}>
           <Breadcrumb items={ breadItems } style={{ margin: '16px 0' }} />
       </div>
   )
}

export default BuildingTask