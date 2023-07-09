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
import UserProfile from "./container/user-profile/UserProfile";
import OrderPage from "./container/order-page/OrderPage";
import OrderHistory from "./container/order-history/OrderHistory";
import OrderDetails from "./container/order-details/OrderDetails";
import AdminGameContainer from "./container/admin-game-container/AdminGameContainer";
import AdminOrderContainer from "./container/admin-order-container/AdminOrderContainer";
import AdminCreateGame from "./container/admin-create-game/AdminCreateGame";

const darkTheme = createTheme({
   palette: {
      mode: "dark",
   },
});
function App() {
   const location = useLocation();
   const dispatch = useDispatch();
   console.log(location, "locationnnnnnnnnnnnnnnnnnnnnnnnnnnnn");
   useEffect(() => {
      const path = location.pathname;
      if (path === "/" || path === "/admin") {
         dispatch(globalSlice.actions.changeNavActive(1));
      } else if (path === "/games" || path === "/admin/order-manager") {
         dispatch(globalSlice.actions.changeNavActive(2));
      } else if (path === "/cart") {
         dispatch(globalSlice.actions.changeNavActive(3));
      }
   }, [location]);

   return (
      <ThemeProvider theme={darkTheme}>
         <CssBaseline />
         <Routes>
            <Route path="/" element={<Layout />}>
               <Route index element={<HomeContainer />} />
               <Route path="login" element={<LoginContainer />} />
               <Route path="signup" element={<RegistrationContainer />} />
               <Route path="games" element={<GamesPageContainer />} />
               <Route path="game-details/:id" element={<GameDetails />} />
               <Route path="cart" element={<CartContainer />} />
               <Route path="profile" element={<UserProfile />} />
               <Route path="order" element={<OrderPage />} />
               <Route path="order-history" element={<OrderHistory />} />
               <Route
                  path="order-details/:orderId"
                  element={<OrderDetails />}
               />
            </Route>
            <Route path="/admin/" element={<Layout />}>
               <Route index element={<AdminGameContainer />} />
               <Route path="order-manager" element={<AdminOrderContainer />} />
               <Route path="create-game" element={<AdminCreateGame />} />
               <Route path="update-game/:id" element={<AdminCreateGame />} />
               <Route path="order-details/:orderId" element={<OrderDetails />} />
            </Route>
         </Routes>
      </ThemeProvider>
   );
}

export default App;
