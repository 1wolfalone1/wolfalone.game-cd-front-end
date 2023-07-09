import { useDispatch } from "react-redux";
import globalSlice from "../../redux/global/globalSlice";
import { apid } from "../../api/API";
import { IconButton } from "@mui/material";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { getGameForAdminUpdate } from "../../redux/global/adminCreateGame";

const CustomAction = ({ params }) => {
   const dispatch = useDispatch();

   const navigate = useNavigate();

   const getData = async () => {
      try {
         const res = await apid.get(`/admin/games/${1}`);
         const datares = res.data;
         console.log(datares);
         dispatch(globalSlice.actions.changeAdminGameTable(datares));
      } catch (err) {
         console.error(err);
      }
   };
   const handleDelete = async () => {
      console.log(params);
      try {
         const res = await apid.delete("/admin/games/" + params.id);
         const data = await res.data;
         console.log(data);
         dispatch(
            globalSlice.actions.changeSnackBarState({
               open: true,
               title: "Success",
               message: "Delete game successfully",
               typeStatus: "success",
            })
         );
         getData();
      } catch (e) {
         dispatch(
            globalSlice.actions.changeSnackBarState({
               open: true,
               title: "Error",
               message: "Delete game failure! Try again",
               typeStatus: "error",
            })
         );
         console.log(e);
      }
   };
   const handleUpdate = async() => {
      try {
         navigate('/admin/update-game/' + params.id)
      } catch (err) {
         console.log(err);
      }
   }
   return (
      <>
         <IconButton onClick={handleUpdate}>
            <BorderColorIcon />
         </IconButton>
         <IconButton onClick={handleDelete}>
            <DeleteIcon />
         </IconButton>
      </>
   );
};

export default CustomAction;
