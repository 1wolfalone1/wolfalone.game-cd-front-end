import { Outlet } from "react-router-dom";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import "./layout.scss";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { statusLayoutSelector } from "./layoutSlice";
import { useEffect, useLayoutEffect } from "react";
import { motion } from "framer-motion";

const Layout = ({ children }) => {
   const animation = {
      initial: {
         opacity: 0,
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
         <header>
            <Header />
         </header>
         <motion.div
            variants={animation}
            initial="initial"
            animate="animate"
            className={clsx("content", layoutState)}
         >
            <div className="content-space"></div>
            <Outlet layoutState={layoutState}/>
         </motion.div>
         <footer>
            <Footer />
         </footer>
      </>
   );
};

export default Layout;
