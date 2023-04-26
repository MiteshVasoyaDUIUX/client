import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllOrders, giveRating } from "../../features/order/orderSlice";
import "./MyOrders.css";
import { reset } from "../../features/admin/adminSlice";
import { Link, useNavigate } from "react-router-dom";
import { Rating } from "@mui/material";
import { toast } from "react-toastify";

const columns = [
  {
    id: "_id",
    label: "Order ID",
    align: "center",
  },
  {
    id: "prodName",
    label: "Product Name",
    align: "center",
    textAlign: "left",
    width: "40%",
  },
  {
    id: "createdAt",
    label: "Order Date",
    align: "center",
    textAlign: "center",
    format: (value) => value.split("T")[0],
  },
  {
    id: "status",
    label: "Status",
  },
  {
    id: "quantity",
    label: "Quantity",
    align: "center",
    textAlign: "center",
    valueAlign: "center",
  },
  {
    id: "totalAmount",
    label: "Amount",
    align: "center",
    valueAlign: "right",
    textAlign: "center",
    format: (value) => value.toLocaleString("en-IN") + " ₹",
  },
  {
    id: "paymentType",
    label: "Payment Method",
    align: "center",
    textAlign: "center",
  },
  {
    id: "rating",
    label: "Rating",
    align: "center",
    textAlign: "center",
    width: "10%",
  },
  {
    id: "messageAdmin",
    label: "",
    align: "center",
    textAlign: "center",
  },
];

function Row({ row }) {
  let status = "";

  const [openRating, setOpenRating] = useState(false);
  const [ratingValue, setRatingValue] = useState(0);
  const [readOnly, setReadOnly] = useState(false);
  const dispatch = useDispatch();

  const handleRatingChanges = (event, newValue) => {
    setRatingValue(newValue);

    const ratingData = {
      orderId: row._id,
      userId: row.userId,
      productId: row.productId,
      ratingValue: newValue,
    };

    setReadOnly(true);

    dispatch(giveRating(ratingData));

    toast.success("Thank You for Feedback...");
  };
  return (
    <>
      <TableRow
        hover
        role="checkbox"
        tabIndex={-1}
        sx={{ margin: "2px", padding: "0px" }}
      >
        {columns.map((column) => {
          const value = row[column.id];
          let rate = false;

          if (column.id === "status") {
            status = value;
          }

          if (status === "Success" && (!row.rating || row.rating === 0)) {
            rate = true;
          }

          return (
            <TableCell key={value} align={column.textAlign}>
              {column.id !== "messageAdmin" ? (
                column.id === "totalAmount" || column.id === "createdAt" ? (
                  column.format(value)
                ) : column.id === "rating" ? (
                  <>
                    {rate === true ? (
                      <>
                        {openRating === true ? (
                          <>
                            <Rating
                              name="simple-controlled"
                              value={ratingValue}
                              onChange={handleRatingChanges}
                              readOnly={readOnly}
                              style={{ zIndex: 0 }}
                            />
                          </>
                        ) : (
                          <div
                            className="rate-text"
                            onClick={() => setOpenRating(true)}
                          >
                            Rate this Product
                          </div>
                        )}
                      </>
                    ) : status === "Success" && rate === false ? (
                      <>
                        <Rating
                          name="read-only"
                          value={row.rating}
                          style={{ zIndex: 0 }}
                          readOnly
                        />
                      </>
                    ) : (
                      <></>
                    )}
                  </>
                ) : (
                  value
                )
              ) : status === "Success" ? (
                <>
                  <Link to="/buyer/chat">
                    <button className="message-seller-button">
                      Mesage Seller
                    </button>
                  </Link>
                </>
              ) : (
                <></>
              )}
            </TableCell>
          );
        })}
      </TableRow>
    </>
  );
}

export default function MyOrders() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { orders, isRated } = useSelector((state) => state.order);
  let userId;

  useEffect(() => {
    if (!user) {
      navigate("/");
    }

    if (user) {
      // console.log("User : ", user)
      dispatch(fetchAllOrders(userId));
    }

    return () => {
      reset();
    };
  }, [dispatch, user, isRated]);

  if (user) {
    userId = user.user._id;
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <section className="content" style={{ marginTop: "55px" }}>
        {orders?.length > 0 ? (
          <div className="users">
            <Paper
              sx={{
                width: "95%",
                overflow: "hidden",
                marginLeft: "2.3%",
                border: "0.1px solid black",
              }}
            >
              <TableContainer sx={{ height: "750px" }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    {/* Print Titles... */}
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell
                          key={column._id}
                          align={column.align}
                          style={{
                            width: column.width,
                            fontWeight: "bold",
                            borderBottom: "1px solid black",
                            zIndex: "1",
                            backgroundColor: "#2a3035",
                            color: "#f0f3ed",
                          }}
                        >
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {orders
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row) => {
                        return <Row row={row} />;
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={orders.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </div>
        ) : (
          <div
            style={{
              textAlign: "center",
              fontFamily: "sans-serif",
              fontSize: "35px",
              fontWeight: "bold",
            }}
          >
            No Orders Found
          </div>
        )}
      </section>
    </>
  );
}
