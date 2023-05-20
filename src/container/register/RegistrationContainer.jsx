import s from "./RegistrationContainer.module.scss";
import React, { useLayoutEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import layoutSlice from "../common/layout/layoutSlice";
import { motion } from "framer-motion";
import clsx from "clsx";
import { Button, TextField } from "@mui/material";
import { style } from "../../style/custom/custom";
import ButtonGoogle from "../../component/button/buttonGoogle/ButtonGoogle";
import { Link, useNavigate } from "react-router-dom";
import userInfoSlice from "../../redux/global/userInfoSlice";
import { useGoogleLogin } from "@react-oauth/google";
import api from "../../api/authenticationApi";
import { Formik, useFormik } from "formik";
import * as yup from "yup";
import PopupVerifyAccount from "./popup/PopupVerifyAccount";
import "./popup/popupVerifyAccount.scss";
import { LoadingButton } from "@mui/lab";

const validationSchema = yup.object({
   email: yup
      .string("")
      .email("Enter a valid email address!")
      .required("Email is required!"),
   name: yup.string("").required("Name is required!"),
   address: yup.string("").required("Address is required!"),
   phone: yup
      .string("")
      .min(8, "Phone length should be mininum 8 number!")
      .max(12, "Phone length should be maxinum 12 number!")
      .required("Phone is required!"),
   password: yup.string("").required("Password is required!"),
   confirmPassword: yup
      .string()
      .test("passwords-match", "", function (value) {
         return this.parent.password === value;
      })
      .required("Confirm password is required!"),
   matchPassword: yup.string(),
});

export default function RegistrationContainer() {
   const [isMatchPassword, setIsMatchPassword] = useState(false);
   const [loginGoogleStatus, setLoginGoogleStatus] = useState(true);
   const [isVerifyProcess, setIsVerifyProcess] = useState(false);
   const [loading, setLoading] = useState(false);
   const [emailConfirm, setEmailConfirm] = useState("");
   const form = useFormik({
      initialValues: {
         email: "",
         name: "",
         address: "",
         phone: "",
         password: "",
         confirmPassword: "",
         matchPassword: "",
      },
      initialErrors: {
         email: "",
         name: "",
         address: "",
         phone: "",
         password: "",
         confirmPassword: "",
         matchPassword: "",
      },
      validationSchema: validationSchema,
      validateOnChange: true,
      validateOnBlur: true,
   });

   const navigate = useNavigate();
   const login = useGoogleLogin({
      onSuccess: (response) => {
         handleGoogle(response);
      },
      onError: (error) => {
         setLoginGoogleStatus(false);
      },
   });
   const handleSubmit = async () => {
      const e = await form.validateForm(form.values);
      form.setTouched(
         {
            email: true,
            name: true,
            address: true,
            phone: true,
            password: true,
            confirmPassword: true,
         },
         false
      );
      if (form.values.password !== form.values.confirmPassword) {
         form.setErrors({
            ...e,
            confirmPassword: "Confirm password not match!",
         });
      } else {
         form.setErrors({
            ...e,
         });
      }
      if (form.isValid) {
         console.log(form.values);
         postRegister(form.values);
      }
   };
   const postRegister = async (values) => {
      try {
         setLoading(true);
         const response = await api.post("/registration", values);
         setLoading(false);
         console.log(response.data, "emialllllllllllllllllll");
         setEmailConfirm(response.data);
         setIsVerifyProcess(true);
      } catch (e) {
         if(e.response.status === 406) {
            console.log(e, 406);
            form.setErrors({...form.errors, email: "Email already exists!"})
         }
      }
   };
   const handleGoogle = async (data) => {
      try {
         const response = await api.post("/oauth2/google", data);
         if (response.status === 200) {
            handle200(response);
         }
      } catch (error) {
         setLoginGoogleStatus(false);
      }
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
         className={clsx(s.loginForm, "popupVerifyAccount")}
      >
         <div className={clsx(s.title)}>
            <span>Sign up</span>
         </div>

         <form
            className={clsx(s.input)}
            onSubmit={(e) => {
               e.preventDefault();
            }}
         >
            <TextField
               id="email"
               name="email"
               label="Email"
               variant="filled"
               value={form.values.email}
               onChange={form.handleChange}
               onBlur={form.handleBlur}
               error={form.touched.email && Boolean(form.errors.email)}
               helperText={form.touched.email && form.errors.email}
               FormHelperTextProps={{
                  style: {
                     fontSize: "1.6rem",
                     color: "red",
                     marginLeft: "0px",
                  },
               }}
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
               id="name"
               name="name"
               label="Fullname"
               variant="filled"
               onChange={form.handleChange}
               value={form.values.name}
               onBlur={form.handleBlur}
               error={form.touched.name && Boolean(form.errors.name)}
               helperText={form.touched.name && form.errors.name}
               FormHelperTextProps={{
                  style: {
                     fontSize: "1.6rem",
                     color: "red",
                     marginLeft: "0px",
                  },
               }}
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
               id="address"
               name="address"
               label="Address"
               variant="filled"
               onChange={form.handleChange}
               onBlur={form.handleBlur}
               value={form.values.address}
               error={form.touched.address && Boolean(form.errors.address)}
               helperText={form.touched.address && form.errors.address}
               FormHelperTextProps={{
                  style: {
                     fontSize: "1.6rem",
                     color: "red",
                     marginLeft: "0px",
                  },
               }}
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
               id="phone"
               label="Phone"
               variant="filled"
               onChange={form.handleChange}
               onBlur={form.handleBlur}
               value={form.values.phone}
               error={form.touched.phone && Boolean(form.errors.phone)}
               helperText={form.touched.phone && form.errors.phone}
               FormHelperTextProps={{
                  style: {
                     fontSize: "1.6rem",
                     color: "red",
                     marginLeft: "0px",
                  },
               }}
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
               id="password"
               label="Password"
               type="password"
               variant="filled"
               onChange={form.handleChange}
               onBlur={form.handleBlur}
               value={form.values.password}
               error={form.touched.password && Boolean(form.errors.password)}
               helperText={form.touched.password && form.errors.password}
               FormHelperTextProps={{
                  style: {
                     fontSize: "1.6rem",
                     color: "red",
                     marginLeft: "0px",
                  },
               }}
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
               id="confirmPassword"
               name="confirmPassword"
               label="Confirm password"
               type="password"
               variant="filled"
               onChange={(e) => {
                  form.setFieldValue("confirmPassword", e.target.value);
               }}
               value={form.values.confirmPassword}
               error={
                  form.touched.confirmPassword &&
                  Boolean(
                     form.errors.confirmPassword || form.errors.matchPassword
                  )
               }
               helperText={
                  form.touched.confirmPassword &&
                  (form.errors.confirmPassword || form.errors.matchPassword)
               }
               FormHelperTextProps={{
                  style: {
                     fontSize: "1.6rem",
                     color: "red",
                     marginLeft: "0px",
                  },
               }}
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
                  },
               }}
            />
            <LoadingButton
               variant="outlined"
               sx={{
                  width: "80%",
                  marginTop: "1rem",
                  marginBottom: "0",
                  button: {
                     color: style.color.$Complementary1,
                     fontSize: "3.2rem",
                  },
                  fontSize: "2.4rem",
               }}
               loading={loading}
               type="button"
               onClick={handleSubmit}
            >
               Sign up
            </LoadingButton>
         </form>

         <div style={{ fontSize: "3rem", color: style.color.$Complementary2 }}>
            Or
         </div>
         <div>
            <ButtonGoogle content={"Sign up with Google"} onClick={login} />
         </div>
         <div className={clsx(s.isSignUP)}>
            <span>
               Already have account?{" "}
               <Link to="/login" style={{ color: style.color.$Accent1 }}>
                  Sign in
               </Link>
            </span>
         </div>
         <PopupVerifyAccount
            isEnable={isVerifyProcess}
            setStatus={setIsVerifyProcess}
            emailConfirm={emailConfirm}
         />
      </motion.div>
   );
}
