import { Box, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import React from "react";

const styleTypo = {
   fontSize: "2.4rem",
   color: "#C6CFFF",
};
const gridStyle = { display: "flex", justifyContent: "center" };
export default function CartTitle() {
   return (
      <Grid2
         container
         sx={{
            borderBottom: "1px solid #0c0c0c",
            borderTop: "1px solid #0c0c0c",
            marginBottom: '2rem'
         }}
      >
         <Grid2 xs={5} sx={gridStyle}>
            <Typography sx={styleTypo}>Item</Typography>
         </Grid2>
         <Grid2 xs={1} sx={gridStyle}>
            <Typography sx={styleTypo}> In Stock</Typography>
         </Grid2>
         <Grid2 xs={1} sx={gridStyle}>
            <Typography sx={styleTypo}>Price</Typography>
         </Grid2>
         <Grid2 xs={2} sx={gridStyle}>
            <Typography sx={styleTypo}>Quantity</Typography>
         </Grid2>
         <Grid2 xs={2} sx={gridStyle}>
            <Typography sx={styleTypo}>Total</Typography>
         </Grid2>
         <Grid2 xs={1} sx={gridStyle}>
            <Typography sx={styleTypo}>Remove</Typography>
         </Grid2>
      </Grid2>
   );
}
