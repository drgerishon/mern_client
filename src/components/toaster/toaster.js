import React, {useEffect} from 'react';
import {toast} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";

const Toaster = ({link}) => {

    const linkStyle = {
        border: "1px solid",
        color: "#fff",
        background: "black",
        padding: "5px"
    };


    const displayMessage = () => {
        //remove all notifications
        toast.dismiss();


    }

    return (
        <div>
            New Message <div style={linkStyle} onClick={displayMessage}>View message</div>
        </div>
    );
};

export default Toaster;




