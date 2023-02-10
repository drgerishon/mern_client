import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {setMessage} from "./message";
import {updateUser} from "./auth";
import {saveUserAddress} from "../services/user.service";

import AuthService from "../services/auth.service";

//
// const user = JSON.parse(localStorage.getItem('user')) || {};
// const address = user.address

// const initialState = address && address.length > 0 ? {addressSaved: true} : {addressSaved: false};


export const saveAddress = createAsyncThunk(
    "address/saveAddress",
    async (info, thunkAPI) => {
        try {
            const data = await saveUserAddress(info.address, info.token);
            thunkAPI.dispatch(updateUser(data))
            return {data: data};

        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.error) ||
                error.message ||
                error.toString();
            thunkAPI.dispatch(setMessage(message));
            return thunkAPI.rejectWithValue();
        }
    }
);

// const addressSlice = createSlice({
//     name: "address",
//     initialState,
//     extraReducers: {
//         [saveAddress.fulfilled]: (state, action) => {
//             state.addressSaved = true;
//         },
//         [saveAddress.rejected]: (state) => {
//             state.addressSaved = false;
//         },
//
//     },
// });

// const {reducer} = addressSlice;
// export default reducer;