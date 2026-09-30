import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

function PublicNavbar() {
  return (
    <Navbar
      expand="lg"
      bg="dark"
      data-bs-theme="dark"
      sticky="top"
      className="py-2"
    >
      <Container>

        <Navbar.Brand
          as={Link}
          to="/"
          className="fw-bold fs-4"
        >
          EXpensoo
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="public-navbar" />

        <Navbar.Collapse id="public-navbar">

          <Nav className="ms-auto align-items-lg-center gap-lg-3">

            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>

            <Nav.Link as={Link} to="/about">
              About
            </Nav.Link>

            <Nav.Link as={Link} to="/sign-in">
              Sign In
            </Nav.Link>

            <Button
              as={Link}
              to="/sign-up"
              variant="primary"
              size="sm"
            >
              Sign Up
            </Button>

          </Nav>

        </Navbar.Collapse>

      </Container>
    </Navbar>
  );
}

export default PublicNavbar;