import React from "react";
import "./EmailVerification.css";
import { useDispatch } from "react-redux";
import { verifyUser } from "../features/auth/authSlice";

function EmailVerification({
  email,
  emailVerPage,
  setEmailVerPage,
  setMainClass,
}) {
  const dispatch = useDispatch();
  //   console.log("Email ", email);

  const sendLinkBtn = () => {
    console.log("Send Btn")
      dispatch(verifyUser());
  };

  return (
    <div className="email-ver-card">
      <p> Verify Email Address to Continue... </p>
      <div className="email-ver-email-icon">
        <img
          alt=""
          src="data:image/png;base64,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"
        />
      </div>
      <div className="email-text-box">
        <input type="text" name="email" id="" defaultValue={email} disabled />
      </div>
      <div className="email-ver-buttons">
        <input
          type="button"
          value="Send Link"
          id="send-link-btn"
          onClick={sendLinkBtn}
        />
        <input
          type="button"
          value="Back"
          id="back-btn"
          onClick={() => {
            setEmailVerPage(!emailVerPage);
            setMainClass("place-order-page");
          }}
        />
      </div>
    </div>
  );
}

export default EmailVerification;