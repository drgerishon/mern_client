import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {setMessage} from "./message";
import AuthService from "../../services/auth.service";
import {saveUserAddress} from "../../services/user.service";
import {getAddress} from "../../functions";
import {showToast} from "../../ui/Toast/toastNotifications";


const user = JSON.parse(localStorage.getItem("user"));

const handleError = (error, thunkAPI) => {
  const message =
    (error.response &&
      error.response.data &&
      error.response.data.message) ||
    error.message ||
    "Something went wrong. Please try again later.";

  thunkAPI.dispatch(setMessage(message));
  showToast(message, "error", 4000, "350px");
  return thunkAPI.rejectWithValue();
};



export const preSignup = createAsyncThunk("auth/preSignup", async (data, thunkAPI) => {

    try {
        const response = await AuthService.preSignup(data);

        console.log('RESPONSE',response)
        thunkAPI.dispatch(setMessage({content: response.data.message, type: 'success'}));
        return response.data;
    } catch (error) {
        return handleError(error, thunkAPI);
    }
});


export const signup = createAsyncThunk("auth/signup", async (data, thunkAPI) => {
    try {
        const response = await AuthService.signup(data);
        thunkAPI.dispatch(setMessage(response.data.message));
        return response.data;
    } catch (error) {
        return handleError(error, thunkAPI);
    }
});


export const login = createAsyncThunk("auth/login", async (userInfo, thunkAPI) => {
    try {
        const data = await AuthService.login(userInfo);
        const {user} = data;
        if (user.role && user.role.permissions) {
            user.permissions = user.role.permissions;
            delete user.role.permissions;
        }

        return {user};
    } catch (error) {
        return handleError(error, thunkAPI);
    }
});

export const forgotPassword = createAsyncThunk("auth/forgotPassword", async (email, thunkAPI) => {
    try {
        const response = await AuthService.forgotPassword(email);
        thunkAPI.dispatch(setMessage(response.data.message));
        return response.data;
    } catch (error) {
        return handleError(error, thunkAPI);
    }
});


export const resetPassword = createAsyncThunk("auth/resetPassword", async (data, thunkAPI) => {
    try {
        const response = await AuthService.resetPassword(data);
        thunkAPI.dispatch(setMessage(response.data.message));
        return response.data;
    } catch (error) {
        return handleError(error, thunkAPI);
    }
});


export const logout = createAsyncThunk("auth/logout", async () => {
    await AuthService.logout();
});

export const verifyToken = createAsyncThunk("auth/verifyToken", async () => {
    const response = await AuthService.verifyToken();
    return response.data;
});

export const updateUserAddress = createAsyncThunk("auth/updateUserAddress", async (info, thunkAPI) => {
    try {
        if (!info.address.zipCode) {
            const {postcode} = await getAddress(info.address.lat, info.address.lng);
            if (postcode) {
                info.address.zipCode = postcode;
            }
        }
        const data = await saveUserAddress(info, info.token);
        return {userInfo: data};
    } catch (error) {
        return handleError(error, thunkAPI);
    }
});


const initialState = user
    ? {
        isLoggedIn: true,
        addressSaved: user.address && user.address.length > 0,
        user,
    }
    : {
        isLoggedIn: false,
        addressSaved: false,
        user: null,
    };

const sortAddressesByUpdatedAt = (addresses) =>
    addresses.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(signup.fulfilled, (state, action) => {
                state.isLoggedIn = false;
                state.addressSaved = false;
                state.user = null;
            })
            .addCase(signup.rejected, (state, action) => {
                state.isLoggedIn = false;
                state.addressSaved = false;
                state.user = null;
            })
            .addCase(updateUserAddress.fulfilled, (state, action) => {
                const {address, ok} = action.payload.userInfo;

                if (ok) {
                    const sortedAddresses = sortAddressesByUpdatedAt(address);
                    if (typeof window !== "undefined") {
                        const existingData = JSON.parse(localStorage.getItem("user") || "{}");
                        existingData.address = sortedAddresses;
                        localStorage.setItem("user", JSON.stringify(existingData));
                        state.addressSaved = true;
                        state.user.address = [...sortedAddresses];
                    }
                }
            })
            .addCase(forgotPassword.fulfilled, (state, action) => {
                state.isLoggedIn = false;
                state.addressSaved = false;
                state.user = null;
            })
            .addCase(forgotPassword.rejected, (state, action) => {
                state.isLoggedIn = false;
                state.addressSaved = false;
                state.user = null;
            })
            .addCase(resetPassword.fulfilled, (state, action) => {
                state.isLoggedIn = false;
                state.addressSaved = false;
                state.user = null;
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.isLoggedIn = false;
                state.addressSaved = false;
                state.user = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoggedIn = true;
                state.addressSaved = action.payload.user.address && action.payload.user.address.length > 0;
                state.user = action.payload.user;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoggedIn = false;
                state.addressSaved = false;
                state.user = null;
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.isLoggedIn = false;
                state.addressSaved = false;
                state.user = null;
            })
            .addCase(verifyToken.rejected, (state, action) => {
                state.isLoggedIn = false;
                state.addressSaved = false;
                state.user = null;
                localStorage.removeItem("user");
            });
    },
});

const {reducer} = authSlice;

export default reducer;