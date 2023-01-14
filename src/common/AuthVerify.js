import {useCallback, useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {logout} from "../redux/slices/auth";


const parseJwt = (token) => {
    try {
        return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
        return null;
    }
};


const AuthVerify = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const dispatch = useDispatch();

    const logOut = useCallback(() => {
        dispatch(logout());
        navigate('/auth/login')
    }, [dispatch, navigate]);


    useEffect(() => {

        const user = JSON.parse(localStorage.getItem("user"));



        if (user && user.token) {
            const decodedJwt = parseJwt(user.token);
            if (decodedJwt.exp * 1000 < Date.now()) {
                logOut();
            }
        }

    }, [location, navigate, logOut]);


};

export default AuthVerify;