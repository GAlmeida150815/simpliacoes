// Importing necessary React components and hooks
import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { NavLink as RouterNavLink } from 'react-router-dom';

// Importing components from Reactstrap
import {
  NavItem,
  Nav
} from "reactstrap";

// Importing icons from React Icons
import { IoHomeOutline, IoHome, IoBagHandleOutline, IoBagHandle,
  IoCalculatorOutline , IoCalculator, IoNewspaperOutline, IoNewspaper,
  IoLogoInstagram, IoArrowForwardOutline,
  IoDesktop, IoDesktopOutline } from "react-icons/io5";
import { PiLinktreeLogo } from "react-icons/pi";

// Importing context
import { SidebarContext } from "components/Hooks/SidebarContext";


const SimpliSidebar = () => {
  // Hooks for getting location and sidebar context
  const location = useLocation();
  const { isSidebarCollapsed, toggleSidebar } = useContext(SidebarContext);
  
  return (
    <div className={`page-sidebar ${isSidebarCollapsed ? 'narrow' : ''}`}>
      <Link className="logo" to="/" />
      <Nav vertical className="nav-links">
          <NavItem>
              <RouterNavLink to="/" exact="true" className="nav-link" activeclassname="active">
                {location.pathname === '/' ? <IoHome /> : <IoHomeOutline />}
                <span className="nav-link-text">Inicio</span>
              </RouterNavLink>
          </NavItem>
          {/* //!DEPRECATED 
          <NavItem>
              <RouterNavLink to="/produtos" className="nav-link" activeclassname="active">
                {location.pathname === '/produtos' ? <IoBagHandle /> : <IoBagHandleOutline />} 
                <span className="nav-link-text">Produtos</span>
              </RouterNavLink>
          </NavItem>
          */}
          <NavItem>
              <RouterNavLink to="/hub" className="nav-link" activeclassname="active">
                {location.pathname === '/hub' ? <IoDesktop /> : <IoDesktopOutline />} 
                <span className="nav-link-text">SimpliAções HUB</span>
              </RouterNavLink>
          </NavItem>
          <NavItem>
              <RouterNavLink to="/calculadora" className="nav-link" activeclassname="active">
                {location.pathname === '/calculadora' ? <IoCalculator /> : <IoCalculatorOutline />} 
                <span className="nav-link-text">Calculadora</span>
              </RouterNavLink>
          </NavItem>
          <NavItem>
              <RouterNavLink to="/blog" className="nav-link" activeclassname="active">
                {location.pathname === '/blog' ? <IoNewspaper /> : <IoNewspaperOutline />} 
                <span className="nav-link-text">Blog</span>
              </RouterNavLink>
          </NavItem>
      </Nav>
      <Nav vertical className="bottom-nav-links">
          <NavItem>
              <RouterNavLink to="https://www.instagram.com/simpliacoes/" target="_blank" className="nav-link" activeclassname="active">
                  <IoLogoInstagram /> 
                  <span className="nav-link-text">Instagram</span>
              </RouterNavLink>
          </NavItem>
          <NavItem>
              <RouterNavLink to="https://linktr.ee/simpliacoes" target="_blank" className="nav-link" activeclassname="active">
                  <PiLinktreeLogo /> 
                  <span className="nav-link-text">Linktree</span>
              </RouterNavLink>
          </NavItem>
      </Nav>
      <div className="extender">
        <Link onClick={toggleSidebar}>
          <IoArrowForwardOutline className={isSidebarCollapsed ? '': 'active'} />
        </Link>
      </div>
    </div>
  );
}

export default SimpliSidebar;
