import { Box, Button } from "@mui/material";
import { DataGrid, GridToolbar, useGridApiRef } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import globalSlice, {
   getAdminGameOrderSelector,
   getPageAdminOrderSelector,
} from "../../redux/global/globalSlice";
import { apid } from "../../api/API";
import { Link } from "react-router-dom";
import moment from "moment";
import { formatNumber } from "../../utils/myUrils";

export default function AdminTableOrder() {
   const data = useSelector(getAdminGameOrderSelector);
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
         const res = await apid.get(`/admin/order/${page}`);
         const datares = res.data;
         console.log(datares);
         dispatch(
            globalSlice.actions.changeAdminOrderTable({
               data: datares,
               page: page,
            })
         );
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
               rows={data.data}
               rowCount={data.totalElement}
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
   { field: "id", headerName: "ID", width: 100 },
   { field: "name", headerName: "User Name", width: 150 },
   { field: "phone", headerName: "Phone", width: 150 },
   {
      field: "totalPayment",
      headerName: "Total Payment",
      width: 150,
      valueFormatter: (params) => formatNumber(params.value),
   },
   {
      field: "status",
      headerName: "Status",
      width: 120,
      valueGetter: (params) => (params.value === 0 ? "Pending" : "Shipping"),
   },
   {
      field: "orderDate",
      headerName: "Order Date",
      width: 150,
      valueGetter: (params) => moment(params.value).format("HH:mm DD-MM-YYYY"),
   },
   {
      field: "shipDate",
      headerName: "Ship Date",
      width: 150,
      valueGetter: (params) => {
         try {
            const date = moment(params.value).format("HH:mm DD-MM-YYYY");
            console.log(date);
            if (date === "Invalid date") {
               return "Not yet!";
            }
            return date;
         } catch (err) {
            console.error(err);
         }
      },
   },
   {
      field: "actions",
      headerName: "View",
      width: 150,
      renderCell: (params) => {
         return (
            <Link to={`/admin/order-details/${params.id}`} variant="outlined">
               View details
            </Link>
         );
      },
   },
   {
      field: "actions-2",
      headerName: "Change status",
      width: 150,
      renderCell: (params) => {
         return <CustomActionInOrder params={params} />;
      },
   },
];
const CustomActionInOrder = ({ params }) => {
   const page = useSelector(getPageAdminOrderSelector);
   const dispatch = useDispatch();
   const handleChangeStatus = async () => {
      try {
         const res = await apid.put(`admin/order/status/${params.id}`);
         const data = await res.data;
         dispatch(
            globalSlice.actions.changeSnackBarState({
               open: true,
               title: "Success",
               message: "Change status successfully",
               typeStatus: "success",
            })
         );
         console.log(page, "pageeeeeeeeeeeeeeeeeeeeee");
         const resData = await apid.get(`/admin/order/${page}`);
         const datares = await resData.data;
         dispatch(
            globalSlice.actions.changeAdminOrderTable({
               data: datares,
               page: page,
            })
         );
      } catch (err) {
         dispatch(
            globalSlice.actions.changeSnackBarState({
               open: true,
               title: "Error",
               message: "Change status failure! Try again",
               typeStatus: "error",
            })
         );
         console.log(err);
      }
   };
   console.log(params, "paramssssssssssssssssssssssssssssssssssssssss");
   return (
      <Button
         color="Accent4"
         disabled={params.row.status === 1}
         variant="outlined"
         onClick={handleChangeStatus}
      >
         Ship
      </Button>
   );
};
