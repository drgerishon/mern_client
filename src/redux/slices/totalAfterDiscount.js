// import {createSlice} from "@reduxjs/toolkit";
//
//
// let initialState = 0;
//
//
// const totalAfterDiscountSlice = createSlice({
//     name: "totalAfterDiscount",
//     initialState,
//     reducers: {
//         setTotalAfterDiscount: (state, action) => {
//             return action.payload;
//         },
//
//     },
// });
//
//
// const {reducer, actions} = totalAfterDiscountSlice;
//
// export const {setTotalAfterDiscount} = actions
// export default reducer;

import {createSlice} from "@reduxjs/toolkit";

let initialState = {value: 0};

const totalAfterDiscountSlice = createSlice({
    name: "totalAfterDiscount",
    initialState,
    reducers: {
        setTotalAfterDiscount: (state, action) => {
            state.value = action.payload;
        },

    },
});

const {reducer, actions} = totalAfterDiscountSlice;

export const {setTotalAfterDiscount} = actions
export default reducer;