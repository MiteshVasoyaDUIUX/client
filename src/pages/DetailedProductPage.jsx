import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Images from "../components/DetailedProductPage.jsx/Images";
import { fetchOneProduct } from "../features/productsForClient/productsForClientSlice";
import "./DetailedProductPage.css";

function DetailedProductPage() {
  const dispatch = useDispatch();
  //Directly get Params from URLs...


  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    dispatch(fetchOneProduct("64104882a04e33e631c70b31"));
  }, []);

  return (
    <>
      <div className="details-page">
        <Images />
      </div>
    </>
  );
}

export default DetailedProductPage;
