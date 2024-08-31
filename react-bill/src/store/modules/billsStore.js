// 账单列表相关 store
import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import _ from "lodash";

const billsStore = createSlice({
    name: 'bills',
    // 数据状态 state
    initialState: {
        billsList: []
    },
    reducers: {
        // 同步修改方法
        setBillsList: (state, action) => {state.billsList = action.payload},
        // 同步添加新帐单
        addNewBill: (state, action) => {state.billsList.push(action.payload)},
    }
});

// 解构 actionCreater 函数
const {setBillsList, addNewBill} = billsStore.actions

// 异步请求
const getBillsList = () => {
    return async (dispatch) => {
        // 编写异步请求
        const res = await axios.get('http://localhost:8888/ka')
        // 排列后的数据
        const sortedBills = _.sortBy(res.data, 'date')
        // 出发同步 reducer
        dispatch(setBillsList(sortedBills))
        // console.log(res.data)
    }
}
const addBillList = (data) => {
    return async (dispatch) => {
        const res = await axios.post('http://localhost:8888/ka', data)
        dispatch(addNewBill(res.data))
    }
}

export {getBillsList, addBillList}


// 导出 reducer
const billsReducer = billsStore.reducer

export {billsReducer}