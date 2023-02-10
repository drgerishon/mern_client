import axios from "axios";

const API_URL = process.env.REACT_APP_API_DEVELOPMENT;


export const createProduct = async (product, token) => {
    return await axios.post(`${API_URL}/product`, product, {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    });
};

export const getProductsByCount = async (count) => await axios.get(`${API_URL}/products/${count}`);


export const removeProduct = async (slug, token) => await axios.delete(`${API_URL}/product/${slug}`, {
    headers: {
        'Authorization': `Bearer ${token}`,
    }
});

export const getProduct = async (slug) => await axios.get(`${API_URL}/product/${slug}`);


export const updateProduct = async (slug, product, token) => {
    return await axios.put(`${API_URL}/product/${slug}`, product, {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    });
};


export const getProducts = async (sort, order, page) => {
    return await axios.post(`${API_URL}/products`, {sort, order, page});
};

export const getProductsCount = async () => {
    return await axios.get(`${API_URL}/products/total`);
};

export const productStar = async (productId, star, token) => {
    return await axios.put(`${API_URL}/product/star/${productId}`, {star}, {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    });
};

export const listRelated = async (productId) => {
    return await axios.get(`${API_URL}/product/related/${productId}`);
};


export const fetchProductsByFilter = async (arg) => {
    return await axios.post(`${API_URL}/search/filters`, arg);
};

export const minMax = async () => {
    return await axios.get(`${API_URL}/min-max`);
};
