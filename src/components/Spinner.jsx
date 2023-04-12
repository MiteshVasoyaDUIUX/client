import React from "react";
import { GridLoader } from "react-spinners";
import { Oval } from "react-loader-spinner";

export default function Spinner() {
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "48%",
        transform: "translate(0, -50%)",
        padding: "10px",
      }}
    >
      <Oval
        height={80}
        width={80}
        color="#000000"
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="#FFFFFF"
        strokeWidth={5}
        strokeWidthSecondary={7}
      />
    </div>
  );
}
