import clsx from "clsx";
import s from "./Footer.module.scss";
import GitHubIcon from "@mui/icons-material/GitHub";
import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { style } from "../../../style/custom/custom.jsx";
import logo from '../../../asset/img/xbox2.png'
export default function Footer() {
   console.log(style.$Complementary1);
   return (
      <div className={clsx(s.footerContainer)}>
         <div className={clsx(s.lisence)}>
            <span>&copy; Copyright 2023 GameCD_v2. Cao Nhat Thien</span>
         </div>
         <div className={clsx(s.contactUs)}>
            <span>Contact us</span>
            <div className={clsx(s.icon)}>
               <GitHubIcon
                  sx={{
                     color: style.color.$Complementary1,
                     fontSize: "5.7rem",
                  }}
               />
               <FacebookIcon
                  sx={{
                     color: style.color.$Complementary1,
                     fontSize: "5.727rem",
                  }}
               />
               <LinkedInIcon
                  sx={{
                     color: style.color.$Complementary1,
                     fontSize: "5.727rem",
                  }}
               />
            </div>
         </div>
         <div className={clsx(s.logo)}>
          <img src={logo}alt="" />
         </div>
      </div>
   );
}
