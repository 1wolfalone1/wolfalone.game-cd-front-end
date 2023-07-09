import {
   Autocomplete,
   Box,
   Button,
   Checkbox,
   FormHelperText,
   InputAdornment,
   TextField,
   Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import adminCreateGameSlice, {
   adminCreateGameSelector,
   getGameForAdminUpdate,
} from "../../redux/global/adminCreateGame";
import AdminImageController from "../../component/admin-image-controller/AdminImageController";
import { apid } from "../../api/API";
import * as yup from "yup";
import { useFormik } from "formik";
import FieldCustomCreateGame from "../../component/field-custom-create-game/FieldCustomCreateGame";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { theme } from "../../config/theme";
import { objectToBlob } from "../../utils/myUrils";
import globalSlice from "../../redux/global/globalSlice";
import { useNavigate, useParams } from "react-router-dom";

const QuillWrapper = ({ field, form, ...props }) => {
   const { name } = field;
   const { setFieldValue } = form;
   const { value } = field;
   const handleChange = (content) => {
      setFieldValue(name, content);
   };
   return (
      <ReactQuill
         style={{
            backgroundColor: theme.palette.Complementary3.main,
            color: theme.palette.Accent1.contrastText,
         }}
         {...props}
         value={value}
         onChange={handleChange}
         onBlur={() => form.setFieldTouched(name, true)}
      />
   );
};

const validationSchema = yup.object({
   name: yup.string("").required("Name is required!"),
   category: yup.array().min(1, "Please select at least one type"),
   price: yup
      .number()
      .typeError("Invalid price!")
      .min(0, "Price must be between 0 and 100000")
      .max(100000, "Price must be between 0 and 100000")
      .required("Price is required!"),
   quantity: yup
      .number("")
      .typeError("Invalid quantity!")
      .integer()
      .min(0, "Price must be between 0 and 10000")
      .max(10000, "Price must be between 0 and 10000")
      .required("Quantity is required!"),
   description: yup
      .string()
      .min(100, "Description must be at least 100 characters long")
      .required("Description is required!"),
});
export default function AdminCreateGame() {
   const { listImage, formData, mode } = useSelector(adminCreateGameSelector);
   const [listType, setListType] = useState([]);
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const [initialValue, setInitialValue] = useState({
      name: "",
      category: [],
      description: "",
      price: 0,
      quantity: 0,
   });
   const params = useParams();
   const form = useFormik({
      initialValues: initialValue,
      validationSchema: validationSchema,
      validateOnChange: true,
      validateOnBlur: true,
      onSubmit: async () => {
         if (listImage.length === 0) {
            console.log(listImage, form.values, "erorrrrr");
         } else {
            if (mode === "create") {
               console.log(listImage, form.values, "okkkkkkkkkkk");
               const formData = new FormData();
               const listCategory = form.values.category.map((c) => c.id);
               const newFormData = {
                  ...form.values,
                  category: listCategory,
               };
               console.log(newFormData);
               listImage.forEach((element) => {
                  formData.append("image", element.file);
               });
               formData.append("data", objectToBlob(newFormData));
               handleSubmit(formData);
            } else {
               const formData = new FormData();
               const listCategory = form.values.category.map((c) => c.id);
               const oldImagesObject = listImage.filter((image) => {
                  return !image.file;
               });
               const oldImages = oldImagesObject.map((image) => image.id);
               const newFormData = {
                  ...form.values,
                  category: listCategory,
                  oldImages,
               };
               console.log(newFormData);
               formData.append("data", objectToBlob(newFormData));
               const newImages = listImage.filter((image) => image.file);
               if (newImages) {
                  console.log(newImages, 'newImages ')
                  newImages.forEach((element) => {
                     console.log(element);
                     formData.append("images", element.file);
                  });
               }
               handleUpdate(formData);
            }
         }
      },
   });
   useEffect(() => {
      if (params.id) {
         dispatch(getGameForAdminUpdate(params.id));
      }
   }, []);
   useEffect(() => {
      if (mode === "update") {
         form.setValues(formData);
      }
   }, [formData]);
   useEffect(() => {
      getListType();
      return () => {
         dispatch(adminCreateGameSlice.actions.resetState());
      };
   }, []);
   const getListType = async () => {
      try {
         const res = await apid.get("/category");
         const data = await res.data;
         console.log(data, "category asdfasfasd fasd");
         setListType(data);
      } catch (err) {
         console.error(err);
      }
   };
   const handleUpdate = async (formData) => {
      try {
         dispatch(globalSlice.actions.changeBackdrop(true));
         const res = await apid.put(`/admin/games`, formData, {
            headers: {
               "Content-type": "multipart/form-data",
            },
         });
         const data = await res.data;
         console.log(data);
         dispatch(globalSlice.actions.changeBackdrop(false));
         dispatch(
            globalSlice.actions.changeSnackBarState({
               open: true,
               title: "Success",
               message: "Update game successfully",
               typeStatus: "success",
            })
         );
      } catch (err) {
         console.log(err);
         dispatch(
            globalSlice.actions.changeSnackBarState({
               open: true,
               title: "Error",
               message: "Update game failure! Try again",
               typeStatus: "error",
            })
         );
         dispatch(globalSlice.actions.changeBackdrop(false));
      }
   };
   const handleSubmit = async (formData) => {
      try {
         dispatch(globalSlice.actions.changeBackdrop(true));
         const res = await apid.post("/admin/games", formData, {
            headers: {
               "Content-type": "multipart/form-data",
            },
         });
         console.log(res);
         const data = await res.data;
         console.log(data);
         dispatch(
            globalSlice.actions.changeSnackBarState({
               open: true,
               title: "Success",
               message: "Create game successfully",
               typeStatus: "success",
            })
         );
         dispatch(adminCreateGameSlice.actions.resetState());
         dispatch(globalSlice.actions.changeBackdrop(false));
         navigate("/admin");
      } catch (err) {
         dispatch(
            globalSlice.actions.changeSnackBarState({
               open: true,
               title: "Error",
               message: "Create game failure! Try again",
               typeStatus: "error",
            })
         );
         dispatch(globalSlice.actions.changeBackdrop(false));

         console.log(err);
      }
   };
   const isOptionEqualToValue = (option, value) => {
      // Customize the equality test based on your data structure
      return option.id === value.id;
   };
   return (
      <Box display={"flex"} p={"4rem 20rem"} flexDirection={"column"} gap={4}>
         <Typography variant="h4" color={"Accent1.main"}>
            {mode !== "update"? "Create game" : "Update game" }
         </Typography>
         <Box
            sx={{
               padding: "4rem",
               width: "80%",
               paddingBottom: "3rem",
               background: "rgba(29, 37, 35, 0.517)",
               boxShadow: "5px 7px 21px rgba(0, 0, 0, 0.8)",
               backdropFilter: "blur(19px)",
               border: "1px solid rgba(50, 50, 50, 0.3)",
            }}
         >
            <form onSubmit={form.handleSubmit}>
               <FieldCustomCreateGame
                  title={"Images of game"}
                  isRequired={true}
               >
                  <AdminImageController />
               </FieldCustomCreateGame>
               <FieldCustomCreateGame title={"Name"} isRequired={true}>
                  <TextField
                     id="name"
                     variant="outlined"
                     value={form.values.name}
                     onChange={form.handleChange}
                     onBlur={form.handleBlur}
                     error={form.touched.name && Boolean(form.errors.name)}
                     helperText={form.touched.name && form.errors.name}
                     sx={{
                        input: {
                           color: theme.palette.secondary.main,
                        },
                     }}
                  />
               </FieldCustomCreateGame>
               <FieldCustomCreateGame title={"Categories"} isRequired={true}>
                  {listType !== undefined && listType.length !== 0 && (
                     <>
                        <Autocomplete
                           id="tags"
                           multiple
                           color="disabled.main"
                           isOptionEqualToValue={isOptionEqualToValue}
                           value={form.values.category}
                           onBlur={form.handleBlur("category")}
                           onChange={(event, value) =>
                              form.setFieldValue("category", value)
                           }
                           disableCloseOnSelect
                           renderOption={(props, option, { selected }) => (
                              <li {...props}>
                                 <Checkbox sx={{ mr: 1 }} checked={selected} />
                                 {option.name}
                              </li>
                           )}
                           sx={{ width: "90%" }}
                           renderInput={(params) => (
                              <TextField
                                 {...params}
                                 label="Select category"
                                 variant="outlined"
                              />
                           )}
                           options={listType}
                           getOptionLabel={(option) => option.name}
                           filterOptions={(options, state) =>
                              options.filter((option) =>
                                 option.name
                                    .toLowerCase()
                                    .includes(state.inputValue.toLowerCase())
                              )
                           }
                        />

                        {form.touched.category && form.errors.category && (
                           <FormHelperText error>
                              {form.errors.category}
                           </FormHelperText>
                        )}
                     </>
                  )}
               </FieldCustomCreateGame>
               <FieldCustomCreateGame title={"Description"} isRequired={true}>
                  <QuillWrapper
                     placeholder="Write description here..."
                     field={form.getFieldProps("description")}
                     form={form}
                  />
                  {form.touched.description && form.errors.description && (
                     <FormHelperText error>
                        {form.errors.description}
                     </FormHelperText>
                  )}
               </FieldCustomCreateGame>
               <FieldCustomCreateGame title={"Price"} isRequired={true}>
                  <TextField
                     value={form.values.price}
                     onChange={form.handleChange}
                     onBlur={form.handleBlur}
                     error={form.touched.price && Boolean(form.errors.price)}
                     helperText={form.touched.price && form.errors.price}
                     id="price"
                     InputProps={{
                        startAdornment: (
                           <InputAdornment
                              sx={{
                                 color: theme.palette.secondary.main,
                              }}
                              color="secondary.main"
                              position="end"
                           >
                              <Typography color={"primary.main"}>$</Typography>
                           </InputAdornment>
                        ),
                     }}
                     sx={{
                        input: {
                           color: theme.palette.secondary.main,
                        },
                     }}
                  />
               </FieldCustomCreateGame>
               <FieldCustomCreateGame title={"Quantity"} isRequired={true}>
                  <TextField
                     value={form.values.quantity}
                     onChange={form.handleChange}
                     onBlur={form.handleBlur}
                     error={
                        form.touched.quantity && Boolean(form.errors.quantity)
                     }
                     helperText={form.touched.quantity && form.errors.quantity}
                     id="quantity"
                     sx={{
                        input: {
                           color: theme.palette.secondary.main,
                        },
                     }}
                  />
               </FieldCustomCreateGame>
               <Box display={"flex"} justifyContent={"flex-end"}>
                  <Button variant="outlined" type="submit">
                     Submit
                  </Button>
               </Box>
            </form>
         </Box>
      </Box>
   );
}
