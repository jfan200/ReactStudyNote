// 和用户相关的状态管理
import {createSlice} from "@reduxjs/toolkit";
import { request } from "@/utils"
import {setBasicAuth as _setBasicAuth, getBasicAuth} from "@/utils";

const userStore = createSlice({
    name: "user",
    // 数据状态
    initialState: {
        userName: '',
        userId: 0,
        role: '',
        buildingIds: [],
        buildingTasks: [],
        basicAuth: getBasicAuth() || ''
    },
    // 同步修改方法
    reducers: {
        setBasicAuth(state, action) {
            state.basicAuth = action.payload
            _setBasicAuth(action.payload)
        },
        setInfo(state, action) {
            state.userName = action.payload.name
            state.userId = action.payload.userId
            state.role = action.payload.role
            state.buildingIds = action.payload.buildingIds
            state.buildingTasks = action.payload.buildingTasks
        }
    }
})

// 结构 actionCreater
const { setBasicAuth, setInfo } = userStore.actions

// 获取 reducer 函数
const userReducer = userStore.reducer

// 异步方法 完成登陆获取 token
const fetchLogin = (loginForm) => {
    return async (dispatch) => {
        const { phone, password } = loginForm;
        const credentials = btoa(`${phone}:${password}`);
        const basicAuth = `Basic ${credentials}`;

        try {
            // 1. 发送异步请求
            const res = await request.get('/Login', {
                headers: { 'Authorization': basicAuth }
            });
            // 2. 提交同步 action 进行 basicAuth 的存入
            dispatch(setBasicAuth(basicAuth));
            // 3. 同步 building Info
            dispatch(setInfo(res));

            console.log(res)
            return { success: true, message: "Login successful" };
        } catch (error) {
            return { success: false, message: "Incorrect phone number or password. Please try again." };
        }
    }
}

export { fetchLogin, setBasicAuth, setInfo }
export default userReducer;