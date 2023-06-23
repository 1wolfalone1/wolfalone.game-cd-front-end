import { Box, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import React from "react";
import { style } from "../../style/custom/custom";
const gridStyle = { display: "flex", alignItems: "center", justifyContent: 'center'};
const styleTypo = {
   fontSize: "3rem",
   color: style.color.$Complementary2,
};
export default function CartItem({ item }) {
   console.log(item);
   return (
      <Grid2
         container
         sx={{
            height: "11rem",

            borderEndEndRadius: "100px",
            borderEndStartRadius: "100px",
            borderStartEndRadius: "100px",
            borderStartStartRadius: "100px",
            backgroundColor: style.color.$Dominant4,
            overflow: "hidden",
         }}
      >
         <Grid2
            xs={5}
            sx={{ display: "flex", alignItems: "center", gap: "3rem" }}
         >
            <Box sx={{ width: "11rem" }}>
               <img
                  style={{
                     width: "100%",
                     height: "100%",
                     borderRadius: "100%",
                  }}
                  src={item.imgUrl}
                  alt=""
               />
            </Box>
            <Box>
               <Typography variant="h4" sx={styleTypo}>
                  {item.name}
               </Typography>
            </Box>
         </Grid2>
         <Grid2 xs={1} sx={gridStyle}>
            <Typography variant="h4" sx={styleTypo}>
               {item.quantity}
            </Typography>
         </Grid2>
         <Grid2 xs={1} sx={gridStyle}>
         <Typography variant="h4" sx={styleTypo}>
               {item.price}$
            </Typography>
         </Grid2>
         <Grid2 xs={2} sx={gridStyle}></Grid2>
         <Grid2 xs={2} sx={gridStyle}></Grid2>
         <Grid2 xs={1} sx={gridStyle}></Grid2>
      </Grid2>
   );
}
