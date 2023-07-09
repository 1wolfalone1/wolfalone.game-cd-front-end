import { createTheme } from "@mui/material";

export const theme = createTheme({
   components: {
      MuiAutocomplete: {
         styleOverrides: {
            tag: {
               backgroundColor: "purple", // Customize the background color of the Chip here
               color: "white", // Customize the text color of the Chip here
            },
         },
      },
      MuiInputLabel: {
         styleOverrides: {
            root: {
               color: "#fff8c8", // Customize the color of the label here
            },
         },
      },
      MuiOutlinedInput: {
         styleOverrides: {
            root: {
               "& fieldset": {
                  borderColor: "#e2e2e2", // Customize the border color here
               },
            },
         },
      },
   },
   palette: {
      primary: {
         main: "#e2e2e2",
         contrastText: "#622773",
      },
      secondary: {
         main: "#fff8c8",
         contrastText: "#4a1259",
      },
      disabled: {
         main: "#fff8c8",
         contrastText: "#4a1259",
      },
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
         contrastText: "rgb(20, 20, 20)",
      },
      Accent2: {
         main: "#622773",
         contrastText: "#c6cfff",
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
   typography: {
      fontSize: 24,
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
