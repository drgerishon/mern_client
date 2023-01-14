// https://www.bezkoder.com/react-redux-login-example-toolkit-hooks/
import {configureStore} from '@reduxjs/toolkit'
import messageReducer from "./slices/message";
import authReducer from "./slices/auth";


const reducer = {
    message: messageReducer,
    auth: authReducer,


}

const store = configureStore({
    reducer,
    devTools: true,
})

export default store;