import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import s from "./userInfoDropDown.module.scss";
import React, { useRef, useEffect } from "react";
import {
   faAddressCard,
   faArrowRightFromBracket,
   faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import useId from "@mui/material/utils/useId";
import { useDispatch } from "react-redux";
import userInfoSlice from "../../../redux/global/userInfoSlice";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

export default function UserInfoDropDown({ isActive, refne }) {
   const id = useId();
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const dropdownAnimation = {
      initial: {
         x: "100%",
         opacity: 0,
      },
      animate: {
         x: "0",
         transition: {
            type: "spring",
            duration: 0.2,
         },
         opacity: 1,
      },
      exit: {
         x: "100%",
         opacity: 0,
         transition: {
            type: "tween",
            duration: 0.2,
         },
      },
   };

   const handleLogout = async () => {
      localStorage.removeItem('user')
      dispatch(userInfoSlice.actions.changeAuthentication({
         status: "guest",
         info: {
         }
      }))
   }
   console.log(isActive, "activeeeeeeeeeeeeeeeeeeee");
   return (
      <AnimatePresence>
         {isActive ? (
            <motion.div
               variants={dropdownAnimation}
               initial="initial"
               animate="animate"
               exit="exit"
               className={clsx(s.container)}
               key={id}
            >
               <div className={clsx(s.space)}></div>
               <div className={clsx(s.content)} ref={refne}>
                  <Button className={clsx(s.item)} fullWidth>
                     <span>Notification</span>
                     <FontAwesomeIcon
                        icon={faEnvelope}
                        className={clsx(s.icon)}
                     />
                  </Button>
                  <Button className={clsx(s.item)} onClick={() => navigate('/profile')} fullWidth>
                     <span>Profile</span>
                     <FontAwesomeIcon
                        icon={faAddressCard}
                        className={clsx(s.icon)}
                     />
                  </Button>
                  <Button className={clsx(s.item)} onClick={() => {handleLogout()}} fullWidth>
                     <span>Log out</span>
                     <FontAwesomeIcon
                        icon={faArrowRightFromBracket}
                        className={clsx(s.icon)}
                     />
                  </Button>
               </div>
            </motion.div>
         ) : (
            ""
         )}
      </AnimatePresence>
   );
}
