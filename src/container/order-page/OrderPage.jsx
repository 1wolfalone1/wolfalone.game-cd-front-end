import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
   infoUserSelector,
   statusSelector,
} from "../../redux/global/userInfoSlice";
import { cartSliceSelector } from "../../redux/global/cartSlice";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import ListsItemInOrder from "../../component/lists-item-in-order/ListsItemInOrder";
import InfoOrder from "../info-order/InfoOrder";
import TotalOrder from "../../component/total-order/TotalOrder";
import { LoadingButton } from "@mui/lab";
import { apid } from "../../api/API";

export default function OrderPage() {
   const info = useSelector(infoUserSelector);
   const status = useSelector(statusSelector);
   const { items } = useSelector(cartSliceSelector);
   const [totalPayment, setTotalPayment] = useState(0);
   const [isOrderable, setIsOrderable] = useState(true);
   const [deliveryInfo, setDeliveryInfo] = useState({
      name: "",
      phone: "",
      address: "",
   });
   useEffect(() => {
      if (items && Array.isArray(items)) {
         const totalPayment = items.reduce((acc, item) => {
            return +acc + item.price * item.cartQuantity;
         }, 0);
         setTotalPayment(totalPayment);
      }
   }, [items]);
   useEffect(() => {
      if (status === "user") {
         setDeliveryInfo({
            name: info.name,
            phone: info.phone,
            address: info.address,
         });
      }
   }, [info]);
   useEffect(() => {
      if (!deliveryInfo.name || !deliveryInfo.phone || !deliveryInfo.address) {
         setIsOrderable(true);
      } else {
         setIsOrderable(false);
      }
   }, [deliveryInfo]);

   const handlePlaceOrder = async () => {
      const games = items.map((item) => {
         return {
            id: item.id,
            quantity: item.cartQuantity,
         };
      });
      const formData = {
         games,
         totalPayment,
         deliveryInfo,
      };
      console.log(formData);
      try { 
         const res = await apid.post('/order', formData);
         console.log(res);
         const data = res.data;
         console.log(data);
      } catch (e) {
         console.log(e);
      }
   };
   return (
      <Box sx={{ padding: "8rem 12rem" }}>
         <Grid2 container spacing={4}>
            <Grid2 xs={8}>
               <ListsItemInOrder items={items} />
            </Grid2>
            <Grid2 xs={4} display={"flex"} flexDirection={"column"} gap={4}>
               <InfoOrder info={deliveryInfo} setInfo={setDeliveryInfo} />
               <TotalOrder items={items} totalPayment={totalPayment} />
               <Box display={"flex"} justifyContent={"flex-end"}>
                  <LoadingButton
                     disabled={isOrderable}
                     sx={{ fontSize: "2.4rem" }}
                     variant="outlined"
                     onClick={handlePlaceOrder}
                  >
                     Place order
                  </LoadingButton>
               </Box>
            </Grid2>
         </Grid2>
      </Box>
   );
}
