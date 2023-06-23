import logo from "./logo.svg";
import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
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
import GameDetails from "./container/game-details/GameDetails";
import globalSlice from "./redux/global/globalSlice";
import CartContainer from "./container/cart-container/CartContainer";

const darkTheme = createTheme({
   palette: {
      mode: "dark",
   },
});
function App() {
   const location = useLocation();
   const dispatch = useDispatch();
   console.log(location, 'locationnnnnnnnnnnnnnnnnnnnnnnnnnnnn');
   useEffect(() => {
      const path = location.pathname;
      if(path === '/'){
         dispatch(globalSlice.actions.changeNavActive(1));
      }else if(path === '/games'){
         dispatch(globalSlice.actions.changeNavActive(2));
      } else if(path === '/cart'){
         dispatch(globalSlice.actions.changeNavActive(3));
      }
   }, [location]);
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
            <Route path='/' element={<Layout />}>
               <Route index element={<HomeContainer />} />
               <Route path="login" element={<LoginContainer />} />
               <Route path="signup" element={<RegistrationContainer />} />
               <Route path="games" element={<GamesPageContainer />} />
               <Route path="game-details/:id" element={<GameDetails />} />
               <Route path="cart" element={<CartContainer />} />
            </Route>
         </Routes>
      </ThemeProvider>
   );
}

export default App;
