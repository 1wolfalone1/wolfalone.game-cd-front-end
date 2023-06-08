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
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import userInfoSlice from "./redux/global/userInfoSlice";
import GamesPageContainer from "./container/games-page/GamesPageContainer";

const darkTheme = createTheme({
   palette: {
      mode: "dark",
   },
});
function App() {
   const dispatch = useDispatch();
   useEffect(() => {
      const user = localStorage.getItem("user");
      if (user) {
         console.log(user)
         dispatch(
            userInfoSlice.actions.changeAuthentication({
               status: "user",
               info: JSON.parse(user),
         })
         );
      }
   }, []);

   return (
      <ThemeProvider theme={darkTheme}>
         <CssBaseline />
         <Routes>
            <Route element={<Layout />}>
               <Route index element={<HomeContainer />} />
               <Route path="/login" element={<LoginContainer />} />
               <Route path="/signup" element={<RegistrationContainer />} />
               <Route path="/games" element={<GamesPageContainer />} />
            </Route>
         </Routes>
      </ThemeProvider>
   );
}

export default App;
