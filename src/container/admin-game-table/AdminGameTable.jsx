import { Box, IconButton } from "@mui/material";
import { DataGrid, GridToolbar, useGridApiRef } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { apid } from "../../api/API";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import globalSlice, {
   getAdminGameTableSelector,
} from "../../redux/global/globalSlice";
import CustomAction from "../../component/custom-action-in-admin-table/CustomAction";
export default function AdminGameTable() {
   const data = useSelector(getAdminGameTableSelector);
   const apiRef = useGridApiRef();
   const dispatch = useDispatch();
   const [isLoading, setIsLoading] = useState(false);
   const [paginationModel, setPaginationModel] = useState({
      pageSize: 8, // Default page size
      page: 0, // Default page number
   });
   console.log(data);
   useEffect(() => {
      if (paginationModel) {
         console.log();
         getData(paginationModel.page + 1);
      }
   }, [paginationModel]);
   const getData = async (page) => {
      setIsLoading(true);
      console.log(data);
      try {
         const res = await apid.get(`/admin/games/${page}`);
         const datares = res.data;
         console.log(datares);
         dispatch(globalSlice.actions.changeAdminGameTable(datares));
         setIsLoading(false);
      } catch (err) {
         setIsLoading(false);
         console.error(err);
      }
   };
   return (
      <Box
         sx={{
            width: "70%",
            background: "rgba(213, 213, 213, 0.25)",
            borderRadius: "16px",
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(6.6px)",
            WebkitBackdropFilter: "blur(6.6px)",
            border: "1px solid rgba(213, 213, 213, 0.3)",
         }}
      >
         {data ? (
            <DataGrid
               disableRowSelectionOnClick
               apiRef={apiRef}
               columns={columns}
               rows={data.list}
               rowCount={data.totalProduct}
               rowsPerPageOptions={[8]}
               paginationModel={paginationModel}
               paginationMode="server"
               onPaginationModelChange={setPaginationModel}
               page={paginationModel.page}
               // editMode={isEditingEnabled ? "row" : "none"}
               slots={{
                  toolbar: GridToolbar,
               }}
               loading={isLoading}
               sx={{
                  boxShadow: 2,
                  border: 2,
                  color: "hsl(0, 0%, 1%)",
                  borderColor: "hsla(74, 100%, 95%, 0)",
                  "& .MuiDataGrid-cell:hover": {
                     color: "primary.main",
                  },
               }}
            />
         ) : (
            ""
         )}
      </Box>
   );
}
const columns = [
   { field: "id", headerName: "ID", width: 200 },
   { field: "name", headerName: "Name", width: 300 },
   { field: "price", headerName: "Price", width: 300 },
   { field: "quantity", headerName: "Quantity", width: 300 },
   {
      field: "action",
      headerName: "Action",
      width: 300,
      renderCell: (params) => {
         return <CustomAction params={params} />;
      },
   },
];
