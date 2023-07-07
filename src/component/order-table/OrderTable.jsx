import { DataGrid, GridToolbar, useGridApiRef } from "@mui/x-data-grid";
import React from "react";
import { useSelector } from "react-redux";
import { orderSliceSelector } from "../../redux/global/orderSlice";
import moment from "moment";
import { Box, Button } from "@mui/material";
import { formatNumber } from './../../utils/myUrils';
import { Link, useNavigate } from "react-router-dom";

export default function OrderTable() {
   const apiRef = useGridApiRef();
   const { listSelected, listOrder, isLoading } =
      useSelector(orderSliceSelector);

   const handleRowSelectionModelChange = () => {};
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
         <DataGrid
            editMode="row"
            checkboxSelection
            onRowSelectionModelChange={handleRowSelectionModelChange}
            disableRowSelectionOnClick
            rowSelectionModel={listSelected}
            apiRef={apiRef}
            columns={columns}
            rows={listOrder}
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
      </Box>
   );
}

const columns = [
   {
      field: "id",
      headerName: "ID",
      width: 100,
   },
   {
      field: "totalPayment",
      headerName: "Total Payment",
      width: 250,
      valueFormatter: ({value}) => formatNumber(value)
   },
   {
      field: "status",
      headerName: "Status",
      width: 150,
      valueGetter: (params) => (params.value === 0 ? "Pending" : "Shipping"),
   },
   {
      field: "orderDate",
      headerName: "Order Date",
      width: 250,
      valueGetter: (params) => moment(params.value).format("HH:mm DD-MM-YYYY"),
   },
   {
      field: "shipDate",
      headerName: "Ship Date",
      width: 250,
      valueGetter: (params) => {
         try {
            const date = moment(params.value).format("HH:mm DD-MM-YYYY")
            console.log(date);
            if(date === 'Invalid date') {
               return 'Not yet!'
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
      width: 250,
      renderCell: (params) => {
         return  <Link to={`/order-details/${params.id}`} variant="outlined">View details</Link>
      }
   },
];
