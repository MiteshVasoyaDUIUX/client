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
import { fetchAllOrders } from "../features/order/orderSlice";
import "./MyOrders.css";
import { styled } from '@mui/material/styles';


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
    id: "orderDate",
    label: "Order Date",
    titleAlign: "center",
  },
  {
    id: "status",
    label: "Status",
  },
  {
    id: "quantity",
    label: "Quantity",
    titleAlign: "center",
    valueAlign: "center",
  },
  {
    id: "totalAmount",
    label: "Amount",
    titleAlign: "center",
    valueAlign: "right",
    format: (value) => value + " ₹",
  },
  {
    id: "paymentType",
    label: "Payment Method",
    valueAlign: "center",
  },
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 1,
  },
}));

export default function MyOrders() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { orders } = useSelector((state) => state.order);
  const userId = user.user._id;

  useEffect(() => {
    if (user) {
      // console.log("User : ", user)
      dispatch(fetchAllOrders(userId));
    }
  }, [dispatch]);

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
      <div className="buyers-orders-table-title">Orders</div>
      <Paper className="buyers-orders-table">
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead className="buyers-orders-table-header">
              <TableRow>
                {columns.map((column) => (
                  <StyledTableCell
                    key={column.id}
                    align={column.titleAlign}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {orders
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((order) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={order.id}
                    >
                      {columns.map((column) => {
                        const value = order[column.id];
                        return (
                          <TableCell key={column.id} align={column.valueAlign}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
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
          className="buyer-orders-table-pagination"
        />
      </Paper>
    </>
  );
}
