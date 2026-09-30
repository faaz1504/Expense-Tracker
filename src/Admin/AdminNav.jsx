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

        navigate('/sign-in');


    }



  return (
    <Navbar
      bg="dark"
      data-bs-theme="dark"
      className="py-2"
    >

      <Container fluid>

        <Navbar.Brand
          as={Link}
          to="/admin-dashboard"
          className="fw-bold"
        >
          EXpensoo Admin
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