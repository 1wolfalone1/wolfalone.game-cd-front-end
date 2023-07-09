import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
   gamesPagingSelector,
   getGameAndFilterAndPaging,
   getGameAndPaging,
} from "../../redux/global/productsSlice";
import { Grid, Stack } from "@mui/material";
import GameFilter from "./../../component/games-filter/GameFilter";
import GameGrid from "../game-grid/GameGrid";
import GameSlider from "../../component/games-slider/GameSlider";
import { LayoutGroup } from "framer-motion";

export default function ProductsPageContainer() {
   const gamePageData = useSelector(gamesPagingSelector);
   const dispatch = useDispatch();
   useEffect(() => {
      dispatch(getGameAndFilterAndPaging(1));
   }, []);
   console.log(gamePageData);
   return (
      <Stack
         direction="column"
         justifyContent="center"
         alignItems="center"
         spacing={2}
         px={"11rem"}
         py={"3rem"}
      >
         <LayoutGroup id="top5">
            <GameFilter/>
            <GameGrid games={gamePageData?.games} />
            <GameSlider page={gamePageData?.totalPage} />
         </LayoutGroup>
      </Stack>
   );
}
