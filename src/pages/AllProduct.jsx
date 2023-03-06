/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { fetchProduct } from "../features/product/productSlice";

//MaterialUI Components import...
import { Paper, Table, TableContainer, TableHead, TableRow } from "@mui/material";

function AllProduct() {
  const dispatch = useDispatch();

  const { products, isLoading, isFetched, isError, message } = useSelector(
    (state) => state.product
  );

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
      <section className="content" style={{ marginTop: "125px" }}>
        {products.length > 0 ? (
          <div className="product">
            {products.map((product) => (
              <Paper
                sx={{
                  width: "100%",
                  overflow: "hidden",
                  border: "0.1px solid black",
                }}
              >
                <TableContainer sx={{ maxHeight: 440 }}>
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow>
                        
                      </TableRow>
                    </TableHead>
                  </Table>
                </TableContainer>
              </Paper>
            ))}
          </div>
        ) : (
          <h3>Add Products</h3>
        )}
      </section>
    </>
  );
}

export default AllProduct;
