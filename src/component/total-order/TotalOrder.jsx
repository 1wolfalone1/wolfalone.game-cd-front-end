import { Box, Divider, Typography } from "@mui/material";
import React from "react";
import { backgroundStyleInOrderPage } from "./../../constant";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { formatNumber } from "../../utils/myUrils";

export default function TotalOrder({ items, totalPayment }) {
   return (
      <Box sx={{ ...backgroundStyleInOrderPage, padding: "2rem" }}>
         <Box>
            <Typography variant={"h4"} color="Accent1.main">
               Total payment
            </Typography>
            <Divider color="Complementary1" />
         </Box>
         <Box
            display={"flex"}
            flexDirection={"column"}
            gap={1}
            p={"1.8rem 1rem"}
         >
            {items
               ? items.map((item) => (
                    <Grid2 container>
                       <Grid2 xs={8}>
                          <Typography variant="h5" color={"Dominant1.main"}>
                             {item.name}
                          </Typography>
                       </Grid2>
                       <Grid2 xs={4} sx={{ textAlign: "end" }}>
                          <Typography
                             variant="h5"
                             color={"Complementary1.main"}
                          >
                             {formatNumber(item.price)} x {item.cartQuantity}
                          </Typography>
                       </Grid2>
                    </Grid2>
                 ))
               : ""}
         </Box>
         <Divider color="Complementary1" />

         <Box p={1}>
            <Box display={"flex"} justifyContent={"space-between"}>
               <Typography variant="h5" color={'Accent1.main'}>Total: </Typography>
               <Typography variant="h5">
                  {formatNumber(totalPayment)}{" "}
               </Typography>
            </Box>
         </Box>
      </Box>
   );
}
