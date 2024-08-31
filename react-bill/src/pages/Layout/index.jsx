import {Outlet, useNavigate} from "react-router-dom";
import Menu from "@/pages/Menu";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getBillsList} from "@/store/modules/billsStore";
import React, { useState } from 'react'
import { Badge, TabBar } from 'antd-mobile'
import './index.scss'

import {
    BillOutline,
    AddCircleOutline,
    CalculatorOutline ,
} from 'antd-mobile-icons'


const tabs = [
    {
        key: '/',
        title: '月度收支',
        icon: <BillOutline />,
    },
    {
        key: '/new',
        title: '记账',
        icon: <AddCircleOutline />,
    },
    {
        key: '/year',
        title: '年度账单',
        icon: <CalculatorOutline  /> ,
    },
]


const  Layout = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getBillsList());
    }, [dispatch]);

    const navigate = useNavigate();
    const switchRoute = (path) => {
        // console.log(path)
        navigate(path)
    }



    return (
        <div className='layout'>
            <div className='container'>
                <Outlet/>
            </div>

            <TabBar className='footer' onChange={switchRoute}>
                {tabs.map(item => (
                    <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
                ))}
            </TabBar>
        </div>
    )
}

export default Layout