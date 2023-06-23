import s from "./Header.module.scss";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import clsx from "clsx";
import Logo from "../../../asset/img/xbox1.png";
import ButtonHeader from "../../../component/button/ButtonHeader";
import avatar from "../../../asset/img/useravatar/1677772071906.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faA, faCaretDown, faGear } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import {
   infoUserSelector,
   statusSelector,
} from "../../../redux/global/userInfoSlice";
import { motion } from "framer-motion";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import StoreOutlinedIcon from "@mui/icons-material/StoreOutlined";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddAlt1OutlinedIcon from "@mui/icons-material/PersonAddAlt1Outlined";
import { style } from "../../../style/custom/custom";
import UserInfoDropDown from "../../../component/header/userInfoDropDown/UserInfoDropDown";
import { Badge, Box, Tab, Tabs, Typography } from "@mui/material";
import { cartSliceSelector } from "../../../redux/global/cartSlice";
import globalSlice, { globalSliceSelector } from "../../../redux/global/globalSlice";

const iconStyle = {
   fontSize: "2.4rem",
};
const boxStyle = { display: "flex", alignItems: "center", gap: "0.4rem" };
export default function Header() {
   const {navActive} = useSelector(globalSliceSelector);
   const { items } = useSelector(cartSliceSelector);
   const [isActive, setIsActive] = React.useState(false);
   const navigate = useNavigate();
   const user = useSelector(statusSelector);
   const userInfo = useSelector(infoUserSelector);
   const [name, setUserName] = useState("");
   const [value, setValue] = React.useState("1");
  
   const handleChange = (event, newValue) => {
      setValue(newValue);
   };
   useEffect(() => {
      if (userInfo) {
         setUserName(userInfo.name);
         console.log(name);
         console.log(userInfo, "userinfo");
      }
   }, [userInfo]);
   const pageNavigate = (page) => {
      return () => {
         navigate(page);
      };
   };
   const iconRotateAnimation = {
      animate: {
         rotateZ: isActive ? 180 : 0,
         transition: {
            duration: 0.2,
            type: "spring",
         },
      },
   };
   const ref = useRef();
   const refUserInfo = useRef();
   const handleClickOutsideDropDown = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
         setIsActive(false);
      } else if (
         refUserInfo.current &&
         refUserInfo.current.contains(e.target)
      ) {
         setIsActive(!isActive);
      } else {
         setIsActive(false);
      }
   };

   useEffect(() => {
      document.addEventListener("click", handleClickOutsideDropDown);
      return () => {
         document.removeEventListener("click", handleClickOutsideDropDown);
      };
   }, []);
   return (
      <div className={clsx(s.header)}>
         <div style={{ display: "flex", alignItems: "center", gap: "10rem" }}>
            <div className={s.logo}>
               <img src={Logo} alt="" />
            </div>
            <Tabs
               value={`${navActive}`}
               onChange={handleChange}
               color="Complementary2"
               aria-label="secondary tabs example"
               className={clsx(s.tabs)}
               TabIndicatorProps={{
                  sx: {
                     backgroundColor: style.color.$Accent1,
                  },
               }}
            >
               <Tab
                  label={
                     <Box sx={boxStyle}>
                        Home <HomeOutlinedIcon sx={iconStyle} />
                     </Box>
                  }
                  className="HeaderLink"
                  value="1"
                  onClick={pageNavigate("/")}
               />
               <Tab
                  className="HeaderLink"
                  value="2"
                  label={
                     <Box sx={boxStyle}>
                        Market <StoreOutlinedIcon sx={iconStyle} />
                     </Box>
                  }
                  onClick={() => navigate("/games")}
               />
               <Tab
                  className="HeaderLink"
                  value="3"
                  onClick={()=> navigate('/cart')}
                  label={
                     <Box sx={boxStyle}>
                        Cart
                        <Badge
                           badgeContent={items?.length}
                           color="secondary"
                           sx={{
                              "& .MuiBadge-badge": {
                                 fontSize: 12,
                                 height: 20,
                                 minWidth: 20,
                              },
                           }}
                        >
                           <ShoppingCartOutlinedIcon sx={iconStyle} />
                        </Badge>
                     </Box>
                  }
               />
               {user === "user" ? (
                  <Tab
                     content="Orders"
                     className="HeaderLink"
                     value="4"
                     label={
                        <Box sx={boxStyle}>
                           Orders <ListAltOutlinedIcon sx={iconStyle} />
                        </Box>
                     }
                  />
               ) : (
                  ""
               )}
               <Tab className={s.tabnone} value="5" label="" />
            </Tabs>
         </div>
         {user === "guest" ? (
            <div className={clsx(s.rightNav)}>
               <ButtonHeader
                  content="Sign in"
                  className="headerButton"
                  onClick={pageNavigate("/login")}
               >
                  <LoginIcon
                     sx={{
                        fontSize: "3.2rem",
                        color: style.color.$Complementary1,
                     }}
                  />
               </ButtonHeader>
               <ButtonHeader
                  content="Sign up"
                  className="headerButton"
                  onClick={pageNavigate("/signup")}
               >
                  <PersonAddAlt1OutlinedIcon
                     sx={{
                        fontSize: "3.2rem",
                        color: style.color.$Complementary1,
                     }}
                  />
               </ButtonHeader>
            </div>
         ) : (
            <div className={clsx(s.userInfoContainer)} ref={refUserInfo}>
               <div className={clsx(s.userInfo)}>
                  <div
                     className={clsx(s.userAvatar)}
                     onClick={() => setIsActive(false)}
                  >
                     <img
                        src={userInfo.image}
                        alt=""
                        className={clsx(s.iconButton)}
                     />
                  </div>
                  <span className={clsx(s.userName)}>{name}</span>
                  <motion.div
                     variants={iconRotateAnimation}
                     animate="animate"
                     style={{ padding: "2rem" }}
                  >
                     <FontAwesomeIcon
                        icon={faGear}
                        className={clsx(s.iconDown)}
                     />
                  </motion.div>
               </div>
               <UserInfoDropDown isActive={isActive} refne={ref} />
            </div>
         )}
      </div>
   );
}
