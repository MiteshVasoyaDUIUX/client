import React, { useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useDispatch, useSelector } from "react-redux";
import "./MyOrders.css";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/system";
import { Grid } from "@mui/material";
import { fetchCart } from "../features/productsForClient/productsForClientSlice";

const columns = [
  {
    id: "_id",
    label: "Order ID",
    titleAlign: "center",
  },
  {
    id: "prodName",
    label: "Product Name",
    titleAlign: "center",
  },
  {
    id: "quantity",
    label: "Quantity",
    titleAlign: "center",
    valueAlign: "center",
  },
];

export default function Cart() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.productsForClient);
  const userId = user.user._id;

  useEffect(() => {
    if (user) {
      // console.log("User : ", user)
      dispatch(fetchCart(userId));
    }
  }, [dispatch]);

  console.log("Cart Fetched : ", cart);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <div className="buyers-orders-table-title">Cart</div>
      <Box sx={{ width: "100%" }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 2, sm: 4, md: 1 }}>
          {cart.map((item) => {
            return (
              <p>
                {item}
              </p>
            );
          })}
          <Grid item xs={12}></Grid>
        </Grid>
      </Box>
    </>
  );
}
