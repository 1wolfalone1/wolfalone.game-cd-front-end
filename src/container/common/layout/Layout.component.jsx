import { Outlet } from "react-router-dom";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import "./layout.scss";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { statusLayoutSelector } from "./layoutSlice";
import { useEffect, useLayoutEffect } from "react";
import { motion } from "framer-motion";
import { Backdrop, CircularProgress, ThemeProvider } from "@mui/material";
import { theme } from "../../../config/theme";
import { globalSliceSelector } from "../../../redux/global/globalSlice";

const Layout = ({ children }) => {
   const {openBackdrop} = useSelector(globalSliceSelector);
   console.log(openBackdrop, 'backdasdfasdfasdfasdfasdfasfdasdfrop');
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
         </ThemeProvider>
      </>
   );
};

export default Layout;
