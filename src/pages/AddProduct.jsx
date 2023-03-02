/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import {
  FormGroup,
  FormControl,
  InputLabel,
  Input,
  Button,
  FormHelperText,
  FormLabel,
  TextField,
} from "@mui/material";

import TextareaAutosize from "@mui/base/TextareaAutosize";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 50,
  },
  preview: {
    marginTop: 50,
    display: "flex",
    flexDirection: "column",
    width: "fit-content",
  },
  image: { width: "300px", height: "200px" },
  delete: {
    cursor: "pointer",
    width: "300px",
    padding: 15,
    background: "#457b9d",
    color: "white",
    border: "none",
  },
  floatContainer: {
    border: "3px solid #fff",
    padding: "20px",
  },
  floatChild: {
    width: "50%",
    float: "left",
    padding: "20px",
    border: "2px solid red",
  },
};

function AddProduct() {
  const [image, setImage] = useState([]);

  const handleImageChange = (e) => {
    let ImagesArray = Object.entries(e.target.files).map((e) =>
      URL.createObjectURL(e[1])
    );
    console.log(ImagesArray);
    setImage([...image, ...ImagesArray]);
    console.log("file", image);
  };

  const upload = (e) => {
    e.preventDefault();
    console.log(image);
  };

  const deleteFile = (e) => {
    const s = image.filter((item, index) => index !== e);
    setImage(s);
    console.log(s);
  };

  return (
    <div className="addproductform">
      <h1
        style={{
          textAlign: "center",
          marginTop: "70px",
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
        Add Product
      </h1>
      <form>
        <FormGroup
          style={{
            width: "50%",
            marginLeft: "auto",
            marginRight: "auto",
            paddingTop: "110px",
            paddingBottom: "110px",
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
              // value={name}
              // onChange={handleChanges}
              name="prodName"
              placeholder="Product Name"
              required
            />
          </FormControl>
          <br />
          <FormControl>
            <TextField
              type="textfield"
              // value={email}
              // onChange={handleChanges}
              name="prodDescription"
              multiline
              rows={4}
              placeholder="Product Description"
              required
            />
          </FormControl>
          <br />
          <FormControl>
            <TextField
              type="text"
              // value={email}
              // onChange={handleChanges}
              name="prodCategory"
              placeholder="Product Category"
              required
            />
          </FormControl>
          <br />
          <FormControl>
            <TextField
              type="number"
              // value={phoneNumber}
              // onChange={handleChanges}
              name="quantity"
              placeholder="Quantity"
              required
            />
          </FormControl>
          <br />

          <FormControl>
            <TextField
              type="text"
              // value={password}
              // onChange={handleChanges}
              name="price"
              variant="outlined"
              placeholder="Price"
              required
            />
          </FormControl>

          <FormControl>
            <InputLabel>Upload Image : </InputLabel>
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
            multiple
          />
          <div className="row" style={styles.floatContainer}>
            {image.length > 0 &&
              image.map((item, index) => {
                return (
                  <div
                    className="float-child"
                    key={item}
                    style={styles.preview}
                  >
                    <img src={item} alt="" style={styles.image} />
                    <button 
                      type="button"
                      style={styles.delete}
                      onClick={() => deleteFile(index)}
                    >
                      delete
                    </button>
                  </div>
                );
              })}
          </div>
          <br />
          <Button
            variant="contained"
            style={{
              backgroundColor: "#457b9d",
              color: "White",
              fontSize: "15px",
              fontWeight: "bolder",
            }}
          >
            Upload
          </Button>
        </FormGroup>
      </form>
    </div>
  );
}

export default AddProduct;
