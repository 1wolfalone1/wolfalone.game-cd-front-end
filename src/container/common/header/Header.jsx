import s from "./Header.module.scss";
import React from "react";
import clsx from "clsx";
import Logo from "../../../asset/img/xbox1.png";
import ButtonHeader from "../../../component/button/ButtonHeader";
import avatar from "../../../asset/img/useravatar/1677772071906.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faA, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { statusSelector } from "../../../redux/global/userInfoSlice";
import { Link, useNavigate } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddAlt1OutlinedIcon from "@mui/icons-material/PersonAddAlt1Outlined";
import { style } from "../../../style/custom/custom";
export default function Header() {
   const navigate = useNavigate();
   const user = useSelector(statusSelector);
   console.log(user);

   const pageNavigate = (page) => {
      return () => {
         navigate(page);
      };
   };
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
            <div className={clsx(s.userInfo)}>
               <FontAwesomeIcon
                  icon={faCaretDown}
                  className={clsx(s.iconDown)}
               />
               <span className={clsx(s.userName)}>Cao Nhat Thien</span>
               <div className={clsx(s.userAvatar)}>
                  <img src={avatar} alt="" className={clsx(s.iconButton)} />
               </div>
            </div>
         )}
      </div>
   );
}
