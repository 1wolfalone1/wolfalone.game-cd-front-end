import s from "./LoginContainer.module.scss";
import React, { useEffect, useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import layoutSlice from "../common/layout/layoutSlice";
import { motion } from "framer-motion";
import clsx from "clsx";
import { Button, FormHelperText, TextField } from "@mui/material";
import { style } from "../../style/custom/custom";
import ButtonGoogle from "../../component/button/buttonGoogle/ButtonGoogle";
import { Link } from "react-router-dom";
import { getData, getLogin } from "../../api/authenticationApi";
import { GoogleLogin, googleLogout, useGoogleLogin } from "@react-oauth/google";


export default function LoginContainer() {
   const login = useGoogleLogin({
      onSuccess: (response) => {
         console.log(response)
         handleGoogle(response)
      },
      onError: (error) => {
         console.log(error, "error message");
         
      },
   });
   const logOut = () => {
      googleLogout();
   };
 
   const dispatch = useDispatch();
   const animation = {
      initial: {
         opacity: 0,
      },
      animate: {
         opacity: 1,
         transition: {
            duration: 1,
         },
      },
   };
   useEffect(() => {
      const fetchGet = async () => {
         try {
            const response = await getData();
            console.log(response.data, 'dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
         } catch (error) {
            console.log(error, 'dataaaaaa');

         }
      };
      fetchGet();
   }, []);
   useLayoutEffect(() => {
      dispatch(layoutSlice.actions.updateLayout("loginLayout"));

      return () => {
         dispatch(layoutSlice.actions.updateLayout(""));
      };
   }, []);
   const handleGoogle = async (data) => {
      try {

         const response = await getLogin(data);
         console.log(response.data, "dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
      } catch (error) {
         console.error(error, "dataaaaaa");
      }
   };

   return (
      <motion.div
         variants={animation}
         initial={"initial"}
         animate="animate"
         className={clsx(s.loginForm)}
      >
         <div className={clsx(s.title)}>
            <span>Sign in</span>
         </div>
         <div className={clsx(s.input)}>
            <TextField
               id="filled-basic"
               label="Email"
               variant="filled"
               sx={{
                  width: "80%",
                  color: "warning",
                  input: {
                     color: style.color.$Complementary1,
                     fontSize: "2rem",
                     fontFamily: style.font.$Font2,
                  },
                  label: {
                     color: style.color.$Complementary3,
                     fontSize: "2rem",
                     fontFamily: style.font.$Font2,
                  },
               }}
            />
            <TextField
               id="filled-basic"
               label="Password"
               variant="filled"
               size="small"
               sx={{
                  width: "80%",
                  color: "warning",
                  input: {
                     color: style.color.$Complementary1,
                     fontSize: "2.4rem",
                     fontFamily: style.font.$Font2,
                  },
                  label: {
                     color: style.color.$Complementary3,
                     fontSize: "2rem",
                     fontFamily: style.font.$Font2,
                  },
                  // "& label.Mui-focused": {
                  //    transform: 'scale(0.4)',
                  //    left: '0.5rem'

                  // },
                  // "& label.Mui-active": {
                  //    transform: 'scale(0.4)',
                  //    left: '0.5rem'

                  // },
               }}
            />
            <Button
               variant="outlined"
               sx={{
                  width: "80%",
                  marginTop: "1rem",
                  marginBottom: "0",
                  button: {
                     color: style.color.$Complementary1,
                     fontSize: "4rem",
                     fontFamily: style.font.$Font1,
                  },
                  fontSize: "3rem",
               }}
            >
               Login
               {/* <GoogleLogin
                  onSuccess={responseMessage}
                  onError={errorMessage}
               ></GoogleLogin> */}
            </Button>
         </div>
         <div style={{ fontSize: "3rem", color: style.color.$Complementary2 }}>
            Or
         </div>
         <div>
            <ButtonGoogle
               content={"Sign in with Google"}
               onClick={login}
            />
         </div>
         <div className={clsx(s.isSignUP)}>
            <span>
               Don't have an account?{" "}
               <Link to="/signUp" style={{ color: style.color.$Accent1 }}>
                  Sign up
               </Link>
            </span>
         </div>
      </motion.div>
   );
}
