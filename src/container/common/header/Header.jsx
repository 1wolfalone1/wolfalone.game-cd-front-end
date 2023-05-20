import s from "./Header.module.scss";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import clsx from "clsx";
import Logo from "../../../asset/img/xbox1.png";
import ButtonHeader from "../../../component/button/ButtonHeader";
import avatar from "../../../asset/img/useravatar/1677772071906.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faA, faCaretDown, faGear } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import {
   infoUserSelector,
   statusSelector,
} from "../../../redux/global/userInfoSlice";
import { motion } from "framer-motion";

import { Link, useNavigate } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddAlt1OutlinedIcon from "@mui/icons-material/PersonAddAlt1Outlined";
import { style } from "../../../style/custom/custom";
import UserInfoDropDown from "../../../component/header/userInfoDropDown/UserInfoDropDown";
export default function Header() {
   const [isActive, setIsActive] = React.useState(false);
   const navigate = useNavigate();
   const user = useSelector(statusSelector);
   const userInfo = useSelector(infoUserSelector);
   const [name, setUserName] = useState("");

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
         <div className={s.logo}>
            <img src={Logo} alt="" />
         </div>
         <div className={clsx(s.navContainer)}>
            <ButtonHeader
               content="Home"
               active
               className="HeaderLink"
               onClick={pageNavigate("/")}
            />
            <ButtonHeader content="Market" className="HeaderLink" />
            <ButtonHeader content="Cart" className="HeaderLink" />
            {user === "user" ? (
               <ButtonHeader content="Orders" className="HeaderLink" />
            ) : (
               ""
            )}
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
               <div className={clsx(s.userAvatar)} onClick={() => setIsActive(false)}>
                     <img
                        src={userInfo.image}
                        alt=""
                        className={clsx(s.iconButton)}
                     />
                  </div>
                  <span className={clsx(s.userName)}>{name}</span>
                  <motion.div variants={iconRotateAnimation} animate="animate" style={{padding: '2rem'}}>
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
