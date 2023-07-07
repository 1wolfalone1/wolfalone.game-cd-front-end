import React from "react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import globalSlice from "../../redux/global/globalSlice";
import { getOrderTable } from "../../redux/global/orderSlice";
import { Box, Typography } from "@mui/material";
import OrderTable from "../../component/order-table/OrderTable";

export default function OrderHistory() {
   const dispatch = useDispatch();
   useEffect(() => {
      dispatch(globalSlice.actions.changeNavActive(4));
      dispatch(getOrderTable());
   }, []);
   return (
      <>
         <Box display={'flex'} justifyContent={'center'}>
            <Typography>Order history</Typography>
         </Box>
         <Box display={'flex'} justifyContent={'center'} padding={'3rem 10rem'}>
            <OrderTable />
         </Box>
      </>
   );
}
