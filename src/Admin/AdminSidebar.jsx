import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";

function AdminSidebar() {

  return (
    <div
      className="bg-dark text-white vh-100 position-fixed top-0 start-0 p-4"
      style={{ width: "240px" }}
    >

      <h4 className="fw-bold mb-5">
        EXpensoo
      </h4>

      <Nav className="flex-column gap-3">

        <Nav.Link
          as={Link}
          to="/AdminDashboard"
          className="text-white"
        >
          Dashboard
        </Nav.Link>

        <Nav.Link
          as={Link}
          to="/admin-users"
          className="text-white"
        >
          Users
        </Nav.Link>

        <Nav.Link
          as={Link}
          to="/admin-transactions"
          className="text-white"
        >
          Transactions
        </Nav.Link>

        <Nav.Link
          as={Link}
          to="/admin-profile"
          className="text-white"
        >
          Profile
        </Nav.Link>

      </Nav>

    </div>
  );
}

export default AdminSidebar;