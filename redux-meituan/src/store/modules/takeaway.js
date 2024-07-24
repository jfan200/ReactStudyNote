// 编写 store
import axios from "axios";
import {createSlice} from "@reduxjs/toolkit";

const foodsStore = createSlice({
    name: "food",
    initialState: {
        // 餐食列表
        foodsList: [],
        // 菜单激活下标值
        activeIndex: 0,
        // 购物车列表
        cartList: [],

    },
    reducers: {
        // 更改餐食列表
        setFoodsList (state, action) { state.foodsList = action.payload },
        // 更改activeIndex
        changeActiveIndex (state, action) { state.activeIndex = action.payload },
        // 添加商品到购物车
        addCart (state, action) {
            const item = state.cartList.find(item => item.id === action.payload.id)
            if (item) {
                item.count ++
            } else {
                state.cartList.push(action.payload)
            }
        },
        // 清空购物车
        clearCart(state, action) {state.cartList = []},
        // count 增
        incrementCount(state, action) {
            const item = state.cartList.find(item => item.id === action.payload.id)
            item.count ++
        },
        // count 减
        decrementCount(state, action) {
            const item = state.cartList.find(item => item.id === action.payload.id)
            item.count --
            if (item.count === 0) {
                state.cartList = state.cartList.filter(i => i.id !== item.id);
            }
        }
    }
})

// 异步请求
const {setFoodsList, changeActiveIndex, addCart, clearCart, incrementCount, decrementCount} = foodsStore.actions
const url = 'http://localhost:3004/takeaway'

const fetchFoodsList = () => {
    return async (dispatch) => {
        const res = await axios.get(url)
        dispatch(setFoodsList(res.data))
        //console.log(res.data)
    }
}

export {fetchFoodsList, changeActiveIndex, addCart, clearCart, incrementCount, decrementCount}

const foodsReducer = foodsStore.reducer

export default foodsReducer