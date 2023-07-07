import { Outlet } from "react-router-dom";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import "./layout.scss";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { statusLayoutSelector } from "./layoutSlice";
import { useEffect, useLayoutEffect } from "react";
import { motion } from "framer-motion";
import {
   Alert,
   AlertTitle,
   Backdrop,
   CircularProgress,
   Collapse,
   Snackbar,
   ThemeProvider,
} from "@mui/material";
import { theme } from "../../../config/theme";
import globalSlice, {
   globalSliceSelector,
} from "../../../redux/global/globalSlice";

const Layout = ({ children }) => {
   const { openBackdrop } = useSelector(globalSliceSelector);
   const { snackBar } = useSelector(globalSliceSelector);
   const dispatch = useDispatch();
   const animation = {
      initial: {
         opacity: 0.5,
      },
      animate: {
         opacity: 1,
         transition: {
            duration: 2,
         },
      },
   };
   const layoutState = useSelector(statusLayoutSelector);
   useLayoutEffect(() => {}, []);
   return (
      <>
         <ThemeProvider theme={theme}>
            <Backdrop
               sx={{
                  color: "#fff",
                  zIndex: (theme) => theme.zIndex.drawer + 1,
               }}
               open={openBackdrop}
            >
               <CircularProgress color="inherit" />
            </Backdrop>
            <motion.div
               variants={animation}
               initial="initial"
               animate="animate"
            >
               <header>
                  <Header />
               </header>
               <div className={clsx("content", layoutState)}>
                  <div className="content-space"></div>
                  <Outlet layoutState={layoutState} />
               </div>
               <footer>
                  <Footer />
               </footer>
            </motion.div>
            <Snackbar
               open={snackBar?.open}
               autoHideDuration={3000}
               onClose={() =>
                  dispatch(
                     globalSlice.actions.changeSnackBarState({ open: false })
                  )
               }
               anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
               <Collapse in={snackBar?.open}>
                  <Alert
                     onClose={() =>
                        dispatch(
                           globalSlice.actions.changeSnackBarState({
                              open: false,
                           })
                        )
                     }
                     severity={snackBar.typeStatus}
                     variant="filled"
                  >
                     <AlertTitle>{snackBar.title}</AlertTitle>
                     {snackBar.message}
                  </Alert>
               </Collapse>
            </Snackbar>
         </ThemeProvider>
      </>
   );
};

export default Layout;
