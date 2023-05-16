import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./container/common/layout/Layout.component";
import LoginContainer from "./container/login/LoginContainer";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import RegistrationContainer from "./container/register/RegistrationContainer";
import HomeContainer from "./container/home/HomeContainer";
import { useCookies } from "react-cookie";

const darkTheme = createTheme({
   palette: {
      mode: "dark",
   },
});
function App() {
   const [cookies, setCookie, removeCookie] = useCookies();


   
   return (
      <ThemeProvider theme={darkTheme}>
         <CssBaseline />
         <Routes>
            <Route element={<Layout />}>
               <Route index element={<HomeContainer/>} />
               <Route path="/login" element={<LoginContainer />} />
               <Route path="/signup" element={<RegistrationContainer />} />
            </Route>
         </Routes>
      </ThemeProvider>
   );
}

export default App;
