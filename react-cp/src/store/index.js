// 组合 redux 子模块 + 导出 store 实例

import {configureStore} from "@reduxjs/toolkit";
import userReducer from "@/store/modules/user";
import buildingReducer from "@/store/modules/building";

export default configureStore({
    reducer: {
        "user": userReducer,
        "building": buildingReducer
    }
})