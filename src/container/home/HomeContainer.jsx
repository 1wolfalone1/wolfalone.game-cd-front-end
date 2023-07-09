import s from "./homeContainer.module.scss";
import clsx from "clsx";
import React, { useEffect, useLayoutEffect, useState } from "react";
import layoutSlice from "../common/layout/layoutSlice";
import { useDispatch } from "react-redux";
import ButtonHeader from "../../component/button/ButtonHeader";
import { Button } from "@mui/material";
import { apid } from "../../api/API";

export default function HomeContainer() {
   const dispatch = useDispatch();

   useLayoutEffect(() => {
      dispatch(layoutSlice.actions.updateLayout("homeLayout"));

      return () => {
         dispatch(layoutSlice.actions.updateLayout(""));
      };
   }, []);
   const [data, setData] = useState();

   return (
      <div className={clsx(s.container)}>
         <div className={clsx(s.leftMessage)}>
            <div className={clsx(s.title)}>
               <span>About us</span>
            </div>
            <p>
               GameCD is an online store that specializes in selling CDs of
               popular games. Whether you're a passionate gamer or just looking
               for the latest gaming releases, GameCD has got you covered. Our
               website features a wide selection of game CDs at competitive
               prices, and we ensure quick and hassle-free delivery of your
               purchases. Browse our collection and get your hands on the latest
               games today!
            </p>
         </div>
         <div className={clsx(s.rightMessage)}>
            <p>
               "Game on with GameCD - Your ultimate destination for gaming CDs!"
            </p>
            <Button
               variant="outlined"
               color="success"
               sx={{
                  color: '#f7ffe1ff',
                  fontSize: "4rem",
                  backgroundColor: "#191818b4",
                  padding: "2rem 4rem",
                  textTransform: "none",
                  border: "1px solid #f7ffe1ff",
                  boxShadow: "4px 4px 20px rgba(55, 0, 0, 0.672)",
                  backdropFilter: "blur(20px)",
                  borderRadius: "5px",
               }}
            >
               Get started
            </Button>
         </div>
      </div>
   );
}
