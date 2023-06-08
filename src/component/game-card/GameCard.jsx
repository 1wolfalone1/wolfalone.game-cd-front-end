import { Box, Button, Chip } from "@mui/material";
import s from "./gameCard.module.scss";

import React from "react";
import { style } from "../../style/custom/custom";
import { motion } from "framer-motion";
const buttonStyle = {
   marginTop: "10px",
   fontSize: "2rem",
};
export default function GameCard({ game }) {
   console.log(game);
   const animation2 = {
      init: {
         opacity: 0,
      },
      animate: {
         opacity: 1,
         transition: {
            duration: 1,
         },
      },
   };
   return (
      <motion.div
         variants={animation2}
         initial="init"
         animate="animate"
         className={s.container}
      >
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
                     sx={{ fontSize: "1.6rem", color: style.color.$Dominant1 }}
                  />
               ))}
            </div>
            <div className={s.price}>
               <div className={s.left}>
                  <span>{game.price}$</span>
               </div>
               <div className={s.right}>
                  <span>
                     {game.quantity !== 0 ? "Unavailable" : "Available"}
                  </span>
               </div>
            </div>
            <div className={s.button}>
               <Button
                  variant="outlined"
                  sx={buttonStyle}
                  color="Complementary1"
               >
                  Add to cart
               </Button>
               <Button
                  variant="outlined"
                  sx={buttonStyle}
                  color="Complementary1"
               >
                  View details
               </Button>
            </div>
         </div>
      </motion.div>
   );
}
