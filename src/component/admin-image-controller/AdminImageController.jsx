import { Box, IconButton, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import adminCreateGameSlice, {
   adminCreateGameSelector,
} from "../../redux/global/adminCreateGame";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { style } from "./../../style/custom/custom";
import { useRef } from "react";
import { v4 } from "uuid";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { dataAsyncUrlToFile } from "../../utils/myUrils";
export default function AdminImageController() {
   const { listImage } = useSelector(adminCreateGameSelector);
   const inputRef = useRef(null);
   const dispatch = useDispatch();
   const handleAddImageChange = (e) => {
      e.preventDefault();
      let files;
      if (e.dataTransfer) {
         files = e.dataTransfer.files;
      } else if (e.target) {
         files = e.target.files;
      }
      const reader = new FileReader();
      reader.onload = async () => {
         const fileBlob = await dataAsyncUrlToFile(reader.result, `${v4()}`);
         dispatch(
            adminCreateGameSlice.actions.changeListImage({
               id: v4(),
               src: reader.result,
               file: fileBlob,
            })
         );
      };
      if (files[0]) {
         reader?.readAsDataURL(files[0]);
      } else {
      }
   };
   const handleAddImageButtonClick = () => {
      inputRef.current.click();
   };
   return (
      <Box display={"flex"} gap={2}>
         {listImage &&
            listImage.map((image) => (
               <Box
                  key={image.id}
                  sx={{
                     width: "12rem",
                     height: "12rem",
                     border: "1px solid #000000",
                     position: "relative",
                  }}
               >
                  <IconButton
                     sx={{ position: "absolute", top: 0, right: 0 }}
                     onClick={() => {
                        dispatch(
                           adminCreateGameSlice.actions.removeImage(image)
                        );
                     }}
                  >
                     <HighlightOffIcon color="primary" />
                  </IconButton>
                  <img
                     style={{ width: "100%", height: "100%" }}
                     src={image.src}
                     alt=""
                  />
               </Box>
            ))}
         <Box
            sx={{
               width: "12rem",
               height: "12rem",
               display: "flex",
               flexDirection: "column",
               justifyContent: "center",
               alignItems: "center",
               border: "1px solid #000000",
               gap: "1rem",
               "&:hover": {
                  cursor: "pointer",
               },
            }}
            onClick={handleAddImageButtonClick}
         >
            <AddPhotoAlternateIcon />
            <Typography>Add image</Typography>
         </Box>
         <input
            ref={inputRef}
            onChange={handleAddImageChange}
            type="file"
            style={{ display: "none" }}
         />
      </Box>
   );
}
