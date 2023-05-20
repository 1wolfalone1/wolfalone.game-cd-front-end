import clsx from "clsx";
import s from "./popupVerifyAccount.module.scss";
import React, { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import SendIcon from "@mui/icons-material/Send";
import Popup from "reactjs-popup";
import CancelPresentationSharpIcon from "@mui/icons-material/CancelPresentationSharp";
import { motion } from "framer-motion";
import {
   faCircleXmark,
   faLessThanEqual,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./popupVerifyAccount.scss";
import api from "../../../api/authenticationApi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import userInfoSlice from "../../../redux/global/userInfoSlice";
export default function PopupVerifyAccount({
   isEnable,
   setStatus,
   emailConfirm,
}) {
   const navigate = useNavigate();
   const [loading, setLoading] = useState(false);
   const [verifyCode, setVerifyCode] = useState("");
   const [helpText, setHelpText] = useState(
      "Enter verification code that will be send to your email"
   );
   const dispatch = useDispatch();
   const [error, setError] = useState(false);
   const handleClick = async () => {
      try {
         setLoading(true);
         console.log(emailConfirm, "sfdaasdf", verifyCode);
         const response = await api.get("/verifyEmail", {
            params: { email: emailConfirm, code: verifyCode },
         });
         console.log(response);
         setLoading(false);
         dispatch(
            userInfoSlice.actions.changeAuthentication({
               status: "user",
               info: {
                  ...response.data,
               },
            })
         );
         localStorage.setItem("user", JSON.stringify(response.data));
         navigate("/");
      } catch (err) {
         console.log(err, " poop up error");
         setLoading(false);
         setHelpText("Invalid verification code!");
         setError(true);
      }
   };
   const closeModal = () => {
      setStatus(false);
   };
   useEffect(() => {
      return () => {
         setStatus(false);
         setLoading(false);
      };
   }, []);
   const animate = {
      init: {
         opacity: 0,
         x: "-100%",
      },
      animation: {
         opacity: 1,
         x: 0,
         transition: {
            duration: 0.5,
         },
      },
   };
   return (
      <Popup
         position="right center"
         open={isEnable}
         closeOnDocumentClick={false}
         onClose={closeModal}
         className="prppp"
      >
         <motion.div variants={animate} initial="init" animate="animation">
            <div className={clsx(s.form)}>
               <FontAwesomeIcon
                  icon={faCircleXmark}
                  onClick={closeModal}
                  className={clsx(s.icon)}
               />
               <TextField
                  helperText={helpText}
                  id="Verifycation code"
                  label="Code"
                  size="Normal"
                  error={error}
                  variant="filled"
                  value={verifyCode}
                  onChange={(e) => {
                     setError(false);
                     setVerifyCode(e.target.value);
                  }}
                  sx={{
                     input: {
                        fontSize: "2.4rem",
                        color: "#faffb8",
                     },
                     label: {
                        fontSize: "2.4rem",
                     },
                  }}
                  FormHelperTextProps={{
                     style: {
                        fontSize: "1.6rem",
                        color: "#b3f5ba",
                        padding: "3px 0 10px 0",
                     },
                  }}
               />
               <LoadingButton
                  size="normal"
                  color="secondary"
                  onClick={handleClick}
                  loading={loading}
                  loadingPosition="end"
                  endIcon={<SendIcon />}
                  variant="outlined"
                  sx={{ fontSize: "2rem" }}
               >
                  Send
               </LoadingButton>
            </div>
         </motion.div>
      </Popup>
   );
}
