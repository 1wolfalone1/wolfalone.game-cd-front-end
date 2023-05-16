import React from "react";
import googleLogo from "../../../asset/img/Google svg.svg";
import clsx from "clsx";
import s from './ButtonGoole.module.scss'


export default function ButtonGoogle({ content, onClick }) {
   return (
      <div className={clsx(s.buttonContainer, s.ripple)} onClick={onClick}>
         <span>{content}</span>
         <img src={googleLogo} alt="" />
      </div>
   );
}
