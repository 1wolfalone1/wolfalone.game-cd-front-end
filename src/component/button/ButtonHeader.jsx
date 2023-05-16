import clsx from "clsx";
import React, { useState } from "react";
import s from "./ButtonHeader.module.scss";
export default function ButtonHeader({
   className,
   content,
   active,
   focus,
   hover,
   click,
   onClick,
   children,
}) {
   return (
      <button
         onClick={onClick}
         className={clsx(s[`${className}`], 'ripple', {
            [s.active]: active,
            [s.focus]: focus,
            [s.hover]: hover,
            [s.click]: onClick,
         })}
      >
         <span>{content}</span>
         <div className={clsx(s.icon)}>{children}</div>
      </button>
   );
}
