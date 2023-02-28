import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { reset } from "../features/auth/authSlice";

function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  // const { isError, isLoading, message } = useSelector((state) => state.goals)

  useEffect(() => {
    // if (isError) {
    //   console.log(message);
    // }

    if (!user) {
      navigate("/register");
    }

    if (user) {
      return;
    }

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, dispatch]);

  return <></>;
}

export default Dashboard;
