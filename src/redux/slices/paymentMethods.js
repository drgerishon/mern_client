import {createSlice} from "@reduxjs/toolkit";

const initialState = false;

const codSlice = createSlice({
    name: "paypalPayment",
    initialState,
    reducers: {
        withPaypal: (state, action) => {
            return action.payload;
        },

    },
});


const {reducer, actions} = codSlice;

export const {withPaypal} = actions
export default reducer;