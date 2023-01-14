import axios from "axios";

const API_URL = process.env.REACT_APP_API_DEVELOPMENT;
export const getSubs = async () => await axios.get(`${API_URL}/subs`);

export const getSub = async (slug) => await axios.get(`${API_URL}/sub/${slug}`);

export const removeSub = async (slug, token) => await axios.delete(`${API_URL}/sub/${slug}`, {
    headers: {
        'Authorization': `Bearer ${token}`,
    }
});


export const updateSub = async (slug, sub, token) => await axios.put(`${API_URL}/sub/${slug}`, sub, {
    headers: {
        'Authorization': `Bearer ${token}`,
    }
});

export const createSub = async (sub, token) => await axios.post(`${API_URL}/sub/`, sub, {
    headers: {
        'Authorization': `Bearer ${token}`,
    }
});
