import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import store from "./redux/store";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { CLIENT_ID } from "./config/authentication";
import { CookiesProvider } from "react-cookie";
import persistStore from "redux-persist/es/persistStore";
import { PersistGate } from "redux-persist/integration/react";
const root = ReactDOM.createRoot(document.getElementById("root"));
// function createRipple(event) {
//    const button = event.currentTarget;
//    console.log(button, 'asdfasfasdf');
//    const circle = document.createElement("span");
//    const diameter = Math.max(button.clientWidth, button.clientHeight);
//    const radius = diameter / 2;

//    circle.style.width = circle.style.height = `${diameter}px`;
//    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
//    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
//    circle.classList.add("ripple");

//    const ripple = button.getElementsByClassName("ripple")[0];

//    if (ripple) {
//      ripple.remove();
//    }

//    button.appendChild(circle);
//  }

//  const buttons = document.getElementsByClassName("ripple");

//  for (const button of buttons) {
//    button.addEventListener("click", createRipple);
//  }
let persistor = persistStore(store);
root.render(
   <React.StrictMode>
      <GoogleOAuthProvider clientId={CLIENT_ID}>
         <BrowserRouter>
            <Provider store={store}>
               <PersistGate persistor={persistor}>
                  <App />
               </PersistGate>
            </Provider>
         </BrowserRouter>
      </GoogleOAuthProvider>
   </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
