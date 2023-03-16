/* eslint-disable no-lone-blocks */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  fetchProducts,
  removeProduct,
  updateProduct,
  reset,
} from "../features/product/productSlice";

//MaterialUI Components import...
import {
  IconButton,
  ImageList,
  ImageListItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Button,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/DeleteRounded";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import { margin } from "@mui/system";
import { GridLoader } from "react-spinners";

const columns = [
  {
    id: "prodImage",
    label: "Image",
    width: "15%",
    imageHeight: "200px",
    align: "center",
  },
  {
    id: "prodStatus",
    label: "Status",
    width: "8%",
    align: "center",
  },
  {
    id: "prodName",
    label: "Name",
    width: "13%",
    align: "center",
  },
  {
    id: "prodDesc",
    label: "Description",
    width: "19%",
    align: "center",
  },
  {
    id: "prodCategory",
    label: "Category",
    width: "6%",
    align: "center",
  },
  {
    id: "prodQuantity",
    label: "Quantity",
    width: "6%",
    align: "center",
  },
  {
    id: "prodPrice",
    label: "Price (₹)",
    width: "5%",
    align: "right",
  },
  {
    id: "discount",
    label: "Discount (%)",
    width: "6%",
    align: "center",
  },
  {
    id: "rating",
    label: "Rating",
    width: "5%",
    align: "center",
  },
  {
    id: "deliveryType",
    label: "Delivery Type",
    width: "8%",
    align: "center",
  },
  // {
  //   id: 'prodImage',
  //   label: 'Image',
  //   minWidth: 170,
  //   align: 'right',
  // },
];

function Row(props) {
  const { row } = props;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleEditButton = () => {
    // console.log("Edit Button Clicked", row);
    const state = row;
    // console.log("State ", state);
    navigate("/admin/editproduct/", { state });
    // dispatch(updateProduct(row._id));
  };
  const handleRemoveButton = () => {
    console.log("Remove Button Clicked", row._id);
    dispatch(removeProduct(row._id));
  };

  return (
    <TableRow
      hover
      role="checkbox"
      tabIndex={-1}
      key={row}
      sx={{
        margin: "2px",
        padding: "10px",
        height: "10px",
      }}
    >
      {columns.map((column) => {
        const value = row[column.id];

        const quantity = row.prodQuantity;
        let status = "";
        const images = row.prodImage;
        if (quantity < 5) {
          status = "Low Stock";
        } else if (quantity === 0) {
          status = "Out Of Stock";
        } else {
          status = "Active";
        }

        return (
          <>
            <TableCell key={column.id} align={column.align}>
              <div
                style={{
                  whiteSpace: "wrap",
                  textOverflow: "ellipsis",
                  overflow: "clip",
                  height: "100px",
                  margin: "10",
                }}
              >
                {column.id === "prodImage" ? (
                  <ImageList
                    sx={{ width: 200, height: "100px" }}
                    cols={1}
                    rowHeight="auto"
                  >
                    {images.map((item) => (
                      <ImageListItem key={item}>
                        <img src={item} alt={item} loading="lazy" />
                      </ImageListItem>
                    ))}
                  </ImageList>
                ) : column.id === "prodStatus" ? (
                  status
                ) : (
                  value
                )}
              </div>
            </TableCell>
          </>
        );
      })}
      <TableCell>
        <div>
          {/* <Link to="/admin/updateproduct" style={{
            textDecoration: "none",
          }}> */}
          <Button
            variant="outlined"
            startIcon={<EditIcon />}
            style={{
              width: "100px",
              margin: "3px",
              textDecoration: "none",
            }}
            onClick={handleEditButton}
          >
            Edit
          </Button>
          {/* </Link> */}
        </div>
        <div>
          <Button
            variant="outlined"
            startIcon={<DeleteIcon />}
            style={{
              width: "100px",
              margin: "3px",
            }}
            color="error"
            onClick={handleRemoveButton}
          >
            Delete
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}

function AllProduct() {
  const dispatch = useDispatch();

  const { products, isLoading, isFetching, isError, message } = useSelector(
    (state) => state.product
  );

  //For Pagination...
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  console.log("Products : ", products);
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (products) {
      dispatch(fetchProducts());
    }

    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  if (isLoading) {
    // console.log("Fetching Products...");
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
        <GridLoader color="#437b9f" speedMultiplier="0.75" />
      </div>
    );
  }

  return (
    <>
      <section className="content" style={{ marginTop: "55px" }}>
        {products.length > 0 ? (
          <div className="product">
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
                    <TableRow>
                      {columns.map((column) => (
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
                      <TableCell
                        style={{ borderBottom: "1px solid black" }}
                      ></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {products
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row) => {
                        return <Row row={row}></Row>;
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={products.length}
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
            {" "}
            No Products Found, 
            <Link to="/admin/addproduct">Click Here To Add Products</Link>
          </div>
        )}
      </section>
    </>
  );
}

export default AllProduct;
