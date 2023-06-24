import { Box, Stack, Typography } from "@mui/material";
import s from "./cartContainer.module.scss";
import React from "react";
import { cartSliceSelector } from "../../redux/global/cartSlice";
import { useSelector } from "react-redux";
import { style } from "../../style/custom/custom";
import CartTitle from "../../component/cart-container-title/CartTitle";
import CartItems from "../../component/cart-items/CartItems";

export default function CartContainer() {
   const {items} = useSelector(cartSliceSelector);
   console.log(items)
   return (
      <Stack>
         <Box sx={{display: 'flex', justifyContent: 'center', padding: '1rem'}}>
            <Typography sx={{color: style.color.$Complementary1, fontSize: '4rem'}}>Your cart have {items.length} items</Typography>
         </Box>
         <Box sx={{width: '70%', margin: '1rem auto'}}>
            <CartTitle/>
            <CartItems items={items}/>
         </Box>
      </Stack>
   );
}
