
import React , { useEffect } from "react";
import { useLocation, useNavigate, Route, Routes, Navigate } from "react-router-dom";

// reactstrap components
import { Container } from "reactstrap";

// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import AdminFooter from "components/Footers/AdminFooter.js";
import Sidebar from "components/Sidebar/Sidebar.js";

// ? Hooks
import { useLoading } from "components/Hooks/LoadingHook";
import { useAuth } from 'components/Hooks/AuthContext';
import { useModal } from "components/Hooks/ModalHook";

import { checkOnlineStatus } from "utils/apiUtils";

import routes from "routes.js";

const Admin = (props) => {
  // ? Hooks Context
  const { login, logout, logged } = useAuth();
  const { showModal } = useModal();
  const { showLoading, hideLoading } = useLoading();
  const navigate = useNavigate();
  const mainContent = React.useRef(null);
  const location = useLocation();

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route path={prop.path} element={prop.component} key={key} exact />
        );
      } else {
        return null;
      }
    });
  };

  const getBrandText = (path) => {
    for (let i = 0; i < routes.length; i++) {
      if (
        props?.location?.pathname.indexOf(routes[i].layout + routes[i].path) !==
        -1
      ) {
        return routes[i].name;
      }
    }
    return "Brand";
  };

  // Effects
  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const isOnline = await checkOnlineStatus();
        if (!isOnline) {
          logout();
          navigate('/auth/login');
        }
      } catch (error) {
        console.error('Error checking online status:', error);
      }
    };

    try {
      fetchAPI()
      if (!logged()) {
        navigate('/auth/login');
      } 
    } catch (error) {
      console.error(error);
    }
  }, [logged, navigate]);

  return (
    <>
      <Sidebar
        {...props}
        routes={routes}
        logo={{
          innerLink: "/admin/index",
          imgSrc: require("../assets/img/brand/logo.png"),
          imgAlt: "...",
        }}
      />
      <div className="main-content" ref={mainContent}>
        <AdminNavbar
          {...props}
          brandText={getBrandText(props?.location?.pathname)}
        />
        <Routes>
          {getRoutes(routes)}
          <Route path="*" element={<Navigate to="/admin/index" replace />} />
        </Routes>
        <Container fluid>
          <AdminFooter />
        </Container>
      </div>
    </>
  );
};

export default Admin;
