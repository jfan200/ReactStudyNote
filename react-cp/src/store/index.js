// 组合 redux 子模块 + 导出 store 实例

import {configureStore} from "@reduxjs/toolkit";
import userReducer from "@/store/modules/user";

export default configureStore({
    reducer: {
        "user": userReducer
    }
})