import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMonthlyOrders,
  fetchOrderUserwise,
  fetchUsers,
} from "../../features/users/usersSlice";
import "./AdminDashboard.css";
import { ImCart } from "react-icons/im";
import { MdPointOfSale, MdInventory } from "react-icons/md";
import { fetchProducts } from "../../features/product/productSlice";
import { Chart } from "react-google-charts";
import { ErrorBoundary } from "../../components/ErrorBoundary";
import { Card, Rating, Typography } from "@mui/material";
import { padding } from "@mui/system";
import { fetchAllOrders } from "../../features/admin/adminSlice";

const optionsForPieChart = {
  legend: "none",
  fontSize: 12,
  pieHole: 0.4,
  is3D: false,
  width: 400,
  height: 400,
  slices : {
    0 : {color : "Orange"},
    1 : {color : "Green"},
    2 : {color : "Red"}
  }
};

const optionsForLineChart = {
  legend: "none",
  fontSize: 12,
  pieHole: 0.4,
  is3D: false,
  width: 750,
  height: 400,
  vAxis: {
    format: "0",
  },
};

function TopSellingProducts({ products }) {
  return (
    <>
      <Card
        style={{
          width: "500px",
          height: "120px",
          marginLeft: "30px",
          marginRight: "0px",
          marginBottom: "19px",
          marginTop: "15px",
        }}
      >
        <div style={{ display: "flex" }}>
          <div
            style={{
              width: "auto",
              height: "auto",
              borderRight: "1px solid rgb(100, 100, 100, 0.2)",
              padding: "20px",
            }}
          >
            <img
              src={products[4].prodImage[0]}
              className="card-image-content"
              alt=""
              style={{ width: "90px", height: "90px" }}
            />
          </div>
          <div
            style={{
              width: "73%",
              borderRight: "1px solid rgb(100, 100, 100, 0.2)",
              padding: "15px",
            }}
          >
            <Typography variant="h6" component="div">
              {products[4].prodName}
            </Typography>
          </div>
        </div>
      </Card>
      <Card
        style={{
          width: "500px",
          height: "120px",
          marginLeft: "30px",
          marginRight: "0px",
          marginBottom: "24px",
        }}
      >
        <div style={{ display: "flex" }}>
          <div
            style={{
              width: "auto",
              height: "auto",
              borderRight: "1px solid rgb(100, 100, 100, 0.2)",
              padding: "20px",
            }}
          >
            <img
              src={products[2].prodImage[0]}
              className="card-image-content"
              alt=""
              style={{ width: "90px", height: "90px" }}
            />
          </div>
          <div
            style={{
              width: "73%",
              borderRight: "1px solid rgb(100, 100, 100, 0.2)",
              padding: "15px",
            }}
          >
            <Typography variant="h6" component="div">
              {products[2].prodName}
            </Typography>
          </div>
        </div>
      </Card>
    </>
  );
}

function AdminDashboard() {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { users } = useSelector((state) => state.user);
  const { orderMonthwise } = useSelector((state) => state.user);
  const { allOrders } = useSelector((state) => state.admin);
  const { products } = useSelector((state) => state.product);

  const date = new Date();

  const todaysDate =
    date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();

  useEffect(() => {
    if (user) {
      dispatch(fetchUsers());
      dispatch(fetchOrderUserwise());
      dispatch(fetchProducts());
      dispatch(fetchMonthlyOrders());
      dispatch(fetchAllOrders())
    }
  }, [dispatch]);

  let sales = 0;
  let todaysOrders = 0;
  let todaysSales = 0;
  let pendingOrders = 0;
  let cancelledOrders = 0;
  let successOrders = 0;
  let arrayData = 1;

  let monthlyOrderData = [
    ["Month", "Orders"],
    ["Jan", 0],
    ["Feb", 0],
    ["Mar", 0],
    ["Apr", 0],
    ["May", 0],
    ["June", 0],
    ["July", 0],
    ["Aug", 0],
    ["Sep", 0],
    ["Oct", 0],
    ["Nov", 0],
    ["Dec", 0],
  ];

  for (let index = 0; index < allOrders.length; index++) {
    sales = sales + allOrders[index].totalAmount;

    if (allOrders.orderDate === todaysDate) {
      todaysOrders += 1;
      todaysSales = todaysSales + allOrders.totalAmount;
    }

    if (allOrders[index].status === "pending") {
      pendingOrders += 1;
    } else if (allOrders[index].status === "Success") {
      successOrders += 1;
    } else if (allOrders[index].status === "Cancel") {
      cancelledOrders += 1;
    }

  }

  for (let index = 0; index < orderMonthwise.length; index++) {
    if (monthlyOrderData.length > 0) {
      monthlyOrderData[index + 1][1] = orderMonthwise[index].orders;
      // console.log("Monthly Orders : ", monthlyOrderData);
    }
  }

  let avgRating = 0;

  for (let index = 0; index < products.length; index++) {
    avgRating += products[index].rating;
  }

  avgRating = (avgRating / products.length).toFixed(2);
  // console.log("All Orders : ", allOrders);

  const OrderStatusData = [
    ["Order Status", ""],
    ["Pending", pendingOrders],
    ["Success", successOrders],
    ["Cancelled", cancelledOrders],
  ];

  //Sort orders by their selling quantities to show in Top SKUs...

  // console.log("todaysOrders : ", orderMonthwise);

  return (
    <>
      <div className="dashboard-body">
        <div className="dashboard-quick-insights">
          <div className="dashboard-todays-orders">
            <div className="dashboard-todays-orders-desc">
              <span style={{ fontSize: "28px" }}>{todaysOrders}</span>
              <br />
              Todays Orders
            </div>
            <div className="dashboard-todays-orders-image">
              <ImCart fontSize={"50px"} />
            </div>
          </div>

          <div className="dashboard-todays-sales">
            <div className="dashboard-todays-sales-desc">
              <span style={{ fontSize: "28px" }}>{todaysSales} ₹</span>
              <br />
              Todays Sales
            </div>
            <div className="dashboard-todays-sales-image">
              <ImCart fontSize={"50px"} />
            </div>
          </div>

          <div className="dashboard-total-orders">
            <div className="dashboard-total-orders-desc">
              <span style={{ fontSize: "28px" }}>{allOrders.length}</span>
              <br />
              Total Orders
            </div>
            <div className="dashboard-total-orders-image">
              <ImCart fontSize={"50px"} />
            </div>
          </div>

          <div className="dashboard-total-sales">
            <div className="dashboard-total-sales-desc">
              <span style={{ fontSize: "28px" }}>
                {sales.toLocaleString("en-IN")} ₹
              </span>
              <br />
              Total Sales
            </div>
            <div className="dashboard-total-sales-image">
              <MdPointOfSale fontSize={"50px"} />
            </div>
          </div>

          <div className="dashboard-inventory">
            <div className="dashboard-inventory-desc">
              <span style={{ fontSize: "28px" }}>{products.length}</span>
              <br />
              Total Products
            </div>
            <div className="dashboard-inventory-image">
              <MdInventory fontSize={"50px"} />
            </div>
          </div>
        </div>

        <div className="dashboard-charts">
          <div className="total-orders-line-chart">
            <div className="total-orders-line-chart-desc">
              Monthly Order Data
            </div>
            <div className="total-orders-line-chart-div">
              <Chart
                chartType="LineChart"
                data={monthlyOrderData}
                options={optionsForLineChart}
              />
            </div>
          </div>
          <div className="order-status-div">
            <div className="order-status-chart-desc">Order Status</div>
            <div className="order-status-chart-div">
              <Chart
                chartType="PieChart"
                data={OrderStatusData}
                options={optionsForPieChart}
              />
              {
                console.log("Pie Chart : ", OrderStatusData)
              }
            </div>
          </div>
          <div
            style={{
              border: "1px solid black",
              marginLeft: "0px",
              marginRight: "10px",
              height: "480px",
              marginBottom: "auto",
              marginTop: "auto",
            }}
          >
            <div className="customer-review-div">
              <div className="customer-review-div-desc">Customer Review</div>
              <div className="customer-review-div-details">
                <Rating
                  name="read-only"
                  value={avgRating}
                  precision={0.1}
                  readOnly
                  className="customer-review-rating-stars"
                  size="large"
                />
                <div style={{ display: "flex" }}>
                  <Typography
                    component="legend"
                    sx={{
                      marginLeft: "auto",
                      marginRight: "2px",
                      width: "fit-content",
                      fontSize: "20px",
                    }}
                  >
                    {avgRating}
                  </Typography>
                  <Typography
                    component="legend"
                    sx={{
                      marginLeft: "2px",
                      marginRight: "auto",
                      width: "fit-content",
                      fontSize: "20px",
                    }}
                  >
                    out of 5
                  </Typography>
                </div>
              </div>
            </div>
            <div className="top-selling-products">
              <div className="top-selling-prod-desc">Top Selling Products</div>
              <div className="top-selling-prod-list">
                <ErrorBoundary>
                  {products.length > 0 ? (
                    <TopSellingProducts products={products} />
                  ) : (
                    <></>
                  )}
                </ErrorBoundary>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </>
  );
}

export default AdminDashboard;
