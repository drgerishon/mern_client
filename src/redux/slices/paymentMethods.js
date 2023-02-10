import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    selectedPaymentMethod: '',
    paymentMethods: ['Mpesa', 'Card', 'Paypal'],
}
const paymentMethodsSlice = createSlice({
    name: "paymentMethods",
    initialState,
    reducers: {
        selectPaymentMethod: (state, action) => {
            state.selectedPaymentMethod = action.payload;
        },
        togglePaymentMethod: (state, action) => {
            const index = state.paymentMethods.indexOf(action.payload);
            if (index === -1) {
                state.paymentMethods.push(action.payload);
            } else {
                state.paymentMethods.splice(index, 1);
            }
        }
    }
});


const {reducer, actions} = paymentMethodsSlice;

export const {selectPaymentMethod, togglePaymentMethod} = actions
export default reducer;



