import React, { useEffect, useState } from "react";
import { apid } from "./../../api/API";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AdminTableOrder from "../../component/admin-table-order/AdminTableOrder";


export default function AdminOrderContainer() {
   const navigate = useNavigate();
   return (
      <>
         <>
            <Box
               width={"100%"}
               height={"60rem"}
               display={"flex"}
               alignItems={"center"}
               flexDirection={"column"}
               gap={4}
               pt={1}
            >
               <Box width={"70%"}>
                  <Typography variant="h4" sx={{ textAlign: "center" }}>
                     Order manager
                  </Typography>
                  <Box display={"flex"} justifyContent={"flex-end"}>
                  </Box>
               </Box>
               <AdminTableOrder/>
            </Box>
         </>
      </>
   );
}