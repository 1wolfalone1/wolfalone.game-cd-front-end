import s from "./RegistrationContainer.module.scss";
import React, { useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import layoutSlice from "../common/layout/layoutSlice";
import { motion } from "framer-motion";
import clsx from "clsx";
import { Button, TextField } from "@mui/material";
import { style } from "../../style/custom/custom";
import ButtonGoogle from "../../component/button/buttonGoogle/ButtonGoogle";
import { Link } from "react-router-dom";

export default function RegistrationContainer() {
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
   useLayoutEffect(() => {
      dispatch(layoutSlice.actions.updateLayout("signupLayout"));

      return () => {
         dispatch(layoutSlice.actions.updateLayout(""));
      };
   }, []);

   return (
      <motion.div
         variants={animation}
         initial={"initial"}
         animate="animate"
         className={clsx(s.loginForm)}
      >
         <div className={clsx(s.title)}>
            <span>Sign up</span>
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
                     fontSize: "1.6rem",
                  },
                  label: {
                     color: style.color.$Complementary3,
                     fontSize: "1.6rem",
                  },
               }}
            />
            <TextField
               id="filled-basic"
               label="Fullname"
               variant="filled"
               sx={{
                  width: "80%",
                  color: "warning",
                  input: {
                     color: style.color.$Complementary1,
                     fontSize: "1.6rem",
                  },
                  label: {
                     color: style.color.$Complementary3,
                     fontSize: "1.6rem",
                  },
               }}
            />
            <TextField
               id="filled-basic"
               label="Address"
               variant="filled"
               sx={{
                  width: "80%",
                  color: "warning",
                  input: {
                     color: style.color.$Complementary1,
                     fontSize: "1.6rem",
                  },
                  label: {
                     color: style.color.$Complementary3,
                     fontSize: "1.6rem",
                  },
               }}
            />
            <TextField
               id="filled-basic"
               label="Password"
               variant="filled"
               sx={{
                  width: "80%",
                  color: "warning",
                  input: {
                     color: style.color.$Complementary1,
                     fontSize: "1.6rem",
                  },
                  label: {
                     color: style.color.$Complementary3,
                     fontSize: "1.6rem",
                  },
               }}
            />
            <TextField
               id="filled-basic"
               label="Confirm password"
               variant="filled"
               helperText=''
               FormHelperTextProps={
                  {
                     style:{
                        fontSize: "1.6rem",
                        color: "red", 
                        marginLeft: '0px'
                     }
                  }
               }
               sx={{
                  width: "80%",
                  color: "warning",
                  input: {
                     color: style.color.$Complementary1,
                     fontSize: "1.6rem",
                  },
                  label: {
                     color: style.color.$Complementary3,
                     fontSize: "1.6rem",
                  },
                  helperText: {
                     fontSize: "1.6rem",
                  }
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
                  },
                  fontSize: "3rem",
               }}
            >
               Sign up
            </Button>
         </div>
         <div style={{ fontSize: "3rem", color: style.color.$Complementary2 }}>
            Or
         </div>
         <div>
            <ButtonGoogle content={"Sign up with Google"} />
         </div>
         <div className={clsx(s.isSignUP)}>
            <span>
             Already have account? <Link to='/login' style={
                  {color:  style.color.$Accent1} 
               }>Sign in</Link>
            </span>
         </div>
      </motion.div>
   );
}
