// Importing React and Router components
import React from "react";
import { Link } from "react-router-dom";

// Importing external libraries
import Headroom from "headroom.js";

// Importing components from Reactstrap
import {
  Navbar,
  NavItem,
  Nav,
  Container,
} from "reactstrap";

// Importing icons from React Icons
import { IoLogoInstagram } from "react-icons/io5";
import { PiLinktreeLogo } from "react-icons/pi";

// Importing images
import Logo from "../../assets/img/brand/logoTeste.png";

class SimpliNavbar extends React.Component {
  componentDidMount() {
    let headroom = new Headroom(document.getElementById("navbar-main"));
    // initialise
    headroom.init();
  }
  state = {
    collapseClasses: "",
    collapseOpen: false,
  };

  onExiting = () => {
    this.setState({
      collapseClasses: "collapsing-out",
    });
  };

  onExited = () => {
    this.setState({
      collapseClasses: "",
    });
  };

  render() {
    return (
      <Navbar
        className="page-navbar headroom"
        expand="lg"
        id="navbar-main"
      > 
        <Container fluid>
          <img src={Logo} alt="logo" />
          <Nav className="nav-icons">
            <NavItem>
                <Link to="https://www.instagram.com/simpliacoes/" target="_blank" className="nav-link" activeClassName="active">
                    <IoLogoInstagram />
                </Link>
            </NavItem>
            <NavItem>
                <Link to="https://linktr.ee/simpliacoes" target="_blank" className="nav-link" activeClassName="active">
                    <PiLinktreeLogo />
                </Link>
            </NavItem>
          </Nav>
        </Container>
      </Navbar>
    );
  }
}

export default SimpliNavbar;
