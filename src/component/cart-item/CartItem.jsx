import { Alert, AlertTitle, Box, IconButton, Input, Snackbar, TextField, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import React, { useEffect, useState } from "react";
import { style } from "../../style/custom/custom";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import BackspaceIcon from "@mui/icons-material/Backspace";
import { useDispatch, useSelector } from "react-redux";
import cartSlice, { cartSliceSelector } from "../../redux/global/cartSlice";
const gridStyle = {
   display: "flex",
   alignItems: "center",
   justifyContent: "center",
};
const styleTypo = {
   fontSize: "3rem",
   color: style.color.$Complementary2,
};
const quantityStyle = {
   icon: {
      fontSize: "3rem",
      color: style.color.$Accent1,
   },
   input: {
      input: {
         padding: "1rem",
         textAlign: "center",
         color: style.color.$Complementary1,
         fontSize: "2.4rem",
      },
   },
};
export default function CartItem({ item }) {
   const [openSnackBar, setOpenSnackBar] = useState(false);
   const { status } = useSelector(cartSliceSelector);
   const [isFirstLoad, setIsFirstLoad] = useState(true);

   useEffect(() => {
      if (isFirstLoad) {
         setIsFirstLoad(false);
      } else {
         console.log(status, "statausdasdfadfs");
         setOpenSnackBar(true);
      }
   }, [status]);
   const dispatch = useDispatch();
   console.log(item);
   const handleRemove = () => {
      dispatch(cartSlice.actions.removeItems(item.id));
   };
   const handleChangeQuantity = (e) => {
      console.log(e.target.value);
      dispatch(
         cartSlice.actions.changeQuantity({
            id: item.id,
            quantity: e.target.value,
         })
      );
   };
   if (!item) {
      return <></>;
   }
   return (
      <>
         <Grid2
            container
            sx={{
               height: "11rem",

               borderEndEndRadius: "100px",
               borderEndStartRadius: "100px",
               borderStartEndRadius: "100px",
               borderStartStartRadius: "100px",
               backgroundColor: style.color.$Dominant4,
               overflow: "hidden",
            }}
         >
            <Grid2
               xs={5}
               sx={{ display: "flex", alignItems: "center", gap: "3rem" }}
            >
               <Box sx={{ width: "11rem" }}>
                  <img
                     style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: "100%",
                     }}
                     src={item.imgUrl}
                     alt=""
                  />
               </Box>
               <Box>
                  <Typography variant="h4" sx={styleTypo}>
                     {item.name}
                  </Typography>
               </Box>
            </Grid2>
            <Grid2 xs={1} sx={gridStyle}>
               <Typography variant="h4" sx={styleTypo}>
                  {item.quantity}
               </Typography>
            </Grid2>
            <Grid2 xs={1} sx={gridStyle}>
               <Typography variant="h4" sx={styleTypo}>
                  {item.price}$
               </Typography>
            </Grid2>
            <Grid2 xs={2} sx={gridStyle}>
               <Box
                  sx={{
                     display: "flex",
                     alignItems: "center",
                     justifyContent: "center",
                     padding: "1rem",
                  }}
               >
                  <IconButton onClick={()=> {
                      dispatch(
                        cartSlice.actions.changeQuantity({
                           id: item.id,
                           quantity: +item.cartQuantity - 1,
                        })
                     );
                  }}>
                     <RemoveCircleIcon sx={quantityStyle.icon} />
                  </IconButton>
                  <TextField
                     sx={quantityStyle.input}
                     value={Number(item.cartQuantity)}
                     onChange={handleChangeQuantity}
                  />
                  <IconButton onClick={()=> {
                      dispatch(
                        cartSlice.actions.changeQuantity({
                           id: item.id,
                           quantity: +item.cartQuantity + 1,
                        })
                     );
                  }}>
                     <AddCircleIcon sx={quantityStyle.icon} />
                  </IconButton>
               </Box>
            </Grid2>
            <Grid2 xs={2} sx={gridStyle}>
               <Typography variant="h4" sx={styleTypo}>
                  {item.cartQuantity * item.price} $
               </Typography>
            </Grid2>
            <Grid2 xs={1} sx={gridStyle}>
               <IconButton color="Complementary1" onClick={handleRemove}>
                  <BackspaceIcon
                     sx={{ fontSize: "5rem", color: style.color.$Accent5 }}
                  />
               </IconButton>
            </Grid2>
         </Grid2>
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
