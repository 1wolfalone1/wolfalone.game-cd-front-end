import {
   Box,
   Button,
   FormControl,
   InputBase,
   InputLabel,
   MenuItem,
   OutlinedInput,
   Select,
   Stack,
   TextField,
   Typography,
   alpha,
} from "@mui/material";
import s from "./gameFilter.module.scss";
import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import SearchIcon from "@mui/icons-material/Search";
import {
   AnimatePresence,
   LayoutGroup,
   color,
   motion,
   useAnimate,
} from "framer-motion";
import { apid } from "../../api/API";
import { style } from "../../style/custom/custom";
import clsx from "clsx";
const Search = styled("div")(({ theme }) => ({
   position: "relative",
   borderRadius: theme.shape.borderRadius,
   backgroundColor: alpha(theme.palette.common.white, 0.15),
   "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
   },
   marginLeft: 0,
   width: "100%",
   [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
   },
}));
const SearchIconWrapper = styled("div")(({ theme }) => ({
   padding: theme.spacing(0, 2),
   height: "100%",
   position: "absolute",
   pointerEvents: "none",
   display: "flex",
   alignItems: "center",
   justifyContent: "center",
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
   color: "inherit",
   "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      fontSize: "3rem",
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
         width: "12ch",
         "&:focus": {
            width: "20ch",
         },
      },
   },
}));
const ButtonStyle = styled(Button)(({ theme }) => ({
   fontSize: "2rem",
   color: "success",
   "& .MuiMenu-list": {
      backgroundColor: "#000000 !important",
   },
   "& .MuiButton-text": {
      color: "red",
   },
}));
const MenuProps = {
   disableScrollLock: true,
   PaperProps: {
      style: {
         maxHeight: "20rem",
         width: "20rem",
         color: style.color.$Accent5,
         fontSize: "2rem",
      },
   },
   MenuListProps: {
      sx: {
         width: "20rem",
         backgroundColor: "#1c1b1cd2",
         color: style.color.$Accent1,
      },
   },
};
const SelectStyle = styled(Select)(({ theme }) => ({
   backgroundColor: "#343434 !important",
   color: theme.palette.Complementary1.main,
   width: "20rem",
   "& .MuiMenuItem-dense": {
      backgroundColor: "#343434 !important",
   }

}));
const Component = React.forwardRef((props, ref) => <SelectStyle />);
export default function GameFilter() {
   const [isFilterOpen, setIsFilterOpen] = useState(false);
   const [categories, setCategories] = useState([]);
   const [categorySelected, setCategorySelected] = useState(0);
   const handleCategorySelected = (event) => {
      const {
         target: { value },
      } = event;
      setCategorySelected(value);
   };
   const animation = {
      init: {
         opacity: 0,
         x: "-100%",
      },
      animate: {
         opacity: 1,
         x: 0,

         transition: {
            duration: 0.2,
            type: "spring",
         },
      },
   };
   const getCategories = async () => {
      const response = await apid.get("/category");
      const data = await response.data;
      console.log(data);
      setCategories(data);
   };
   useEffect(() => {
      getCategories();
   }, []);
   return (
      <Stack justifyContent={'center'}>
         <Box sx={{}} my={"1rem"} display={"flex"} justifyContent={'center'}>
            <Search>
               <SearchIconWrapper>
                  <SearchIcon sx={{ fontSize: "3rem" }} />
               </SearchIconWrapper>
               <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
               />
            </Search>
            <ButtonStyle
               variant="outlined"
               color="Accent5"
               onClick={() => {
                  setIsFilterOpen(!isFilterOpen);
               }}
            >
               Filter
            </ButtonStyle>
         </Box>
         <motion.div
            layout
            layoutId="top5"
            variant={animation}
            initial="init"
            animate="animate"
            style={{width:'100%', display: 'flex'}}
            className="dfasfdasfasdfasdf"
         >
            {isFilterOpen && (
               <>
                  <Box display="flex" alignItems={"center"} fullWidth w='100%'>
                     <FormControl color="Accent1">
                        <InputLabel
                           id="demo-multiple-checkbox-label"
                           sx={{
                              fontSize: "2rem",
                              color: style.color.$Complementary1,
                           }}
                        >
                           Categories
                        </InputLabel>
                        <SelectStyle
                           disableScrollLock
                           id="demo-multiple-checkbox-label"
                           label="Category"
                           input={<OutlinedInput label="Categories" />}
                           value={categorySelected}
                           onChange={handleCategorySelected}
                           sx={{ fontSize: "2rem", width: "none" }}
                           MenuProps={MenuProps}
                           className={clsx(s.listmenu)}
                        >
                           <MenuItem
                              value={0}
                              sx={{ fontSize: "2rem" }}
                              disableScrollLock
                              color="error"
                           >
                              All categories
                           </MenuItem>
                           {categories.map((category) => (
                              <MenuItem
                                 key={category.id}
                                 value={category.id}
                                 disableScrollLock
                                 sx={{ fontSize: "2rem" }}
                              >
                                 {category.name}
                              </MenuItem>
                           ))}
                        </SelectStyle>
                     </FormControl>
                     <Box display={"flex"} alignItems={"center"} px={"1rem"}>
                        <Typography
                           sx={{
                              fontSize: "3rem",
                              color: style.color.$Complementary2,
                           }}
                        >
                           From:{" "}
                        </Typography>
                        <TextField
                           color="Complementary3"
                           sx={{
                              width: "10rem",
                              input: {
                                 fontSize: "1.6rem",
                                 color: style.color.$Accent1,
                              },
                           }}
                        />
                        <Typography
                           sx={{
                              fontSize: "3rem",
                              color: style.color.$Complementary2,
                           }}
                        >
                           To:{" "}
                        </Typography>
                        <TextField
                           color="Complementary3"
                           sx={{
                              width: "10rem",
                              input: {
                                 fontSize: "1.6rem",
                                 color: style.color.$Accent1,
                              },
                           }}
                        />
                     </Box>
                     <Button
                        color="Complementary1"
                        variant="outlined"
                        sx={{ fontSize: "2.4rem", padding: "0rem 3rem" }}
                     >
                        {" "}
                        Find
                     </Button>
                  </Box>
               </>
            )}
         </motion.div>
      </Stack>
   );
}
