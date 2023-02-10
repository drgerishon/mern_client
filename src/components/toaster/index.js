import React, {useEffect} from 'react';
import Toaster from "./toaster";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import {setVisible} from "../../redux/slices/drawer";

const CustomToast = () => {
    const dispatch = useDispatch()
    const {drawer} = useSelector((state) => ({...state}))


    useEffect(() => {
        if (drawer === true) {
            toast(<Msg/>, {
                onClose: () => {
                    dispatch(setVisible(false))
                },
                autoClose: 5000
            })
        }

    }, [dispatch, drawer])


    const Msg = ({closeToast, toastProps}) => (
        <div>
            Lorem ipsum dolor {toastProps.position}
            <button>Retry</button>
            <button onClick={closeToast}>Close</button>
        </div>
    )


    const toastProps = {
        position: toast.POSITION.BOTTOM_CENTER,

                onClose: () => {
                    dispatch(setVisible(false))
                },
                autoClose: 5000

    }

    function handleClose() {
        return undefined;
    }

    return (
        <>
            {drawer === true && <Msg closeToast={handleClose()} toastProps={toastProps}/>}
        </>
    );
};

export default CustomToast;