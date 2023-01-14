import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {setMessage} from "./message";
import AuthService from "../services/auth.service";
import {toast} from "react-toastify";



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


export const login= createAsyncThunk(
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


const initialState = user ? {isLoggedIn: true, user} : {isLoggedIn: false, user: null};


const authSlice = createSlice({
    name: "auth",
    initialState,
    extraReducers: {
        [signup.fulfilled]: (state, action) => {
            state.isLoggedIn = false;
            state.user = null;
        },
        [signup.rejected]: (state, action) => {
            state.isLoggedIn = false;
            state.user = null;
        },
        [forgotPassword.fulfilled]: (state, action) => {
            state.isLoggedIn = false;
            state.user = null;
        },
        [forgotPassword.rejected]: (state, action) => {
            state.isLoggedIn = false;
            state.user = null;
        },
        [resetPassword.fulfilled]: (state, action) => {
            state.isLoggedIn = false;
            state.user = null;
        },
        [resetPassword.rejected]: (state, action) => {
            state.isLoggedIn = false;
            state.user = null;
        },

        [login.fulfilled]: (state, action) => {
            state.isLoggedIn = true;
            state.user = action.payload.user.user;
        },
        [login.rejected]: (state, action) => {
            state.isLoggedIn = false;
            state.user = null;
        },
        [logout.fulfilled]: (state, action) => {
            state.isLoggedIn = false;
            state.user = null;
        },
    },
});

const {reducer} = authSlice;
export default reducer;