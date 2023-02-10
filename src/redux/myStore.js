// https://www.bezkoder.com/react-redux-login-example-toolkit-hooks/
// https://www.daydone.com.ng/product?prod=212
//https://www.mkulimayoung.com/account/items/create
//https://victormatara.com/list-of-agricultural-produce-marketing-companies-in-kenya/
//https://medium.com/swlh/creating-phone-number-verification-component-using-react-js-and-twilio-services-6a635657ecc9
//https://codepen.io/john-mantas/pen/bxmrBq
//https://bbbootstrap.com/snippets/bootstrap-4-ecommerce-products-list-range-filters-89673127
//https://snazzymaps.com/style/352070/colliers-map-light
//https://www.youtube.com/watch?v=DNM9FdFrI1k&list=PLUDnjDRKIOEEgtbIPhJN4uq1D2UBBryeh
//https://www.youtube.com/watch?v=-BVfB4YQY3k
import {combineReducers, configureStore,} from '@reduxjs/toolkit';
import messageReducer from './slices/message';
import authReducer from './slices/auth';
import cartReducer from './slices/cart';
import drawerReducer from './slices/drawer';
import searchReducer from './slices/search';
import couponReducer from './slices/coupon';
import paymentReducer from './slices/paymentMethods';

import totalAfterDiscountReducer from './slices/totalAfterDiscount';
import {persistStore, persistReducer} from "redux-persist";

import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: 'root',
    storage,
};

const rootReducer = combineReducers({
    message: messageReducer,
    auth: authReducer,
    cart: cartReducer,
    drawer: drawerReducer,
    search: searchReducer,
    paymentMethods: paymentReducer,
    coupon: couponReducer,
    totalAfterDiscount: totalAfterDiscountReducer,

});

const persistedReducer = persistReducer(persistConfig, rootReducer);


const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
    devTools: true,
});

export const persistor = persistStore(store);

export default store;
