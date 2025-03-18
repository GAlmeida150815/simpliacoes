
import { Link } from "react-router-dom";

// reactstrap components
import {
  NavbarBrand,
  Navbar,
  Container,
  Row,
  Col,
} from "reactstrap";

const AdminNavbar = () => {
  return (
    <>
      <Navbar className="navbar-top navbar-horizontal navbar-dark" expand="md">
        <Container className="px-4">
          <NavbarBrand to="/" tag={Link}>
            <img
              alt="..."
              src={require("../../assets/img/brand/logo.png")}
            />
          </NavbarBrand>
          <div className="navbar-collapse-header d-md-none">
            <Row>
              <Col className="collapse-brand" xs="12">
                <Link to="/">
                  <img
                    alt="..."
                    src={require("../../assets/img/brand/argon-react.png")}
                  />
                </Link>
              </Col>
            </Row>
          </div>
        </Container>
      </Navbar>
    </>
  );
};

export default AdminNavbar;
