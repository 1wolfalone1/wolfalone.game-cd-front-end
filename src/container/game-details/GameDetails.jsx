import { useParams } from "react-router-dom";
import s from "./gameDetails.module.scss";
import React, { useEffect, useState } from "react";
import api from "../../api/authenticationApi";
import { apid } from "../../api/API";
import { motion } from "framer-motion";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import {
   Box,
   Button,
   Chip,
   Divider,
   IconButton,
   Input,
   InputBase,
   Stack,
   TextField,
   Typography,
} from "@mui/material";
import ThumpImage from "../../component/thump-image/ThumpImage";
import { style } from "../../style/custom/custom";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { useDispatch, useSelector } from "react-redux";
import cartSlice, { cartSliceSelector } from "../../redux/global/cartSlice";
import globalSlice from "../../redux/global/globalSlice";
const descriptionGameStyle = {
   box: {
      padding: "1rem 3rem",
      display: "flex",
      gap: "5rem",
      alignItems: "center",
   },
   typoTitle: {
      fontSize: "4rem",
      fontWeight: "1",
      color: style.color.$Dominant1,
   },
   typo: {
      fontSize: "4rem",
      fontWeight: "1",
      color: style.color.$Complementary1,
   },
};
export default function GameDetails() {
   const [quantity, setQuantity] = useState(0);
   const { items } = useSelector(cartSliceSelector);
   const { id } = useParams();
   const [game, setGame] = useState();
   const [cartQuantity, setCartQuantity] = useState(0);
   const dispatch = useDispatch();
   useEffect(() => {
      getGameById(id);
   }, []);
   useEffect(() => {
      setCartQuantity(getCurrentQuantity(items));
   }, [items, game]);
   const getCurrentQuantity = (items) => {

      console.log(items, game);
      let currentItemInCart = items?.find((item) => item?.id === game?.id);
      let currentQuantity = 0;
      if (currentItemInCart) {
         currentQuantity = currentItemInCart.cartQuantity;
      }
      return currentQuantity;
   };
   const getGameById = async (id) => {
      try {
         const res = await apid.get(`/games/details/${id}`);
         const data = await res.data;
         console.log(data);
         setGame(data);
         console.log(game);
      } catch (err) {
         console.error(err);
      }
   };
   const handleAddToCart = () => {
      console.log(quantity)
      dispatch(cartSlice.actions.addToCartWithQuantity({...game, cartQuantity: quantity}));
      setQuantity(0);
      dispatch(
         globalSlice.actions.changeSnackBarState({
            open: true,
            typeStatus: 'success',
            title: 'Success',
            message: "Add to cart successfully!",
         })
      );
   };
   const handleQuantityChange = (e) => {
      console.log(e.target.value);
      if(!e.target.value){
         setQuantity(0);
         return;
      }
      if (isNaN(Number(e.target.value))) {
      } else {
         if (e.target.value < 0) {
            dispatch(
               globalSlice.actions.changeSnackBarState({
                  open: true,
                  message: "Quantity cannot be negative!",
               })
            );
         } else if (+e.target.value > game.quantity -  +cartQuantity) {
            dispatch(
               globalSlice.actions.changeSnackBarState({
                  open: true,
                  message: "Quantity exceed  current stock!",
               })
            );
         } else {
            setQuantity(Number(e.target.value));
         }
      }
   };
   const handleIncreaseQuantity = () => {
      if(+quantity + +cartQuantity >= +game.quantity){
         dispatch(
            globalSlice.actions.changeSnackBarState({
               open: true,
               message: "Desired quantity exceed current stock!",
            })
         );
      } else {
         setQuantity(Number(quantity + 1));
      }
   };
   const handleDecreaseQuantity = () => {
      if(+quantity -1  < 0){
         dispatch(
            globalSlice.actions.changeSnackBarState({
               open: true,
               message: "Quantity cannot be negative!",
            })
         );
      } else {
         console.log(quantity + "quantity is negative")
         setQuantity(Number(+quantity - 1));
      }
   };
   return (
      <motion.div className={s.container}>
         {game ? (
            <Stack
               width={"70%"}
               m={"5rem auto"}
               sx={{ border: "1px solid #000000" }}
            >
               <Grid container>
                  <Grid xl={6} md={12}>
                     <ThumpImage images={game.imageList} />
                  </Grid>
                  <Grid xl={6} md={12}>
                     <Stack>
                        <Box
                           sx={{
                              display: "flex",
                              justifyContent: "center",
                              padding: "1rem",
                           }}
                        >
                           <Typography
                              sx={{
                                 fontSize: "5rem",
                                 color: style.color.$Accent1,
                              }}
                           >
                              {game.name}
                           </Typography>
                        </Box>
                        <Divider sx={{ color: "red", borderSize: "2rem" }} />
                        <Box sx={descriptionGameStyle.box}>
                           <Typography sx={descriptionGameStyle.typoTitle}>
                              Price
                           </Typography>
                           <Typography sx={descriptionGameStyle.typo}>
                              :{game.price}$
                           </Typography>
                        </Box>
                        <Box sx={descriptionGameStyle.box}>
                           <Typography sx={descriptionGameStyle.typoTitle}>
                              Categories:
                           </Typography>
                           <Typography
                              sx={{
                                 ...descriptionGameStyle.typo,
                                 lineHeight: "3rem",
                              }}
                           >
                              {game.categoryList.map((category) => {
                                 return (
                                    <Chip
                                       key={category.id}
                                       label={category.name}
                                       sx={{
                                          fontSize: "2rem",
                                          padding: "1rem 2rem",
                                          color: style.color.$Accent3,
                                       }}
                                    />
                                 );
                              })}
                           </Typography>
                        </Box>
                        <Box sx={descriptionGameStyle.box}>
                           <Typography sx={descriptionGameStyle.typoTitle}>
                              Quantity:{" "}
                           </Typography>
                           <Box>
                              <IconButton onClick={handleDecreaseQuantity}>
                                 <RemoveCircleOutlineIcon
                                    sx={{
                                       fontSize: "4rem",
                                       color: style.color.$Accent1,
                                    }}
                                 />
                              </IconButton>
                              <TextField
                                 variant="outlined"
                                 color="Complementary2"
                                 value={quantity}
                                 onChange={handleQuantityChange}
                                 sx={{
                                    input: {
                                       fontSize: "2rem",
                                       width: "5rem",
                                       textAlign: "center",
                                       color: style.color.$Accent1,
                                    },
                                 }}
                              />
                              <IconButton onClick={handleIncreaseQuantity}>
                                 <ControlPointIcon
                                    sx={{
                                       fontSize: "4rem",
                                       color: style.color.$Accent1,
                                    }}
                                 />
                              </IconButton>
                           </Box>
                           <Typography
                              sx={{
                                 color: style.color.$Accent2,
                                 fontSize: "2rem",
                              }}
                           >
                              {game.quantity} in stocks
                           </Typography>
                        </Box>
                        <Box
                           sx={{
                              display: "flex",
                              justifyContent: "space-around",
                              padding: "",
                              marginTop: "10rem",
                           }}
                        >
                           <Button
                              variant="outlined"
                              color="Complementary1"
                              sx={{ fontSize: "3rem" }}
                              onClick={handleAddToCart}
                           >
                              Add to cart
                           </Button>
                           <Button
                              variant="contained"
                              color="Accent1"
                              sx={{ fontSize: "3rem" }}
                           >
                              Order now
                           </Button>
                        </Box>
                     </Stack>
                  </Grid>
               </Grid>
               <Divider color="Complementary1" />
               <Box>
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                     <Typography
                        sx={{
                           fontSize: "4rem",
                           color: style.color.$Accent1,
                           borderBottom: "1px solid red",
                           width: "40%",
                           textAlign: "center",
                        }}
                     >
                        Description
                     </Typography>
                  </Box>
                  <div
                     dangerouslySetInnerHTML={{ __html: game.description }}
                     className={s.description}
                  />
               </Box>
            </Stack>
         ) : (
            ""
         )}
      </motion.div>
   );
}
