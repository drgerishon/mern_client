import {createSlice} from "@reduxjs/toolkit";


let initialState = false;



const couponSlice = createSlice({
    name: "coupon",
    initialState,
    reducers: {
        couponApplied: (state, action) => {
            return action.payload;
        },

    },
});


const {reducer, actions} = couponSlice;

export const {couponApplied} = actions
export default reducer;