import axios from "axios";

const API_URL = process.env.REACT_APP_API_DEVELOPMENT;

export const userCart = async (cart, token) => {
    return await axios.post(`${API_URL}/user/cart`, {cart}, {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    });
};


export const getUserCart = async (token) => {
    return await axios.get(`${API_URL}/user/cart`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    });
};
export const emptyUserCart = async (token) => {
    return await axios.delete(`${API_URL}/user/cart`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    });
};


export const saveUserAddress = (data, token) => {
    return axios
        .post(`${API_URL}/user/address`, data, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })

        .then((response) => {
            return response.data;
        });
};


// export const saveUserAddress = async (token, address) => {
//     return await axios.post(`${API_URL}/user/address`, {address}, {
//         headers: {
//             'Authorization': `Bearer ${token}`,
//         }
//     });
// };


export const applyCoupon = async (token, body) => {
    return await axios.post(`${API_URL}/user/cart/coupon`, body, {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    });
};
export const createStripeOrderForUser = async (token, data) => {
    return await axios.post(`${API_URL}/user/stripe-order`, data, {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    });
};
export const createOrderPaypalOrderForUser = async (token, data) => {
    return await axios.post(`${API_URL}/user/paypal-order`, data, {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    });
};


export const getUserOrders = async (token) => {
    return await axios.get(`${API_URL}/user/orders`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    });
};

export const getWishList = async (token) => {
    return await axios.get(`${API_URL}/user/wishlist`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    });
};


export const addToWishlist = async (token, productId) => {
    return await axios.post(`${API_URL}/user/wishlist`, {productId}, {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    });
}

export const removeWishList = async (productId, token) => {
    return await axios.put(`${API_URL}/user/wishlist/${productId}`, {}, {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    });
};


export const createCODOrderForUser = async (token, cashOnDelivery, coupon) => {
    return await axios.post(`${API_URL}/user/cash-order`, {cashOnDelivery, couponApplied: coupon}, {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    });
};

export const initiateMPESAOderForUser = async (token, phoneNumber, coupon) => {
    return await axios.post(`${API_URL}/user/initiate-mpesa-order`, {phoneNumber, couponApplied: coupon}, {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    });
};

export const initPaypalOrder = async (token, cashOnDelivery, coupon) => {
    return await axios.post(`${API_URL}/user/init-paypal-order`, {cashOnDelivery, couponApplied: coupon}, {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    });
};

export const capturePaypalPaymentAndSavePaypalOrder = async (token,paymentId) => {
    return await axios.post(`${API_URL}/user/capture-paypal-payment-and-save-order`, paymentId, {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    });
};



