import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";

function AdminNavbar() {

    const dispatch =useDispatch()

    const navigate = useNavigate()

    const handleLogout = ()=>{

        dispatch(logout());

        navigate("/");


    }



  return (
    <Navbar
      bg="dark"
      data-bs-theme="dark"
      className="py-3"
    >

      <Container fluid>

        <Navbar.Brand
          as={Link}
          to="/AdminDashboard"
          className="fw-bold fs-5 d-flex align-items-center gap-2"
        >
          <span style={{ letterSpacing: "-0.03em" }}>EXpensoo</span>
          <span
            className="badge bg-secondary text-uppercase"
            style={{ fontSize: "0.65rem", padding: "0.2rem 0.5rem" }}
          >
            Admin
          </span>
        </Navbar.Brand>

        <Button
          variant="outline-danger"
          size="sm"
          onClick={handleLogout}
        >
          Logout
        </Button>

      </Container>

    </Navbar>
  );
}

export default AdminNavbar;