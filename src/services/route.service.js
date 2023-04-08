import axios from "axios";

const API_URL = process.env.REACT_APP_API_DEVELOPMENT;

export const getRoutes = async (token) => {
    return await axios.get(`${API_URL}/routes`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    });
};

export const createRoute = async (token, routeData) => {
    return await axios.post(`${API_URL}/routes`, routeData, {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    });
};

export const updateRoute = async (token, routeId, routeData) => {
    return await axios.put(`${API_URL}/routes/${routeId}`, routeData, {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    });
};

export const deleteRoute = async (token, routeId) => {
    return await axios.delete(`${API_URL}/routes/${routeId}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    });
};
