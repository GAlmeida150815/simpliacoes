// Importing React and ReactDOM
import React from "react";
import ReactDOM from "react-dom/client";

// Importing routing components from React Router
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

// Importing cookies management component
import { CookiesProvider } from 'react-cookie';

// Importing analytics library
import ReactGA from "react-ga";

// Importing stylesheets
import "assets/vendor/nucleo/css/nucleo.css";
import "assets/vendor/font-awesome/css/font-awesome.min.css";
import "assets/scss/simpliacoes.scss?v1.1.0";
import 'react-toastify/dist/ReactToastify.css';

// Importing context providers
import { LoadingProvider } from "components/Hooks/LoadingHook";
import { SidebarProvider } from "components/Hooks/SidebarContext";

// Importing page components
import Home from "views/Pages/Home.js";
import Blog from "views/Pages/Blog.js";
import Post from "views/Pages/Post";
//! DEPRECATED import Products from "views/Pages/Products";
import Hub from "views/Pages/Hub";
import Offline from "views/Pages/Offline";
import Calculator from "views/Pages/Calculator";
import PrivacyPolicy from "views/Pages/PrivacyPolicy";
import TOS from "views/Pages/TOS";
import Contact from "views/Pages/Contact";
import WhoAreWe from "views/Pages/WhoAreWe";

const root = ReactDOM.createRoot(document.getElementById("root"));
ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS);

root.render(
  <CookiesProvider>
    <LoadingProvider>
      <SidebarProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/offline" exact element={<Offline />} />
            {/* //! DEPRECATED <Route path="/produtos" exact element={<Products />} /> */}
            <Route path="/hub"  exact element={<Hub />} />
            <Route path="/blog" exact element={<Blog />} />
            <Route path="/post/:Title" exact element={<Post />} />
            <Route path="/privacidade" exact element={<PrivacyPolicy />} />
            <Route path="/tos" exact element={<TOS />} />
            <Route path="/contactos" exact element={<Contact />} />
            <Route path="/quem-somos" exact element={<WhoAreWe />} />
            {
              <Route path="/calculadora" exact element={<Calculator />} />
            }
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </SidebarProvider>
    </LoadingProvider>
  </CookiesProvider>
);