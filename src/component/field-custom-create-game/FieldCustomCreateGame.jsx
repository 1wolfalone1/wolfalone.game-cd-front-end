import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import React from "react";
import { theme } from "./../../config/theme";
export default function FieldCustomCreateGame({
   children,
   title,
   isRequired,
   position,
   helper,
}) {
   return (
      <Grid2 container spacing={3}>
         <Grid2
            xs={2}
            sx={{
               display: "flex",
               justifyContent: "flex-end",
               alignItems: position,
            }}
         >
            {isRequired ? (
               <span
                  style={{
                     color: "#000000",
                     marginRight: "2px",
                     fontSize: "1.8rem",
                  }}
               >
                  *
               </span>
            ) : (
               ""
            )}
            <span
               style={{
                  textAlign: "end",
                  fontSize: "2rem",
                  color: theme.palette.Dominant1.main,
               }}
            >
               {title} <br />{" "}
               <span
                  style={{
                     fontSize: "1.6rem",
                     color: "#66666688",
                  }}
               >
                  {helper}
               </span>
            </span>
         </Grid2>
         <Grid2 xs={9}>{children}</Grid2>
      </Grid2>
   );
}
