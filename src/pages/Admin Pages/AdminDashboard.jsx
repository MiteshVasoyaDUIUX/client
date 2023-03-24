import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "./AdminDashboard.css";

function AdminDashboard() {

  const dispatch = useDispatch();
  
  return (
    <>
      {/* <Navbar /> */}
      <div className="dashboard-body">
        <div></div>
      </div>
    </>
  );
}

export default AdminDashboard;
