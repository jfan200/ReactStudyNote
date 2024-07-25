import Login from '../page/Login'
import Article from '../page/Article'

import {createBrowserRouter, createHashRouter} from "react-router-dom";
import Layout from "../page/Layout";
import Board from "../page/Board";
import About from "../page/About";
import NotFound from "../page/NotFound";

// 1. 创建 router实例对象并且配置路由对应关系
const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Board />,
            },
            {
                path: 'about',
                element: <About />,
            }
        ]
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/article',
        element: <Article />,
    },
    {
        path: '*',
        element: <NotFound />,
    }
])

export default router