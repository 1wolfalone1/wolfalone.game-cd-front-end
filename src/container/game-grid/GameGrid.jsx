import Grid from "@mui/material/Unstable_Grid2";
import s from "./gameGrid.module.scss";

import React, { useId } from "react";
import GameCard from "./../../component/game-card/GameCard";
import {
   AnimatePresence,
   LayoutGroup,
   LazyMotion,
   domAnimation,
} from "framer-motion";
import { motion } from "framer-motion";
import { Fade } from "@mui/material";
export default function GameGrid({ games }) {
   const id = useId();
   const animation = {
      init: {
         opacity: 0,
         x: -100,
      },
      animate: {
         opacity: 1,
         x: 0,
         transition: {
            duration: 1,
            delay: 1,
         },
      },
      exit: {
         opacity: 0,
      },
   };
   return (
         <div
            key={id}
            style={{ width: "100%" }}
         >
            <>
               {games && (
                  <Grid container>
                     {games.map((game) => {
                        return (
                           <Grid xl={3} lg={4} md={6} sm={12} key={game.id}>
                              <GameCard game={game} />
                           </Grid>
                        );
                     })}
                  </Grid>
               )}
            </>
         </div>
   );
}
