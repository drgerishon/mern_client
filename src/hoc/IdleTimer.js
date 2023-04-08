import React from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import useIdle from "../hooks/useIdleTimer";
import {logout} from "../redux/slices/auth";
import {useDispatch, useSelector} from "react-redux";

const IdleTimer = () => {
  const {isIdle} = useIdle({idleTime: 0.5});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  if (isIdle) {
    dispatch(logout());
    navigate('/auth/login', {
      state: {
        from: location.pathname,
      }
    });
    return null;
  }

  return <></>;
}

export default IdleTimer;
