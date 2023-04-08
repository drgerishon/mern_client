import axios from "axios";

const API_URL = process.env.REACT_APP_API_DEVELOPMENT;

export const getCategories = async () => await axios.get(`${API_URL}/categories`);

export const getCategory = async (slug) => {
    return await axios.get(`${API_URL}/category/${slug}`);
};

export const removeCategory = async (slug, token) => await axios.delete(`${API_URL}/category/${slug}`, {
    headers: {
        'Authorization': `Bearer ${token}`,
    }
});


export const updateCategory = async (slug, category, token) => await axios.put(`${API_URL}/category/${slug}`, category, {
    headers: {
        'Authorization': `Bearer ${token}`,
    }
});

export const createCategory = async (category, token) => await axios.post(`${API_URL}/category/`, category, {
    headers: {
        'Authorization': `Bearer ${token}`,
    }
});

export const getCategorySubs = async (_id) => {
    return await axios.get(`${API_URL}/category/subs/${_id}`);
};


