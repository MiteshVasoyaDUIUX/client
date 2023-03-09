/* eslint-disable no-lone-blocks */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { fetchProduct } from "../features/product/productSlice";

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
} from "@mui/material";
import { Link } from "react-router-dom";

const columns = [
  {
    id: "prodImage",
    label: "Image",
    width: "120px",
    imageHeight: "200px",
    align: "center",
  },
  {
    id: "prodStatus",
    label: "Status",
    width: "60px",
    align: "center",
  },
  {
    id: "prodName",
    label: "Name",
    width: "220px",
    align: "center",
  },
  {
    id: "prodDesc",
    label: "Description",
    width: "220px",
    align: "center",
  },
  {
    id: "prodCategory",
    label: "Category",
    width: "120px",
    align: "center",
  },
  {
    id: "prodQuantity",
    label: "Quantity",
    width: "120px",
    align: "right",
  },
  {
    id: "prodPrice",
    label: "Price(₹)",
    width: "120px",
    align: "right",
  },
  {
    id: "discount",
    label: "Discount(%)",
    width: "120px",
    align: "center",
  },
  {
    id: "rating",
    label: "Rating",
    width: "120px",
    align: "center",
  },
  {
    id: "deliveryType",
    label: "Delivery Type",
    width: "120px",
    align: "center",
  },
  // {
  //   id: 'prodImage',
  //   label: 'Image',
  //   minWidth: 170,
  //   align: 'right',
  // },
];

function AllProduct() {
  const dispatch = useDispatch();

  const { products, isLoading, isFetched, isError, message } = useSelector(
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
      dispatch(fetchProduct());
    }
  }, [dispatch]);

  if (isLoading) {
    return;
  }

  return (
    <>
      <section className="content" style={{ marginTop: "140px" }}>
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
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {products
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row) => {
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
                                      overflow : "clip",
                                      height : "60px"
                                    }}
                                  >
                                    {column.id === "prodImage" ? (
                                      <ImageList
                                        sx={{ width: 230, height: 80 }}
                                        cols={3}
                                        rowHeight={50}
                                      >
                                        {images.map((item) => (
                                          <ImageListItem key={item}>
                                            <img
                                              src={item}
                                              alt={item}
                                              loading="lazy"
                                            />
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

                            {/* <button>Edit</button> */}
                            
                          </TableRow>
                        );
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
