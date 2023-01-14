import axios from "axios";


const API_URL = process.env.REACT_APP_API_DEVELOPMENT;


const preSignup = (data) => {
    return axios.post(API_URL + "/pre-signup", data)
};

const forgotPassword = (email) => {
    return axios.put(API_URL + "/forgot-password", email)
};
const resetPassword = (resetInfo) => {
    return axios.put(API_URL + "/reset-password", resetInfo)
};


const signup = (data) => {
    return axios.post(API_URL + "/signup", data);
};


const login = (data) => {
    return axios
        .post(API_URL + "/signin", data)
        .then((response) => {
            if (response.data.user.token) {
                localStorage.setItem("user", JSON.stringify(response.data.user));
            }
            return response.data;
        });
};


const logout = () => {
    localStorage.removeItem("user");
};


export const currentAdmin = async (token, user) => {
    return await axios.post(`${API_URL}/current-admin`, user, {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    });
};


const authService = {
    preSignup,
    currentAdmin,
    forgotPassword,
    resetPassword,
    signup,
    login,
    logout,
};

export default authService;