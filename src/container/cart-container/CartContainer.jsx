import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import s from "./cartContainer.module.scss";
import React, { useEffect, useState } from "react";
import { cartSliceSelector } from "../../redux/global/cartSlice";
import { useSelector } from "react-redux";
import { style } from "../../style/custom/custom";
import CartTitle from "../../component/cart-container-title/CartTitle";
import CartItems from "../../component/cart-items/CartItems";
import { useNavigate } from "react-router-dom";

export default function CartContainer() {
   const [totalPayment, setTotalPayment] = useState(0);
   const { items } = useSelector(cartSliceSelector);
   const navigate = useNavigate();
   console.log(items);
   useEffect(() => {
      if (items && Array.isArray(items)) {
         console.log(items);
         const totalPayment = items.reduce((acc, item) => {
            return +acc + +item.cartQuantity * item.price;
         }, 0);
         setTotalPayment(totalPayment);
      }
   }, [items]);
   return (
      <Stack>
         <Box
            sx={{ display: "flex", justifyContent: "center", padding: "1rem" }}
         >
            <Typography
               sx={{ color: style.color.$Complementary1, fontSize: "4rem" }}
            >
               Your cart have {items.length} items
            </Typography>
         </Box>
         <Box sx={{ width: "70%", margin: "1rem auto" }}>
            <CartTitle />
            <CartItems items={items} />
            <Box
               display={"flex"}
               flexDirection={"column"}
               alignItems={"end"}
               mt={3}
               gap={3}
            >
               <Box
                  display={"flex"}
                  alignItems={"center"}
                  gap="1rem"
                  sx={{ borderTop: "1px solid #090000" }}
               >
                  <Typography variant="h4" color="secondary.main">
                     Total payment:
                  </Typography>
                  <Typography variant="h4" color={"Accent1.main"}>
                     {" "}
                     {totalPayment}$
                  </Typography>
               </Box>
               <Button variant="outlined" sx={{ fontSize: "2rem" }}
               onClick={()=> navigate('/order')}
               >
                  Order now
               </Button>
            </Box>
         </Box>
      </Stack>
   );
}
