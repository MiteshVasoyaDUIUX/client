import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { reset } from "../features/auth/authSlice";

function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isError, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }

    if (user) {
      if (user.role === "admin") {
        navigate(`/admin?token=${user.token}`);
        console.log(`In ${user.token}  Panel :`);
      } else if (user.role === "buyer") {
        console.log("In Buyer Panel : ");
        navigate(`/buyer?token=${user.token}`);
      } else {
        throw new Error("Contact Admin For Access...");
      }
    }

    return () => {
      dispatch(reset());
    };
  }, [user, isError, message, navigate, dispatch]);

  return <></>;
}

export default Dashboard;
