import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { reset } from "../features/auth/authSlice";
import ImageSlider from "../components/ImageSlider";
import NewArrivals from "../components/DashboardComponents/NewArrivals";
import TrandingProducts from "../components/DashboardComponents/TrendingProducts";
import "./Register.css";
import { EmailVerificationReg } from "../components/EmailVerification";

function HomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { user, isVerified, isError, message } = useSelector(
    (state) => state.auth
  );
  const [blur, setBlur] = useState(false);

  useEffect(() => {
    if (isError) {
      // console.log(message);
    }

    if (!user) {
      navigate("/");
    }

    if (isVerified) {
      setBlur(false);
      // console.log("isVerified", blur);
      reset();
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
          navigate("/user/verification", {state : { email: user.user.email }});
          setBlur(true);
        } else {
          navigate("/");
        }
      }
    }

    return () => {
      dispatch(reset());
    };
  }, [user, isError, message, navigate, dispatch, isVerified]);

  return (
    <>
      {/* {blur ? (
        <>
          // {console.log("Blur")}
          <EmailVerificationReg email={user.user.email} setBlur={setBlur} />
        </>
      ) : ( */}
      <>
        {/* {console.log("Home Page")} */}
        <ImageSlider />
        <NewArrivals />
        <TrandingProducts />
      </>
      {/* )} */}
    </>
  );
}

export default HomePage;
