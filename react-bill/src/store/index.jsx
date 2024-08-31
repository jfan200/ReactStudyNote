// 组合子模块 导出store实例

import {configureStore} from "@reduxjs/toolkit";
import {billsReducer} from "@/store/modules/billsStore";

const store = configureStore({
    reducer: {
        bills: billsReducer
    }
});

export default store