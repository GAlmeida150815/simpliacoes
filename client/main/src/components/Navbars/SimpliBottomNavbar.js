// Importing React and Router components
import React from "react";
import { NavLink as RouterNavLink, useLocation } from 'react-router-dom';

// Importing components from Reactstrap
import {
  NavItem,
  Nav
} from "reactstrap";

// Importing icons from React Icons
import { IoHomeOutline, IoHome,
  IoBagHandleOutline, IoBagHandle,
  IoCalculatorOutline , IoCalculator, 
  IoNewspaperOutline, IoNewspaper,
  IoDesktopOutline, IoDesktop } from "react-icons/io5";


const SimpliBottomNavbar = () => {
  const location = useLocation();

  return (
    <div className="page-bottom-nav">
      <Nav className="bot-nav-links">
        <NavItem>
          <RouterNavLink to="/" exact className="nav-link" activeClassName="active">
              {location.pathname === '/' ? <IoHome /> : <IoHomeOutline />}
            </RouterNavLink>
        </NavItem>
        {/* //! DEPRECATED
          <NavItem>
              <RouterNavLink to="/produtos" className="nav-link" activeClassName="active">
                {location.pathname === '/produtos' ? <IoBagHandle /> : <IoBagHandleOutline />} 
              </RouterNavLink>
          </NavItem>
        */}
        <NavItem>
            <RouterNavLink to="/hub" className="nav-link" activeClassName="active">
              {location.pathname === '/hub' ? <IoDesktop /> : <IoDesktopOutline />} 
            </RouterNavLink>
        </NavItem>
        <NavItem>
            <RouterNavLink to="/calculadora" className="nav-link" activeClassName="active">
              {location.pathname === '/calculadora' ? <IoCalculator /> : <IoCalculatorOutline />} 
            </RouterNavLink>
        </NavItem>
        <NavItem>
            <RouterNavLink to="/blog" className="nav-link" activeClassName="active">
              {location.pathname === '/blog' ? <IoNewspaper /> : <IoNewspaperOutline />} 
            </RouterNavLink>
        </NavItem>
      </Nav>
    </div>
  );
}

export default SimpliBottomNavbar;
