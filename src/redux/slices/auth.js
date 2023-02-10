import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {setMessage} from "./message";
import AuthService from "../services/auth.service";
import {toast} from "react-toastify";
import {saveUserAddress} from "../services/user.service";


const user = JSON.parse(localStorage.getItem("user"));


export const preSignup = createAsyncThunk(
    "auth/preSignup",
    async (data, thunkAPI) => {

        try {
            const response = await AuthService.preSignup(data);
            console.log(response.data.message)
            thunkAPI.dispatch(setMessage(response.data.message));
            return response.data;
        } catch (error) {
            console.log(error)
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.error) ||
                error.message ||
                error.toString();
            thunkAPI.dispatch(setMessage(message));
            return thunkAPI.rejectWithValue();
        }
    }
);


export const signup = createAsyncThunk(
    "auth/signup",
    async (data, thunkAPI) => {
        try {

            const response = await AuthService.signup(data);
            thunkAPI.dispatch(setMessage(response.data.message));
            return response.data;
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.error) ||
                error.message ||
                error.toString();
            thunkAPI.dispatch(setMessage(message));
            toast.error(message)
            return thunkAPI.rejectWithValue();
        }
    }
);


export const login = createAsyncThunk(
    "auth/login",
    async (userInfo, thunkAPI) => {
        try {
            const data = await AuthService.login(userInfo);
            return {user: data};
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

export const forgotPassword = createAsyncThunk(
    "auth/forgotPassword ",
    async (email, thunkAPI) => {

        try {
            const response = await AuthService.forgotPassword(email);
            thunkAPI.dispatch(setMessage(response.data.message));
            return response.data;
        } catch (error) {
            console.log(error)
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.error) ||
                error.message ||
                error.toString();
            thunkAPI.dispatch(setMessage(message));
            return thunkAPI.rejectWithValue();
        }
    }
);


export const resetPassword = createAsyncThunk(
    "auth/resetPassword",
    async (data, thunkAPI) => {
        try {

            const response = await AuthService.resetPassword(data);
            thunkAPI.dispatch(setMessage(response.data.message));
            return response.data;
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.error) ||
                error.message ||
                error.toString();
            thunkAPI.dispatch(setMessage(message));

            return thunkAPI.rejectWithValue();
        }
    }
);

export const logout = createAsyncThunk("auth/logout", async () => {
    await AuthService.logout();
});
// export const updateUserAddress = createAsyncThunk(
//     'auth/updateUserAddress',
//     async (info, {getState, dispatch}) => {
//         const state = getState();
//         const data = await saveUserAddress(info.address, info.token);
//
//         const existingAddress = state.auth.user.address.find(
//             (add) => add.googlePlaceId === data.address.googlePlaceId
//         );
//
//         if (existingAddress) {
//             const index = state.auth.user.address.indexOf(existingAddress);
//             const updatedAddress = [
//                 ...state.auth.user.address.slice(0, index),
//                 data.address,
//                 ...state.auth.user.address.slice(index + 1)
//             ];
//             dispatch({
//                 type: 'auth/updateAddress',
//                 payload: {
//                     address: updatedAddress,
//                     addressSaved: true
//                 }
//             });
//         } else {
//             dispatch({
//                 type: 'auth/updateAddress',
//                 payload: {
//                     address: [...state.auth.user.address, data.address],
//                     addressSaved: true
//                 }
//             });
//         }
//         return data;
//     }
// );
// export const updateUserAddress = createAsyncThunk(
//     'auth/updateUserAddress',
//     async (info, {getState, dispatch}) => {
//         const state = getState();
//         const data = await saveUserAddress(info.address, info.token);
//
//         const existingAddress = state.auth.user.address.find(
//             (add) => add.googlePlaceId === data.address.googlePlaceId
//         );
//
//         if (existingAddress) {
//             const index = state.auth.user.address.indexOf(existingAddress);
//             const updatedAddress = [
//                 ...state.auth.user.address.slice(0, index),
//                 data.address,
//                 ...state.auth.user.address.slice(index + 1)
//             ];
//
//             const updatedInfo = {
//                 address: updatedAddress,
//                 addressSaved: true
//             };
//
//             dispatch(updateAddress(updatedInfo));
//         } else {
//             const updatedAddress = [...state.auth.user.address, data.address];
//
//             const updatedInfo = {
//                 address: updatedAddress,
//                 addressSaved: true
//             };
//
//             dispatch(updateAddress(updatedInfo));
//         }
//
//         return {data};
//     }
// );

export const updateUserAddress = createAsyncThunk(
    "auth/updateUserAddress",
    async (info, thunkAPI) => {
        try {
            const data = await saveUserAddress(info.address, info.token);
            return {userInfo: data};
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.error) ||
                error.message ||
                error.toString();
            thunkAPI.dispatch(setMessage(message));
            return thunkAPI.rejectWithValue();
        }
    }
);


const initialState = user ? {isLoggedIn: true, addressSaved: user.address && user.address.length > 0, user} : {
    isLoggedIn: false,
    addressSaved: false,
    user: null
};


const authSlice = createSlice({
    name: "auth",
    initialState,
    extraReducers: {
        [signup.fulfilled]: (state, action) => {
            state.isLoggedIn = false;
            state.addressSaved = false
            state.user = null;
        },
        [signup.rejected]: (state, action) => {
            state.isLoggedIn = false;
            state.addressSaved = false
            state.user = null;
        },

        [updateUserAddress.fulfilled]: (state, action) => {
            const {address, ok} = action.payload.userInfo;
            const sortAddresses = (address) => {
                return address.sort((a, b) => {
                    let dateA = new Date(a.updatedAt);
                    let dateB = new Date(b.updatedAt);
                    return dateB - dateA;
                });
            };

            if (ok) {
                if (typeof window !== 'undefined') {
                    const existingData = JSON.parse(localStorage.getItem('user')) || {};
                    existingData.address = sortAddresses(address);
                    localStorage.setItem('user', JSON.stringify(existingData));
                    state.addressSaved = true;
                    state.user.address = [...sortAddresses(address)];
                }
            }


        },

        [forgotPassword.fulfilled]: (state, action) => {
            state.isLoggedIn = false;
            state.addressSaved = false
            state.user = null;
        },
        [forgotPassword.rejected]: (state, action) => {
            state.isLoggedIn = false;
            state.addressSaved = false
            state.user = null;
        },
        [resetPassword.fulfilled]: (state, action) => {
            state.isLoggedIn = false;
            state.addressSaved = false
            state.user = null;
        },
        [resetPassword.rejected]: (state, action) => {
            state.isLoggedIn = false;
            state.addressSaved = false
            state.user = null;
        },

        [login.fulfilled]: (state, action) => {
            state.isLoggedIn = true;
            state.addressSaved = action.payload.user.user.address.length > 0
            state.user = action.payload.user.user;
        },
        [login.rejected]: (state, action) => {
            state.isLoggedIn = false;
            state.addressSaved = false
            state.user = null;
        },
        [logout.fulfilled]: (state, action) => {
            state.isLoggedIn = false;
            state.addressSaved = false
            state.user = null;
        },
    },
});


const {reducer} = authSlice;


export default reducer;