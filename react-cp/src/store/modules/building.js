import { createSlice } from "@reduxjs/toolkit";
import { request } from "@/utils";
import dayjs from "dayjs";

// 创建 Redux Slice
const buildingStore = createSlice({
    name: "building",
    initialState: {
        buildingsList: []
    },
    reducers: {
        setBuildingsList(state, action) {
            const isBetween = require("dayjs/plugin/isBetween");
            dayjs.extend(isBetween);
            state.buildingsList = action.payload.map(building => {
                const isValid = dayjs().isBetween(
                    building.building_info.contract_start_date,
                    building.building_info.contract_end_date,
                    "day"
                );
                return {
                    ...building,
                    status: isValid ? 'Valid' : 'Expired'
                };
            });
        }
    }
});

export const { setBuildingsList } = buildingStore.actions;

export const fetchBuildingsList = () => {
    return async (dispatch) => {
        try {
            const res = await request.get('/GetAllBuildings');
            dispatch(setBuildingsList(res));
        } catch (error) {
            console.error("Failed to fetch buildings:", error);
            return { success: false, message: "Failed to fetch building data. Please try again." };
        }
    };
};


// 导出 reducer
const buildingReducer = buildingStore.reducer;
export default buildingReducer;