import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { reset } from "../features/auth/authSlice";
import ImageSlider from "../components/ImageSlider";
import NewArrivals from "../components/DashboardComponents/NewArrivals";
import TrandingProducts from "../components/DashboardComponents/TrendingProducts";
import "./Register.css";
function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isError, message } = useSelector((state) => state.auth);

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
      <ImageSlider />
      <NewArrivals />
      <TrandingProducts />
    </>
  );
}

export default Dashboard;
