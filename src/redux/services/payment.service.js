import axios from "axios";

const API_URL = process.env.REACT_APP_API_DEVELOPMENT;

export const createPaymentIntent = async (token, body) =>
    await axios.post(`${API_URL}/create-payment-intent/`, body, {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    });

