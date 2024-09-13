// 统一中转工具模块函数
// import { request } form '@/utils'

import { request } from './request'
import {getBasicAuth, setBasicAuth, removeBasicAuth} from "@/utils/basicAuth";

export {
    request,
    getBasicAuth,
    setBasicAuth,
    removeBasicAuth
}