import Grid from '@mui/material/Unstable_Grid2'; 
import s from "./gameGrid.module.scss";

import React from "react";
import GameCard from "./../../component/game-card/GameCard";
import { LayoutGroup } from "framer-motion";
import { motion } from "framer-motion";
export default function GameGrid({ games }) {
   return (
      <motion.div
         layout
         animate="animate"
         style={{width: "100%"}}
      >
         <>
            {games ? (
               <Grid container>
                  {games.map((game) => {
                     return (
                        <Grid xl={3} lg={4} md={6} sm={12} key={game.id}>
                           <GameCard game={game} />
                        </Grid>
                     );
                  })}
               </Grid>
            ) : (
               "loading..."
            )}
         </>
      </motion.div>
   );
}
