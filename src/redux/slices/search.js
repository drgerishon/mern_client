import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    text: '',
};

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setText: (state, action) => {
            return {text: action.payload};
        },


    },
});

const {reducer, actions} = searchSlice;

export const {setText, setTouched} = actions
export default reducer;