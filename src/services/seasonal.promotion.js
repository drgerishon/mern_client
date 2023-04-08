import axios from "axios";

const API_URL = process.env.REACT_APP_API_DEVELOPMENT;

export const getSeasonalPromotions = async () => {
    return await axios.get(`${API_URL}/featured/products`);
};
