// 路由配置
import {createBrowserRouter} from "react-router-dom";
import { AuthRoute } from "@/component/AuthRoute";
import Dashboard from "@/pages/Dashboard";
import Building from "src/pages/Building";
import CPLayout from "src/pages/Layout";
import Staff from "@/pages/Staff";
import Login from "@/pages/Login";
import NoFound from "antd/es/result/noFound";
import index from "@/pages/Building/BuildingTask";
import BuildingTask from "@/pages/Building/BuildingTask";
import StaffInfo from "@/pages/Staff/StaffInfo";
import StaffNew from "@/pages/Staff/StaffNew";



// 配置路由实例
const router = createBrowserRouter(
    [
        {
            path: "/",
            element:<AuthRoute> <CPLayout /> </AuthRoute>,
            children: [
                {
                    index: true,
                    element: <Dashboard />
                },
                {
                    path: "staff",
                    element: <Staff />
                },
                {
                    path: "staff/StaffInfo",
                    element: <StaffInfo />
                },
                {
                    path: "staff/new",
                    element: <StaffNew />
                },
                {
                    path: "building",
                    element: <Building />,
                },
                {
                    path: "building/BuildingTask",
                    element: <BuildingTask />
                }
            ]
        },
        {
            path: "/login",
            element: <Login />
        },
        {
            path: '*',
            element: <NoFound />
        }
    ]
)

export default router;