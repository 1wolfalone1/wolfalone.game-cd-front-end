import {
   Box,
   Button,
   Divider,
   Modal,
   TextField,
   Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { backgroundStyleInOrderPage } from "./../../constant";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { modelStyle } from "../../constant.js";
import { style } from "../../style/custom/custom";
export default function InfoOrder({ info, setInfo }) {
   const [open, setOpen] = useState(false);
   const [tempInfo, setTempInfo] = useState({});
   const handleClose = () => {
      setOpen(false);
   };
   useEffect(() => {
      if (info) {
         setTempInfo(info);
      }
   }, [info]);
   const handleInfoChange = (e) => {
      const { value, name } = e.target;
      if (name === "name") {
         setTempInfo((state) => {
            return { ...state, name: value };
         });
      }
      if (name === "phone") {
         setTempInfo((state) => {
            return { ...state, phone: value };
         });
      }
      if (name === "address") {
         setTempInfo((state) => {
            return { ...state, address: value };
         });
      }
   };
   const handleChangeInformation = () => {
      setInfo(tempInfo)
      handleClose();
   }
   return (
      <Box
         sx={{ ...backgroundStyleInOrderPage, padding: "2rem" }}
         display={"flex"}
         flexDirection={"column"}
         gap="2rem"
      >
         <Box>
            <Box
               display="flex"
               justifyContent={"space-between"}
               alignItems={"flex-start"}
            >
               <Typography variant={"h4"} color="Accent1.main">
                  Delivery info
               </Typography>
               <Button onClick={() => setOpen(true)}>Change information</Button>
            </Box>
            <Divider color="Complementary1" />
         </Box>
         <Grid2 container spacing={2}>
            <Grid2 xs={6}>
               <Typography color="Complementary1.main">
                  {info?.name ? info?.name : "..."}
               </Typography>
            </Grid2>
            <Grid2 xs={6} sx={{ borderLeft: "1px solid #000000" }}>
               <Typography color="Complementary1.main">
                  {info?.phone ? info?.phone : "..."}
               </Typography>
            </Grid2>
         </Grid2>
         <Box sx={{ textAlign: "center" }} mt={1}>
            <Typography color="Complementary1.main">
               {info?.address ? info?.address : "..."}
            </Typography>
         </Box>
         <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
         >
            <Box
               sx={{
                  ...modelStyle,
                  background: "rgba(64, 65, 71, 0.69)",
                  borderRadius: "16px",
                  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                  border: "1px solid rgba(64, 65, 71, 0.42)",
                  padding: "2rem",
                  width: "50rem",
               }}
               display={"flex"}
               flexDirection={"column"}
               gap={2}
            >
               <TextField
                  sx={{
                     color: "warning",
                     input: {
                        color: style.color.$Complementary1,
                        fontSize: "1.6rem",
                     },
                     "& .MuiInputBase-input.Mui-disabled": {
                        WebkitTextFillColor: "#becda9",
                     },
                     label: {
                        color: style.color.$Accent1,
                        fontSize: "1.6rem",
                     },
                  }}
                  label="Name"
                  name="name"
                  value={tempInfo.name}
                  onChange={handleInfoChange}
               />
               <TextField
                  sx={{
                     color: "warning",
                     input: {
                        color: style.color.$Complementary1,
                        fontSize: "1.6rem",
                     },
                     "& .MuiInputBase-input.Mui-disabled": {
                        WebkitTextFillColor: "#becda9",
                     },
                     label: {
                        color: style.color.$Accent1,
                        fontSize: "1.6rem",
                     },
                  }}
                  label="Phone"
                  name="phone"
                  value={tempInfo.phone}
                  onChange={handleInfoChange}
               />
               <TextField
                  sx={{
                     color: "warning",
                     input: {
                        color: style.color.$Complementary1,
                        fontSize: "1.6rem",
                     },
                     "& .MuiInputBase-input.Mui-disabled": {
                        WebkitTextFillColor: "#becda9",
                     },
                     label: {
                        color: style.color.$Accent1,
                        fontSize: "1.6rem",
                     },
                  }}
                  label="Address"
                  name="address"
                  value={tempInfo.address}
                  onChange={handleInfoChange}
               />
               <Box display={"flex"} justifyContent={"flex-end"} gap={1}>
                  <Button onClick={() => {handleClose()}} variant="outlined">Cancel</Button>
                  <Button onClick={handleChangeInformation} variant="outlined">Change</Button>
               </Box>
            </Box>
         </Modal>
      </Box>
   );
}
