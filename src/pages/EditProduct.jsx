/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  FormGroup,
  FormControl,
  InputLabel,
  Input,
  Button,
  FormHelperText,
  FormLabel,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import { updateProduct, reset } from "../features/product/productSlice";
import { toast } from "react-toastify";

function EditProduct() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formData = location.state;

  //Print form data...
//     console.log("Form Data : ", formData);
  const categories = [
    "Select Category",
    "Cloths",
    "Footware",
    "Accessories",
    "Other",
  ];

  //Initial Data to get filled form...
  const [productData, setProductData] = useState({
    productId: formData._id,
    prodName: formData.prodName,
    prodDesc: formData.prodDesc,
    prodCategory: formData.prodCategory,
    prodQuantity: formData.prodQuantity,
    prodPrice: formData.prodPrice,
    prodImage: formData.prodImage,
  });

  const [image, setImage] = useState(formData.prodImage);

  const [selectedCategory, setSelectedCategory] = useState(
    formData.prodCategory
  );
  const { products, isError, isLoading, isUpdated, message } = useSelector(
    (state) => state.product
  );

  if (isLoading) {
    //Add Spinner...
  }

  const {
    productId,
    prodName,
    prodDesc,
    prodCategory,
    prodQuantity,
    prodPrice,
    prodImage,
  } = productData;

//   console.log("Prod Id : ", productId);
  const handleChanges = (e) => {
    setProductData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

    //     console.log(productData);
  };

  const handleImageChange = (e) => {
    let ImagesArray = Object.entries(e.target.files).map((e) =>
      URL.createObjectURL(e[1])
    );
    // console.log("New Image : ", ImagesArray);

    setImage([...image, ...ImagesArray]);
    // console.log("All Image Array : ", image);
  };

  const handleCategoryChange = (e) => {
    if (e.target.value === "Select Category") {
      return;
    } else {
      setSelectedCategory(e.target.value);
      console.log(e.target.value);
    }
  };

  const deleteFile = (e) => {
    const s = image.filter((item, index) => index !== e);
    setImage(s);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // const url = URL.createObjectURL(image[0].slice(5));

    const productData = {
      productId,
      prodName,
      prodDesc,
      prodCategory: selectedCategory,
      prodQuantity,
      prodPrice,
      prodImage: image,
    };

//     console.log("New Data : ", productData);
    // console.log("In Product Update Page...", productData);
    dispatch(updateProduct(productData));
  };

  useEffect(() => {
      if (isError) {
        toast.error(message);
      }
  
      if (isUpdated) {
        toast.success("Product Updated Successfully", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "light",
        });
  
  
        navigate("/admin/allproduct");
      }
  
      dispatch(reset());
    }, [isUpdated, isError, message, navigate, dispatch]);

  //   console.log("Data : ", formData);

  return (
    <div className="addproductform">
      <h1
        style={{
          textAlign: "center",
          marginTop: "80px",
          marginLeft: "auto",
          marginRight: "auto",
          padding: "20px",
          fontFamily: "sans-serif",
          borderBottom: "1px solid #457b9d",
          width: "fit-content",
          color: "#457b9d",
          backgroundColor: "white",
        }}
      >
        Update Product Details
      </h1>
      <form>
        <FormGroup
          style={{
            width: "50%",
            marginLeft: "auto",
            marginRight: "auto",
            paddingTop: "80px",
            paddingBottom: "80px",
            paddingLeft: "60px",
            paddingRight: "60px",
            border: "1px solid #457b9d",
            boxShadow: "7px 7px 29px 1px rgba(69, 123, 157, 0.6) ",
            borderRadius: "30px",
            backgroundColor: "white",
          }}
        >
          {/* Change color of border of the box */}
          <FormControl>
            <TextField
              type="text"
              value={prodName}
              onChange={handleChanges}
              name="prodName"
              placeholder="Product Name"
              required
            />
          </FormControl>
          <br />
          <FormControl>
            <TextField
              type="textfield"
              value={prodDesc}
              onChange={handleChanges}
              name="prodDesc"
              multiline
              rows={4}
              placeholder="Product Description"
              required
            />
          </FormControl>
          <br />
          {/* <TextField
                type="text"
                value={prodCategory}
                onChange={handleChanges}
                name="prodCategory"
                placeholder="Product Category"
                required
              /> */}

          <Select
            value={selectedCategory}
            onChange={handleCategoryChange}
            placeholder="Select Category"
            name="prodCategory"
          >
            {categories.map((category, index) => {
              return (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              );
            })}
          </Select>

          <br />
          <FormControl>
            <TextField
              type="number"
              value={prodQuantity}
              onChange={handleChanges}
              name="prodQuantity"
              placeholder="Quantity"
              required
            />
          </FormControl>
          <br />

          <FormControl>
            <TextField
              type="text"
              value={prodPrice}
              onChange={handleChanges}
              name="prodPrice"
              variant="outlined"
              placeholder="Price"
              required
            />
          </FormControl>

          <FormControl>
            <InputLabel>
              Upload Product Image : <small> (Max. 6 Images) </small>
            </InputLabel>
            <br />
            <br />
            <br />
          </FormControl>
          <input
            type="file"
            accept="image/*"
            style={{
              border: "1px solid #BFBFBF",
              borderRadius: "5px",
              padding: "15px",
            }}
            onChange={handleImageChange}
            disabled={image.length === 6}
            multiple
          />
          <div className="row image-container">
            {image.length > 0 &&
              image.map((item, index) => {
                return (
                  <div className="image-div" key={item}>
                    <img src={item} className="image" alt="" />
                    <button
                      type="button"
                      className="delete-image"
                      onClick={() => deleteFile(index)}
                    >
                      Remove
                    </button>
                  </div>
                );
              })}
          </div>

          <Button
            variant="contained"
            style={{
              backgroundColor: "#457b9d",
              color: "White",
              fontSize: "15px",
              fontWeight: "bolder",
            }}
            onClick={handleSubmit}
          >
            Upload
          </Button>
        </FormGroup>
      </form>
    </div>
  );
}

export default EditProduct;
