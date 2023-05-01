/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsers,
  fetchOrderUserwise,
  reset,
  blockUnblockUser,
  deleteUser,
} from "../../features/users/usersSlice";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Button, TablePagination } from "@mui/material";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUp from "@mui/icons-material/KeyboardArrowUp";
import { ErrorBoundary } from "../../components/ErrorBoundary";
import Spinner from "../../components/Spinner";
import "../Admin Pages/AllUser.css";

const columns = [
  {
    id: "name",
    label: "User Name",
    width: "120px",
    align: "center",
  },
  {
    id: "email",
    label: "Email ",
    width: "60px",
    align: "center",
  },
  {
    id: "phoneNumber",
    label: "Mobile No.",
    width: "120px",
    align: "center",
  },
  {
    id: "emailVerified",
    label: "Is Email Verified",
    width: "120px",
    align: "center",
  },
  {
    id: "userStatus",
    label: "User Status",
    width: "100px",
    align: "center",
  },
  {
    id: "orders",
    label: "Orders",
    width: "120px",
    align: "center",
  },
  {
    id: "buttons",
    label: "",
    width: "100px",
    align: "center",
  },
];

const subColumns = [
  // {
  //   id: "userId",
  //   label: "userId",
  //   width: "120px",
  //   align: "center",
  // },
  {
    id: "createdAt",
    label: "Order Date",
    width: "120px",
    align: "center",
    format: (value) => value.slice(0, 10),
    textAlign: "center",
  },
  {
    id: "prodName",
    label: "Product Name",
    width: "650px",
    align: "center",
    textAlign: "left",
  },
  {
    id: "status",
    label: "Status",
    width: "100px",
    align: "center",
    textAlign: "center",
  },
  {
    id: "quantity",
    label: "Quantity",
    width: "180px",
    align: "center",
    textAlign: "center",
  },

  {
    id: "totalAmount",
    label: "Total Amount (₹)",
    width: "80px",
    align: "right",
    textAlign: "right",
    format: (value) => value.toLocaleString("en-IN"),
  },
  {
    id: "paymentType",
    label: "Delivery Type",
    width: "80px",
    align: "center",
    textAlign: "center",
  },
];

function OrderRow(props) {
  const { order } = props;
  const { userId } = props;
  // console.log("Order Data : ", userId);

  //Filtering Orders by User...

  // eslint-disable-next-line no-lone-blocks

  // eslint-disable-next-line no-unused-expressions
  return userId === order.userId ? (
    <TableRow
      hover
      role="checkbox"
      tabIndex={-1}
      key={order._id}
      sx={{ margin: "2px", padding: "0px", width: "100px" }}
    >
      {subColumns.map((column) => {
        const value = order[column.id];
        return (
          <TableCell align={column.textAlign}>
            {column.id === "totalAmount" ? (
              <>{column.format ? column.format(value) + " ₹" : value + " ₹"}</>
            ) : (
              <>{column.format ? column.format(value) : value}</>
            )}
          </TableCell>
        );
      })}
    </TableRow>
  ) : (
    ""
  );
}

function Row(props) {
  const [open, setOpen] = useState(false);
  const { row } = props;
  const dispatch = useDispatch();
  const { ordersUserwise, isError, message } = useSelector(
    (state) => state.users
  );

  const isBlocked = row.isBlocked;
  const isDeleted = row.isDeleted;

  // console.log("Deleted : ", row.isDeleted);

  const handleOrdersButton = () => {
    // console.log(row._id);
    // Fetch Order of Particular User...
    // dispatch(fetchOrderUserwise({ userId }));
    setOpen(!open);
  };

  const handleBlockButton = () => {
    const userData = {
      userId: row._id,
      blocked: !row.isBlocked,
    };
    dispatch(blockUnblockUser(userData));
  };

  const handleDeleteButton = () => {
    const userId = { userId: row._id };
    dispatch(deleteUser(userId));
  };

  return (
    <>
      <TableRow
        hover
        role="checkbox"
        tabIndex={-1}
        // key={row._id}
        sx={{ margin: "2px", padding: "0px" }}
      >
        {columns.map((column) => {
          const value = row[column.id];
          return (
            <TableCell key={value} align={column.align}>
              {column.id === "buttons" ? (
                isDeleted === true ? (
                  <></>
                ) : isBlocked === false ? (
                  <>
                    <input
                      type="button"
                      value="Block User"
                      id="block-user-btn"
                      onClick={handleBlockButton}
                    />
                    <input
                      type="button"
                      value="Delete User"
                      id="delete-user-btn"
                      onClick={handleDeleteButton}
                    />
                  </>
                ) : (
                  <>
                    <input
                      type="button"
                      value="Unblock User"
                      id="block-user-btn"
                      onClick={handleBlockButton}
                    />
                  </>
                )
              ) : column.id === "userStatus" ? (
                row["isDeleted"] === true ? (
                  <>
                    <div
                      style={{
                        width: "100px",
                        marginRight: "auto",
                        marginLeft: "auto",
                        backgroundColor: "#900000",
                        color: "white",
                        padding: "2px 0px",
                      }}
                    >
                      Deleted
                    </div>
                  </>
                ) : row["isBlocked"] === true ? (
                  <>
                    {" "}
                    <div
                      style={{
                        width: "100px",
                        marginRight: "auto",
                        marginLeft: "auto",
                        backgroundColor: "#E86A33",
                        color: "white",
                        padding: "2px 0px",
                      }}
                    >
                      Blocked
                    </div>
                  </>
                ) : (
                  <>
                    <>
                      {" "}
                      <div
                        style={{
                          width: "100px",
                          marginRight: "auto",
                          marginLeft: "auto",
                          backgroundColor: "#41644A",
                          color: "white",
                          padding: "2px 0px",
                        }}
                      >
                        Active
                      </div>
                    </>
                  </>
                )
              ) : column.id !== "orders" ? (
                String(value)
              ) : (
                //Collapse Button...

                <IconButton
                  aria-label="expand row"
                  size="small"
                  onClick={handleOrdersButton}
                >
                  {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                </IconButton>
              )}
            </TableCell>
          );
        })}
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    {subColumns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{
                          width: column.width,
                          fontWeight: "bold",
                          borderBottom: "1px solid black",
                        }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {ordersUserwise.map((order) => {
                    const userId = row._id;
                    return <OrderRow order={order} userId={userId} />;
                  })}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

function AllUser() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const {
    users,
    ordersUserwise,
    isUserFetching,
    isOrderFetching,
    isUsersFetched,
    isError,
    userSliceMessage,
  } = useSelector((state) => state.users);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    if (isError) {
      toast.error(userSliceMessage);
    }

    if (users) {
      dispatch(fetchUsers());
    }

    if (ordersUserwise) {
      dispatch(fetchOrderUserwise());
      // console.log("Orders Userwise : ", ordersUserwise);
    }

    return () => {
      dispatch(reset());
    };
  }, [dispatch, isError, userSliceMessage]);

  if (isUserFetching || isOrderFetching) {
    return <Spinner />;
  }
  return (
    <section className="all-users-table" style={{ marginTop: "55px" }}>
      {users.length > 0 ? (
        <div className="users">
          <Paper
            sx={{
              width: "95%",
              overflow: "hidden",
              marginLeft: "auto",
              marginRight: "auto",
              border: "0.1px solid black",
            }}
          >
            <TableContainer
              sx={{ height: "750px" }}
              style={{ overflowY: "scroll" }}
            >
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
                  {users
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      return <Row row={row} />;
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={users.length}
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
  );
}

export default AllUser;
