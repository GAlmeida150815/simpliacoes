// Importing React and Router components
import React from "react";
import { Link } from "react-router-dom";
import { FaInstagram } from "react-icons/fa"; // Importing Instagram icon

// Importing components from Reactstrap
import {
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
} from "reactstrap";

const SimpliFooter = (props) => {
  return (
    <>
      <footer className="footer pt-5 pb-3 bg-light text-dark">
        <Container>
          <Row className="align-items-center justify-content-md-between">
            <Col md="4" className="text-center text-md-left mb-3 mb-md-0">
              <h6 className="mb-2 font-weight-bold">Contactos</h6>
              <p>
                <Link to="/contactos" className="text-dark">
                  Fala Connosco
                </Link>
              </p>
            </Col>

            <Col md="4" className="text-center mb-3 mb-md-0">
              <h6 className="mb-2 font-weight-bold">Quem Somos</h6>
              <p>
                <Link to="/quem-somos" className="text-dark">
                  Saber mais sobre nós
                </Link>
              </p>
            </Col>

            <Col md="4" className="text-center mb-3 mb-md-0 text-md-right">
              <Nav className="nav-footer justify-content-around">
                <NavItem>
                  <Link to="/privacidade" className="text-dark">
                    Política de Privacidade
                  </Link>
                </NavItem>
                <NavItem>
                  <Link to="/tos" className="text-dark">
                    Termos de Serviço
                  </Link>
                </NavItem>
              </Nav>
            </Col>
          </Row>

          <hr className="my-4" />

          <Row className="align-items-center justify-content-center">
            <Col className="text-center">
              <div className="copyright">
                © {new Date().getFullYear()}{" "}
                <a
                  href="https://www.instagram.com/almeida_150815/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-dark font-weight-bold"
                >
                  Gonçalo Almeida
                </a>
                . Todos os direitos reservados.
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
};

export default SimpliFooter;
