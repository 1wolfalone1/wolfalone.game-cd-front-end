import { Avatar, Box, Button, TextField, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import userInfoSlice, { infoUserSelector } from "../../redux/global/userInfoSlice";
import * as yup from "yup";
import { useFormik } from "formik";
import { style } from "../../style/custom/custom";
import { dataAsyncUrlToFile, objectToBlob } from "../../utils/myUrils";
import { apid } from "../../api/API";
import globalSlice from "../../redux/global/globalSlice";
import { v4 } from "uuid";
const validationSchema = yup.object({
   email: yup
      .string("")
      .email("Enter a valid email address!")
      .required("Email is required!"),
   name: yup.string("").required("Name is required!"),
   phone: yup
      .string("")
      .min(8, "Phone length should be mininum 8 number!")
      .max(12, "Phone length should be maxinum 12 number!")
});
export default function UserProfile() {
   const user = useSelector(infoUserSelector);
   const [isEdit, setIsEdit] = useState(false);
   const hiddenFileInput = useRef(null);
   const [avatar, setAvatar] = useState();
   const dispatch = useDispatch();
   console.log(user);
   const form = useFormik({
      initialValues: {
         email: user?.email,
         name: user?.name,
         address: user?.phone,
         phone: user?.address,
      },
      initialErrors: {
         email: "",
         name: "",
         address: "",
         phone: "",
      },
      validationSchema: validationSchema,
      validateOnChange: true,
      validateOnBlur: true,
      onSubmit: async ()=> {
         console.log(form);
         const formData = new FormData();
         const fileImage = await dataAsyncUrlToFile(avatar, `${v4()}`);
         formData.append('data', objectToBlob(form.values));
         formData.append('image', fileImage);
         try {
            const res = await apid.put('/users', formData, {
               headers: {
                  "Content-type": "multipart/form-data",
               },
            })
            const data = await res.data;
            setIsEdit(false);
            
            dispatch(globalSlice.actions.changeSnackBarState({
               open: true,
               title: "Success",
               message: "Update profile successfully",
               typeStatus: "success"
            }))
            dispatch(userInfoSlice.actions.changeAuthentication({
               status: 'user',
               info: data
            }))
            console.log(data, fileImage);
         } catch (e) {
            dispatch(globalSlice.actions.changeSnackBarState({
               open: true,
               title: "Error",
               message: "Update profile failure!",
               typeStatus: "error"
            }))
            console.log(e);
         }
      }
   });
   const onInputAvatarChange = (e) => {
      e.preventDefault();
      let files;
      if (e.dataTransfer) {
         files = e.dataTransfer.files;
      } else if (e.target) {
         files = e.target.files;
      }
      const reader = new FileReader();
      reader.onload = () => {
         setAvatar(reader.result);
      };
      if (files[0]) {
         reader?.readAsDataURL(files[0]);
      } else {
      }
   };
   const handleClickInputRef = (event) => {
      hiddenFileInput.current.click();
   };

   const handleCancelSaveProfile = () => {
      setIsEdit(false);
   };
   return (
      <Box
         sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
         <Box
            sx={{
               display: "flex",
               justifyContent: "center",
               marginBottom: "3rem",
            }}
         >
            <Typography variant="h3" color="Complementary1.main">
               Your profile
            </Typography>
         </Box>
         <Grid2 container spacing={10} width={"90%"}>
            <Grid2
               xs={6}
               sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "end",
               }}
            >
               <Box
                  sx={{
                     width: "30rem",
                     height: "30rem",
                     display: "flex",
                     flexDirection: "column",
                     alignItems: "center",
                     gap: "5rem",
                  }}
               >
                  <Avatar
                     alt="Cindy Baker"
                     src={avatar ? avatar : user.image}
                     sx={{ width: "100%", height: "100%" }}
                  />
                  {isEdit && (
                     <>
                        <Button
                           variant="outlined"
                           sx={{ fontSize: "3rem" }}
                           onClick={handleClickInputRef}
                        >
                           Change avatar
                           <input
                              type="file"
                              ref={hiddenFileInput}
                              style={{ display: "none" }}
                              onChange={onInputAvatarChange}
                              accept="image/*"
                           />
                        </Button>
                     </>
                  )}
               </Box>
            </Grid2>
            <Grid2 xs={6}>
               <form
                  onSubmit={form.handleSubmit}
                  style={{
                     display: "flex",
                     flexDirection: "column",
                     gap: "1rem",
                     padding: "5rem 3rem",
                     background: "rgba(44, 44, 44, 0.69)",
                     borderRadius: "16px",
                     boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                     backdropFilter: "blur(11.4px)",
                     WebkitBackdropFilter: "blur(11.4px)",
                     border: "1px solid rgba(44, 44, 44, 0.59)",
                  }}
               >
                  <TextField
                     id="email"
                     name="email"
                     label="Email"
                     disabled={true}
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
                     fullWidth
                     sx={{
                        color: "warning",
                        input: {
                           color: style.color.$Complementary1,
                           fontSize: "1.6rem",
                        },
                        "& .MuiInputBase-input.Mui-disabled": {
                           WebkitTextFillColor: '#becda9'
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
                     label="Name"
                     variant="filled"
                     disabled={!isEdit}
                     value={form.values.name}
                     onChange={form.handleChange}
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
                     fullWidth
                     sx={{
                        color: "warning",
                        input: {
                           color: style.color.$Complementary1,
                           fontSize: "1.6rem",
                        },
                        "& .MuiInputBase-input.Mui-disabled": {
                           WebkitTextFillColor: '#becda9'
                        },
                        label: {
                           color: style.color.$Complementary3,
                           fontSize: "1.6rem",
                        },
                     }}
                  />
                  <TextField
                     id="phone"
                     name="phone"
                     label="Phone"
                     variant="filled"
                     disabled={!isEdit}
                     value={form.values.phone}
                     onChange={form.handleChange}
                     onBlur={form.handleBlur}
                     error={form.touched.phone && Boolean(form.errors.phone)}
                     helperText={form.touched.phone && form.errors.phone}
                     FormHelperTextProps={{
                        style: {
                           fontSize: "1.6rem",
                           color: "red",
                           marginLeft: "0px",
                        },
                     }}
                     fullWidth
                     sx={{
                        color: "warning",
                        input: {
                           color: style.color.$Complementary1,
                           fontSize: "1.6rem",
                        },
                        "& .MuiInputBase-input.Mui-disabled": {
                           WebkitTextFillColor: '#becda9'
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
                     label="address"
                     variant="filled"
                     disabled={!isEdit}
                     value={form.values.address}
                     onChange={form.handleChange}
                     onBlur={form.handleBlur}
                     error={
                        form.touched.address && Boolean(form.errors.address)
                     }
                     helperText={form.touched.address && form.errors.address}
                     FormHelperTextProps={{
                        style: {
                           fontSize: "1.6rem",
                           color: "red",
                           marginLeft: "0px",
                        },
                     }}
                     fullWidth
                     sx={{
                        color: "warning",
                        input: {
                           color: style.color.$Complementary1,
                           fontSize: "1.6rem",
                        },
                        "& .MuiInputBase-input.Mui-disabled": {
                           WebkitTextFillColor: '#becda9'
                        },
                        label: {
                           color: style.color.$Complementary3,
                           fontSize: "1.6rem",
                        },
                     }}
                  />
                  <Box
                     sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: 1,
                     }}
                  >
                     {isEdit ? (
                        <>
                           <Button
                              variant="outlined"
                              onClick={handleCancelSaveProfile}
                           >
                              Cancel
                           </Button>
                           <Button
                              variant="outlined"
                              type="submit"
                           >
                              Save
                           </Button>
                        </>
                     ) : (
                        <>
                           <Button
                              variant="outlined"
                              onClick={() => setIsEdit(true)}
                           >
                              Edit profile
                           </Button>
                        </>
                     )}
                  </Box>
               </form>
            </Grid2>
         </Grid2>
      </Box>
   );
}
