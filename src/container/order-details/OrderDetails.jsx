import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apid } from "../../api/API";

export default function OrderDetails() {
   const params = useParams();
   useEffect(() => {
      getOrderDetailsInfo();
   }, []);
   const getOrderDetailsInfo =  async () => {
      try {
         console.log(params);
         const res = await apid.get(`/order-details/${params.orderId}`)
         const data = await res.data;
         console.log(data);
      } catch (err) {
         console.error(err);
      }
   }
   return <div>OrderDetails</div>;
}
