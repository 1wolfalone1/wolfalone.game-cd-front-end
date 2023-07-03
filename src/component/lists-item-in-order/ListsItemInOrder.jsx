import { Box, Divider, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import React from "react";
import { formatNumber } from "../../utils/myUrils";
import { backgroundStyleInOrderPage } from './../../constant';

export default function ListsItemInOrder({ items }) {
   return (
      <Box
         sx={{
           ...backgroundStyleInOrderPage,
            padding: "3rem 5rem",
         }}
      >
         <Typography variant={"h4"} color="Accent1.main">
            Lists item
         </Typography>
         <Divider color="Complementary1" />
         <Box display={"flex"} flexDirection={"column"} pt={2}>
            {items &&
               items.map((item) => (
                  <Grid2 container key={item.id}>
                     <Grid2 xs={2}>
                        <img
                           src={item.imgUrl}
                           alt=""
                           style={{ width: "100%" }}
                        />
                     </Grid2>
                     <Grid2
                        xs={6}
                        sx={{
                           paddingLeft: "2rem",
                           display: "flex",
                           alignItems: "center",
                        }}
                     >
                        <Typography variant="h4" color={"Complementary2.main"}>
                           {item.name}
                        </Typography>
                     </Grid2>
                     <Grid2
                        xs={4}
                        display={"flex"}
                        justifyContent={"flex-end"}
                        alignItems={"center"}
                     >
                        <Typography variant="h5" color="Dominant2.main">
                           {formatNumber(item.price)} x {item.cartQuantity}
                        </Typography>
                     </Grid2>
                  </Grid2>
               ))}
         </Box>
      </Box>
   );
}
