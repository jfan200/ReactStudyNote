import {createSlice} from "@reduxjs/toolkit";

const counterStore = createSlice({
    name: "counterStore",
    // 初始状态数据
    initialState: {
        count: 0
    },
    // 修改数据的同步方法
    reducers: {
        increment (state) {state.count++},
        decrement (state) {state.count--},
        addTo (state, action) {state.count=action.payload},
        reset (state) {state.count=0}
    }
})

// 解析出构建 action对象 的函数 （actionCreater）
const {increment, decrement, addTo, reset} = counterStore.actions
// 获取 reducer函数
const counterReducer = counterStore.reducer
// 导出创建 action对象 的函数和 reducer函数
export {increment, decrement, addTo, reset}
export default counterReducer
