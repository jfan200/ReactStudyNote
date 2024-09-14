// 封装高阶组件
// 核心逻辑：有 basicAuth 正常跳转 无basicAuth 去登陆

import {getBasicAuth} from "@/utils";
import {Navigate} from "react-router-dom";

export function AuthRoute({ children }) {
    const basicAuth = getBasicAuth()
    if (basicAuth) {
        return <>{children}</>
    } else {
        return <Navigate to={'/login'} replace/>
    }
}