import React from "react";
import ReactDOM from "react-dom/client";
import ReactGA from 'react-ga';
import { CookiesProvider } from 'react-cookie';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import "assets/plugins/nucleo/css/nucleo.css";
import "assets/scss/simpliacoes-dashboard.scss";
import 'react-quill/dist/quill.snow.css';

import { LoadingProvider } from "components/Hooks/LoadingHook";
import { ModalProvider } from "components/Hooks/ModalHook";
import { AuthProvider } from "components/Hooks/AuthContext";

import Admin from "layouts/Admin.js";
import Auth from "layouts/Auth.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS);

root.render(
  <CookiesProvider>
    <LoadingProvider>
      <BrowserRouter>
        <ModalProvider>
          <AuthProvider>
            <Routes>
              <Route path="/admin/*" element={<Admin />} />
              <Route path="/auth/*" element={<Auth />} />
              <Route path="*" element={<Navigate to="/admin/index" replace />} />
            </Routes>
          </AuthProvider>
        </ModalProvider>
      </BrowserRouter>
    </LoadingProvider>
  </CookiesProvider>
);
