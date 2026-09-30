import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

function UserNavbar() {
  return (
    <Navbar
      expand="lg"
      sticky="top"
      bg="dark"
      data-bs-theme="dark"
      className="py-2"
    >
      <Container>

        <Navbar.Brand
          as={Link}
          to="/user-dashboard"
          className="fw-bold fs-4"
        >
          EXpensoo
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="user-navbar" />

        <Navbar.Collapse id="user-navbar">

          <Nav className="ms-auto align-items-lg-center gap-lg-3">

            <Nav.Link as={Link} to="/user-dashboard">
              Dashboard
            </Nav.Link>

            <Nav.Link as={Link} to="/user-transactions">
              Transactions
            </Nav.Link>

            <Nav.Link as={Link} to="/user-profile">
              Profile
            </Nav.Link>

            {/* <Button
              variant="outline-danger"
              size="sm"
            >
              Logout
            </Button> */}

          </Nav>

        </Navbar.Collapse>

      </Container>
    </Navbar>
  );
}

export default UserNavbar;