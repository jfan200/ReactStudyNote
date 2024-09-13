// 统一中转工具模块函数

import { request } from './request'
import {getBasicAuth, setBasicAuth, removeBasicAuth} from "@/utils/basicAuth";
import {setInfo, getUserName, getUserID, removeUserInfo} from "@/utils/userInfo";

export {
    request,
    getBasicAuth,
    setBasicAuth,
    removeBasicAuth,
    setInfo,
    getUserName,
    getUserID,
    removeUserInfo
}