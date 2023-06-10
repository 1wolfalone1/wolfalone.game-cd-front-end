import { createTheme } from "@mui/material";

export const theme = createTheme({
   palette: {
      Complementary1: {
         main: "#fff8c8",
      },
      Complementary2: {
         main: "#cad9b1",
      },
      Complementary3: {
         main: "#8fb3a0",
      },
      Dominant1: {
         main: "#d5b678",
      },
      Dominant2: {
         main: "#bf9760",
      },
      Dominant3: {
         main: "#856641",
      },
      Dominant4: {
         main: "#6b3b29",
      },
      Dominant5: {
         main: "#2c1b10",
      },
      Accent1: {
         main: "#c6cfff",
         contrastText: "rgb(4, 0, 30)",
      },
      Accent2: {
         main: "#622773",
      },
      Accent3: {
         main: "#4a1259",
      },
      Accent4: {
         main: "#350c40",
      },
      Accent5: {
         main: "#200726",
      },
   },

   // overrides: {
   //    MuiMenuItem: {
   //       // For ListItem, change this to MuiListItem
   //       root: {
   //          "&$selected": {
   //             // this is to refer to the prop provided by M-UI
   //             backgroundColor: "black",
   //          },
   //          $paper: {
   //             color: "red",
   //          },
   //       },
   //    },
   // },
});
