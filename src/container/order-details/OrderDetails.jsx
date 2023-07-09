import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apid } from "../../api/API";
import { Box, Divider, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { backgroundStyleInOrderPage } from "./../../constant";
import { formatNumber } from "../../utils/myUrils";
import moment from "moment";

export default function OrderDetails() {
   const [orderDetails, setOrderDetails] = useState();
   const params = useParams();
   useEffect(() => {
      getOrderDetailsInfo();
   }, []);
   const getOrderDetailsInfo = async () => {
      try {
         console.log(params);
         const res = await apid.get(`/order-details/${params.orderId}`);
         const data = await res.data;
         console.log(data);
         setOrderDetails(data);
      } catch (err) {
         console.error(err);
      }
   };
   return (
      <>
         {orderDetails ? (
            <>
               <Box padding={"8rem 12rem"}>
                  <Grid2 container spacing={4}>
                     <Grid2 xs={7}>
                        <Box
                           sx={{
                              ...backgroundStyleInOrderPage,
                              padding: "2rem",
                              display: "flex",
                              flexDirection: "column",
                              gap: 1,
                           }}
                        >
                           <Box>
                              <Typography
                                 variant="h4"
                                 color={"Accent2.contrastText"}
                              >
                                 Order details
                              </Typography>
                              <Divider color="Complementary3" />
                           </Box>
                           <Box>
                              {orderDetails ? (
                                 <>
                                    {orderDetails.games.map((game) => (
                                       <Grid2 container key={game?.game?.id}>
                                          <Grid2 xs={2}>
                                             <img
                                                src={game?.game?.imgUrl}
                                                alt=""
                                                style={{ width: "100%" }}
                                             />
                                          </Grid2>
                                          <Grid2 xs={5}>
                                             <Box
                                                display={"flex"}
                                                justifyContent={"center"}
                                                alignItems={"center"}
                                                height={"100%"}
                                             >
                                                <Typography
                                                   variant="h5"
                                                   noWrap
                                                   color="Complementary1.main"
                                                >
                                                   {game?.game?.name}
                                                </Typography>
                                             </Box>
                                          </Grid2>
                                          <Grid2 xs={5}>
                                             <Box
                                                display={"flex"}
                                                justifyContent={"center"}
                                                alignItems={"center"}
                                                height={"100%"}
                                                gap={1}
                                             >
                                                <Typography
                                                   variant="h5"
                                                   noWrap
                                                   color="Complementary1.main"
                                                >
                                                   {formatNumber(game?.price)}
                                                </Typography>

                                                <Typography
                                                   variant="h5"
                                                   noWrap
                                                   color="Complementary1.main"
                                                >
                                                   x
                                                </Typography>
                                                <Typography
                                                   variant="h5"
                                                   noWrap
                                                   color="Complementary1.main"
                                                >
                                                   {game?.quantity}
                                                </Typography>
                                             </Box>
                                          </Grid2>
                                       </Grid2>
                                    ))}
                                 </>
                              ) : (
                                 <></>
                              )}
                           </Box>
                        </Box>
                     </Grid2>
                     <Grid2
                        xs={5}
                        display={"flex"}
                        flexDirection={"column"}
                        gap={4}
                     >
                        <Box
                           sx={{
                              ...backgroundStyleInOrderPage,
                              padding: "2rem",
                              display: "flex",
                              flexDirection: "column",
                              gap: 1,
                           }}
                        >
                           <Box>
                              <Typography
                                 variant="h4"
                                 color={"Accent2.contrastText"}
                              >
                                 Status
                              </Typography>
                              <Divider color="Complementary3" />
                           </Box>
                           <Box
                              display={"flex"}
                              justifyContent={"space-between"}
                           >
                              <Typography
                                 variant="h5"
                                 color={"Complementary1.main"}
                              >
                                 Order date:
                              </Typography>
                              <Typography
                                 variant="h5"
                                 color={"Complementary1.main"}
                              >
                                 {(() => {
                                    const date = moment(
                                       orderDetails.orderDate
                                    ).format("HH:mm DD-MM-YYYY");
                                    console.log(date);
                                    if (date === "Invalid date") {
                                       return "Not yet!";
                                    }
                                    return date;
                                 })()}
                              </Typography>
                           </Box>
                           <Box
                              display={"flex"}
                              justifyContent={"space-between"}
                           >
                              <Typography
                                 variant="h5"
                                 color={"Complementary1.main"}
                              >
                                 Ship date:
                              </Typography>
                              <Typography
                                 variant="h5"
                                 color={"Complementary1.main"}
                              >
                                 {(() => {
                                    const date = moment(
                                       orderDetails.shipDate
                                    ).format("HH:mm DD-MM-YYYY");
                                    console.log(date);
                                    if (date === "Invalid date") {
                                       return "Not yet!";
                                    }
                                    return date;
                                 })()}
                              </Typography>
                           </Box>
                           <Box
                              display={"flex"}
                              justifyContent={"space-between"}
                           >
                              <Typography
                                 variant="h5"
                                 color={"Complementary1.main"}
                              >
                                 Delivery state:
                              </Typography>
                              <Typography
                                 variant="h5"
                                 color={"Complementary1.main"}
                              >
                                 {orderDetails.status === 0
                                    ? "Pending"
                                    : "Shipped"}
                              </Typography>
                           </Box>
                        </Box>
                        <Box
                           sx={{
                              ...backgroundStyleInOrderPage,
                              padding: "2rem",
                              display: "flex",
                              flexDirection: "column",
                              gap: 1,
                           }}
                        >
                           <Box>
                              <Typography
                                 variant="h4"
                                 color={"Accent2.contrastText"}
                              >
                                 Delivery information
                              </Typography>
                              <Divider color="Complementary3" />
                           </Box>
                           <Box>
                              <Box
                                 display={"flex"}
                                 justifyContent={"space-between"}
                              >
                                 <Typography
                                    variant="h5"
                                    color={"Complementary1.main"}
                                 >
                                    Name:
                                 </Typography>
                                 <Typography
                                    variant="h5"
                                    color={"Complementary1.main"}
                                 >
                                    {orderDetails.name}
                                 </Typography>
                              </Box>
                              <Box
                                 display={"flex"}
                                 justifyContent={"space-between"}
                              >
                                 <Typography
                                    variant="h5"
                                    color={"Complementary1.main"}
                                 >
                                    Address:
                                 </Typography>
                                 <Typography
                                    variant="h5"
                                    color={"Complementary1.main"}
                                 >
                                    {orderDetails.address}
                                 </Typography>
                              </Box>
                              <Box
                                 display={"flex"}
                                 justifyContent={"space-between"}
                              >
                                 <Typography
                                    variant="h5"
                                    color={"Complementary1.main"}
                                 >
                                    Phone:
                                 </Typography>
                                 <Typography
                                    variant="h5"
                                    color={"Complementary1.main"}
                                 >
                                    {orderDetails.phone}
                                 </Typography>
                              </Box>
                           </Box>
                        </Box>
                     </Grid2>
                  </Grid2>
               </Box>
            </>
         ) : (
            ""
         )}
      </>
   );
}
