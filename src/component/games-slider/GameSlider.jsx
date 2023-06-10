import s from "./gameSlider.module.scss";

import React from "react";
import { motion } from "framer-motion";
import { Pagination } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
   gamesPagingSelector,
   getGameAndFilterAndPaging,
   getGameAndPaging,
   pageSelector,
} from "../../redux/global/productsSlice";

export default function GameSlider() {
   const page = useSelector(gamesPagingSelector);

   const dispatch = useDispatch();
   const handleChange = (event, value) => {
      console.log(event.target.value, page, value, "-----------------value");
      dispatch(getGameAndFilterAndPaging(value));
   };
   console.log(page);
   return (
      <>
         {page ? (
            <motion.div
               layout
               style={{ width: "100%" }}
               className={s.containerSlider}
            >
               <Pagination
                  count={page.totalPage}
                  variant="outlined"
                  shape="rounded"
                  color="Complementary2"
                  onChange={handleChange}
                  page={page.currentPage}
               />
            </motion.div>
         ) : (
            ""
         )}
      </>
   );
}
