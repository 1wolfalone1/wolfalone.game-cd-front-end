import { Alert, AlertTitle, Box, Button, Chip, Snackbar } from "@mui/material";
import s from "./gameCard.module.scss";

import React, { useEffect, useState } from "react";
import { style } from "../../style/custom/custom";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import cartSlice, { cartSliceSelector } from "../../redux/global/cartSlice";
const buttonStyle = {
   marginTop: "10px",
   fontSize: "2rem",
};
export default function GameCard({ game }) {
   const [openSnackBar, setOpenSnackBar] = useState(false);
   const { status } = useSelector(cartSliceSelector);
   const [isFirstLoad, setIsFirstLoad] = useState(true);
   const navigate = useNavigate();
   const dispatch = useDispatch();
   useEffect(() => {
      if (isFirstLoad) {
         setIsFirstLoad(false);
      } else {
         console.log(status, 'statausdasdfadfs')
         setOpenSnackBar(true);
      }
   }, [status]);
   const handleAddToCart = () => {
      dispatch(cartSlice.actions.addToCart(game));
   };

   return (
      <>
         <div className={s.container} key={game.id}>
            <div className={s.image}>
               <img src={game.imgUrl} alt="" />
            </div>
            <div className={s.content}>
               <div className={s.name}>
                  <span>{game.name}</span>
               </div>
               <div className={s.types}>
                  {game.listCategory.map((cate) => (
                     <Chip
                        label={cate.name}
                        key={cate.id}
                        sx={{
                           fontSize: "1.6rem",
                           color: style.color.$Dominant1,
                        }}
                     />
                  ))}
               </div>
               <div className={s.price}>
                  <div className={s.left}>
                     <span>{game.price}$</span>
                  </div>
                  <div className={s.right}>
                     <span>
                        {game.quantity !== 0 ? "Available" : "Unavailable"}
                     </span>
                  </div>
               </div>
               <div className={s.button}>
                  <Button
                     variant="outlined"
                     sx={buttonStyle}
                     color="Complementary1"
                     onClick={handleAddToCart}
                  >
                     Add to cart
                  </Button>
                  <Button
                     variant="outlined"
                     sx={buttonStyle}
                     color="Complementary1"
                     onClick={() => navigate(`/game-details/${game.id}`)}
                  >
                     View detail
                  </Button>
               </div>
            </div>
         </div>
         <Snackbar
            open={openSnackBar}
            autoHideDuration={1000}
            message="Note archived"
            onClose={() => setOpenSnackBar(false)}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
         >
            <Alert
               onClose={() => setOpenSnackBar(false)}
               severity={status.isValid ? "success" : "warning"}
               sx={{ width: "100%", fontSize: "1.6rem" }}
               variant="filled"
             
            >
               <AlertTitle sx={{ fontSize: "2.4rem" }}>
                  {status.isValid ? "Success" : "Warning"}
               </AlertTitle>
               {status.msg}
            </Alert>
         </Snackbar>
      </>
   );
}
