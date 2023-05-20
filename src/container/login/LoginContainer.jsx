import s from "./LoginContainer.module.scss";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch } from "react-redux";
import layoutSlice from "../common/layout/layoutSlice";
import { motion } from "framer-motion";
import clsx from "clsx";
import { Button, FormHelperText, TextField } from "@mui/material";
import { style } from "../../style/custom/custom";
import ButtonGoogle from "../../component/button/buttonGoogle/ButtonGoogle";
import { Link, useNavigate } from "react-router-dom";
import { getData, getLogin } from "../../api/authenticationApi";
import { GoogleLogin, googleLogout, useGoogleLogin } from "@react-oauth/google";
import { useCookies } from "react-cookie";
import api from "../../api/authenticationApi";
import userInfoSlice from "../../redux/global/userInfoSlice";
import { red } from "@mui/material/colors";

export default function LoginContainer() {
   const [cookies, setCookie, removeCookie] = useCookies();
   const dispatch = useDispatch();
   const [loginStatus, setLoginStatus] = useState("");
   const [loginGoogleStatus, setLoginGoogleStatus] = useState(true);
   console.log(cookies);
   const [username, setUserName] = useState("");
   const [password, setPassword] = useState("");
   const navigate = useNavigate();
   const login = useGoogleLogin({
      onSuccess: (response) => {
         handleGoogle(response);
      },
      onError: (error) => {
         console.log(error, "error message");
         setLoginGoogleStatus(false);
      },
   });
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
   const handle200 = (response) => {
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
   };

   useLayoutEffect(() => {
      dispatch(layoutSlice.actions.updateLayout("loginLayout"));

      return () => {
         dispatch(layoutSlice.actions.updateLayout(""));
      };
   }, []);
   const handleGoogle = async (data) => {
      try {
         const response = await api.post("/oauth2/google", data);
         console.log(response);
         if (response.status === 200) {
            handle200(response)
         }
      } catch (error) {
         console.error(error, "dataaaaaa");
         setLoginGoogleStatus(false);
      }
   };
   const handleLoginUsername = async () => {
      try {
         const response = await api.post("/auth/login", {
            email: username,
            token: password,
         });
         console.log(response, '111111111');
         if (response.status === 200) {
            handle200(response)
         } 
      } catch (error) {
         const response = error.response;
         if(response.status ===406){
            setLoginStatus("Invalid username or password!!! Try again.")
         } else {
            setLoginStatus("Something wrong!!! Try again.")
         }
         
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
               onChange={(e) => {
                  setUserName(e.target.value);
               }}
               onFocus={() => setLoginStatus('')}
               value={username}
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
               type="password"
               onChange={(e) => {
                  setPassword(e.target.value);
               }}
               onFocus={() => setLoginStatus('')}
               value={password}
               helperText={loginStatus}
               FormHelperTextProps={
                  {
                     style:{
                        fontSize: "1.6rem",
                        color: "#ffac5f", 
                        marginLeft: '0px'
                     }
                  }
               }
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
               onClick={() => {
                  handleLoginUsername();
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
            <ButtonGoogle content={"Sign in with Google"} onClick={login} />
            <div className={clsx(s.helpGooleText)}>
               {loginGoogleStatus ? (
                  ""
               ) : (
                  <span>Sign in by Google failed! Try again</span>
               )}
            </div>
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
