import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_DEVELOPMENT;

const getPublicContent = () => {
    return axios.get(API_URL + "all");
};

const getUserBoard = () => {
    return axios.get(API_URL + "subscriber", {headers: authHeader()});
};


const getCarrierBoard = () => {
    return axios.get(API_URL + "carrier", {headers: authHeader()});
};

const getFarmerBoard = () => {
    return axios.get(API_URL + "farmer", {headers: authHeader()});
};

const getAdminBoard = () => {
    return axios.get(API_URL + "admin", {headers: authHeader()});
};

const userService = {
  getPublicContent,
  getUserBoard,
  getCarrierBoard,
  getAdminBoard,
};

export default userService