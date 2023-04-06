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
import { fetchAllOrders } from "../../features/order/orderSlice";
import "./MyOrders.css";
import { styled } from "@mui/material/styles";
import { reset } from "../../features/admin/adminSlice";
import { Link, useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";

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
    width: "50%",
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
    format: (value) => value + " ₹",
  },
  {
    id: "paymentType",
    label: "Payment Method",
    align: "center",
    textAlign: "center",
  },
  {
    id: "messageAdmin",
    label: "",
    align: "center",
    textAlign: "center",
  },
];

function Row(props) {
  const { row } = props;
  let status = "";

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

          if (column.id === "status") {
            status = value;
          }
          return (
            <TableCell key={value} align={column.textAlign}>
              {column.id !== "messageAdmin" ? (
                String(value)
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
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { orders } = useSelector((state) => state.order);
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
  }, [dispatch, user]);

  if (user) {
    userId = user.user._id;
  }

  console.log("Orders : ", orders);

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
        {orders.length > 0 ? (
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
                            zIndex: "0",
                            backgroundColor: "#1d2133",
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
            No Users Found
          </div>
        )}
      </section>
    </>
  );
}
