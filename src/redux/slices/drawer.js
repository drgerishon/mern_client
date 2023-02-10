import {createSlice} from "@reduxjs/toolkit";
const initialState = false;

const drawerSlice = createSlice({
    name: "drawer",
    initialState,
    reducers: {
        setVisible: (state, action) => {
            return action.payload;
        },

    },
});


const {reducer, actions} = drawerSlice;

export const {setVisible} = actions
export default reducer;