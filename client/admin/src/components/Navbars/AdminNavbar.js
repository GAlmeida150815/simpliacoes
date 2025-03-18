
import { Link } from "react-router-dom";
// reactstrap components
import {
  Button,
  Navbar,
  Nav,
  Container,
} from "reactstrap";

import { useAuth } from 'components/Hooks/AuthContext';

const AdminNavbar = (props) => {
  const { logout } = useAuth();

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
  }

  return (
    <>
      <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
        <Container fluid>
          <Link
            className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
            to="/"
          >
            {props.brandText}
          </Link>
          <Nav className="align-items-center d-none d-md-flex" navbar>
            <Button
              className="my-4"
              color="danger"
              type="button"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default AdminNavbar;
