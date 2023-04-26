import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { reset } from "../features/auth/authSlice";
import ImageSlider from "../components/ImageSlider";
import NewArrivals from "../components/DashboardComponents/NewArrivals";
import TrandingProducts from "../components/DashboardComponents/TrendingProducts";
import "./Register.css";
import { EmailVerificationReg } from "../components/EmailVerification";

function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { user, isError, message } = useSelector((state) => state.auth);
  const [blur, setBlur] = useState(false);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/");
    }

    if (user) {
      if (user.role === "admin") {
        navigate(`/admin/dashboard`);
      } else {
        // console.log("In Buyer Panel : ");
        if (user?.user.isDeleted) {
          navigate("/deleteduser");
        } else if (user?.user.isBlocked) {
          navigate("/blockeduser");
        } else if (location.state?.from === "/register") {
          console.log("Verification Page...", user);
          setBlur(true);
        } else {
          navigate("/");
        }
      }
    }

    return () => {
      dispatch(reset());
    };
  }, [user, isError, message, navigate, dispatch]);

  return (
    <>
      {blur ? (
        <>
          {console.log("UnBlur")}
          <EmailVerificationReg email={user.user.email} setBlur={setBlur} />
        </>
      ) : (
        <>
          {" "}
          <ImageSlider />
          <NewArrivals />
          <TrandingProducts />
        </>
      )}
    </>
  );
}

export default Dashboard;
