import React, { useEffect, useState } from "react";
import { apid } from "./../../api/API";
import { Box, Button, Typography } from "@mui/material";
import AdminGameTable from "../admin-game-table/AdminGameTable";
import { useNavigate } from "react-router-dom";


export default function AdminGameContainer() {
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
                     Game manager
                  </Typography>
                  <Box display={"flex"} justifyContent={"flex-end"}>
                     <Button variant="outlined" onClick={() => navigate('/admin/create-game')}>Create game +</Button>
                  </Box>
               </Box>
               <AdminGameTable />
            </Box>
         </>
      </>
   );
}
