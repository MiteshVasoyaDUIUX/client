import React, { useState } from "react";
import { Card } from "@mui/material";
import { CardActions } from "@mui/material";
import { CardContent } from "@mui/material";
import { CardMedia } from "@mui/material";
import { Typography } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavouriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import { IconButton } from "@mui/material";


export default function ProductCard({ product }) {
  const [wishlist, setWishlist] = useState(false);
  const [addToCart, setAddToCart] = useState(false);
  // console.log("Products : ", product.prodImage);
  return (
    <>
      <Card
        sx={{
          maxWidth: 400,
          textAlign: "center",
          marginBottom: "30px",
          marginRight: "30px",
          border: "0.5px solid white",
          boxShadow: "none",
          borderRadius: "15px",
        }}
        key = {product._id}
        className="product-card"
      >
        <CardMedia
          component="img"
          alt="green iguana"
          image={product.prodImage[0]}
          sx={{
            height: "fitContent",
            width: "fitContent",
            minHeight: "300px",
          }}
        />
        <CardContent>
          <Typography
            variant="h6"
            component="div"
            style={{
              textAlign: "left",
              overflow: "hidden",
              whiteSpace: "wrap",
              textOverflow: "ellipsis",
              height: "60px",
              marginBottom: "8px",
            }}
          >
            {product.prodName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
        <CardActions>
              <IconButton onClick={() => setAddToCart(!addToCart)}> 
              {addToCart ? (
                  <AddShoppingCartIcon
                    color="primary"
                  />
                ) : (
                  <AddShoppingCartIcon
                  />
                )}
              </IconButton>
              <IconButton onClick={() => setWishlist(!wishlist)}>
                {wishlist ? (
                  <FavouriteRoundedIcon
                    color="error"
                  />
                ) : (
                  <FavoriteBorderIcon
                    color="error"
                  />
                )}
              </IconButton>
            </CardActions>
      </Card>
    </>
  );
}

