/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, fetchOrderUserwise } from "../features/users/usersSlice";
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
import { TablePagination } from "@mui/material";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUp from "@mui/icons-material/KeyboardArrowUp";
import { ErrorBoundary } from "../components/ErrorBoundary";

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
    width: "220px",
    align: "center",
  },
  {
    id: "emailVerified",
    label: "Is Email Verified",
    width: "120px",
    align: "center",
  },
  {
    id: "orders",
    label: "Orders",
    width: "120px",
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
    id: "orderDate",
    label: "Order Date",
    width: "120px",
    align: "center",
    format: (value) => value.slice(0, 10),
  },
  {
    id: "status",
    label: "Status",
    width: "220px",
    align: "center",
  },
  {
    id: "quantity",
    label: "Quantity",
    width: "120px",
    align: "center",
  },

  {
    id: "price",
    label: "Product Price (₹)",
    width: "120px",
    align: "center",
  },
  {
    id: "billAmount",
    label: "Total Amount (₹)",
    width: "120px",
    align: "center",
  },
  {
    id: "deliveryType",
    label: "Delivery Type",
    width: "60px",
    align: "center",
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
      sx={{ margin: "2px", padding: "0px" }}
    >
      {subColumns.map((column) => {
        const value = order[column.id];
        return (
          <TableCell align={column.align}>
            {column.format ? column.format(value) : value}
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
    (state) => state.user
  );

  const handleOrdersButton = () => {
    // console.log(userId);
    // Fetch Order of Particular User...
    setOpen(!open);
    // dispatch(fetchOrderUserwise({ userId }));
  };

  return (
    <>
      <TableRow
        hover
        role="checkbox"
        tabIndex={-1}
        key={row._id}
        sx={{ margin: "2px", padding: "0px" }}
      >
        {columns.map((column) => {
          const value = row[column.id];
          return (
            <TableCell key={value} align={column.align}>
              {column.id !== "orders" ? (
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
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
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
  const { users, ordersUserwise, isLoading, isFetched, isError, message } =
    useSelector((state) => state.user);

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
      toast.error(message);
    }

    if (users) {
      dispatch(fetchUsers());
    }

    if (ordersUserwise) {
      dispatch(fetchOrderUserwise());
    }
  }, [dispatch, isError, message]);

  if (isLoading) {
    //Add Spinner...
    return;
  }
  return (
    <section className="content" style={{ marginTop: "140px" }}>
      {users.length > 0 ? (
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
