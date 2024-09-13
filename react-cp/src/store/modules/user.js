// 和用户相关的状态管理
import { createSlice } from "@reduxjs/toolkit";
import {getUserID, getUserName, request} from "@/utils"
import { setBasicAuth as _setBasicAuth, getBasicAuth } from "@/utils";
import {setInfo as _setInfo} from "@/utils";

const userStore = createSlice({
    name: "user",
    // 数据状态
    initialState: {
        userId: getUserID() || 0,
        userName: getUserName() || '',
        basicAuth: getBasicAuth() || '',
        usersList: []
    },
    // 同步修改方法
    reducers: {
        setBasicAuth(state, action) {
            state.basicAuth = action.payload
            _setBasicAuth(action.payload)
        },
        setInfo(state, action) {
            state.userName = action.payload.name
            state.userId = action.payload.user_id
            _setInfo(action.payload.name, action.payload.user_id)
        },
        setUsersList(state, action) {
            state.usersList = action.payload
        }
    }
})

export const { setBasicAuth, setInfo, setUsersList } = userStore.actions


// 异步方法 完成登陆获取 token
export const fetchLogin = (loginForm) => {
    return async (dispatch) => {
        const { phone, password } = loginForm;
        const credentials = btoa(`${phone}:${password}`);
        const basicAuth = `Basic ${credentials}`;

        try {
            // 1. 发送异步请求
            const res = await request.get('/Login', {
                headers: { 'Authorization': basicAuth }
            });
            if (res.role !== "admin") {
                return { success: false, message: "Unauthorized access. Only admin can login."}
            }
            // 2. 提交同步 action 进行 basicAuth 的存入
            dispatch(setBasicAuth(basicAuth));
            // 3. 同步 building Info
            dispatch(setInfo(res));
            return { success: true, message: "Login successful" };
        } catch (error) {
            return { success: false, message: "Incorrect phone number or password. Please try again." };
        }
    }
}

export const fetchUsersList = () => {
    return async (dispatch) => {
        const res = await request.get('/GetAllUsers')
        dispatch(setUsersList(res));
    }
}

export const register = (userInfo) => {
    return async () => {
        console.log(userInfo)
        try {
            const res = await request.post("/UserRegister", userInfo);
            console.log(res)
            return { success: true, message: "User registered successfully" };
        } catch (error) {
            console.log(error)
            if (error.response && error.response.status === 400) {
                return { success: false, message: "User phone number already exists" };
            }
            return { success: false, message: "Registration failed. Please try again later." };
        }
    };
};

// 获取 reducer 函数
const userReducer = userStore.reducer
export default userReducer;