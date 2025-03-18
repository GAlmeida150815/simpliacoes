
/*eslint-disable*/

// reactstrap components
import { NavItem, NavLink, Nav, Container, Row, Col } from "reactstrap";

const Login = () => {
  return (
    <>
      <footer className="py-5">
        <Container>
          <Row className="align-items-center justify-content-xl-between">
            <Col xl="6">
              <div className="copyright text-center text-xl-left text-muted">
                © {new Date().getFullYear()}{" "}
                <a
                  className="font-weight-bold ml-1"
                  href="https://www.instagram.com/almeida_150815/"
                  target="_blank"
                >
                  Gonçalo Almeida
                </a>
              </div>
            </Col>
            <Col xl="6">
              <Nav className="nav-footer justify-content-center justify-content-xl-end">
                <NavItem>
                  <NavLink
                    href="https://www.instagram.com/almeida_150815/"
                    target="_blank"
                  >
                    Gonçalo Almeida
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    href="https://simpliacoes.pt"
                    target="_blank"
                  >
                    Blog
                  </NavLink>
                </NavItem>
              </Nav>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
};

export default Login;
