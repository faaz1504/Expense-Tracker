import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";

function AdminSidebar() {

  return (
    <div
      className="bg-dark text-white vh-100 position-fixed top-0 start-0 p-4"
      style={{
        width: "240px",
        borderRight: "1px solid rgba(255, 255, 255, 0.08)",
        background: "#18181b",
        zIndex: 1020
      }}
    >

      <div className="mb-4 pb-3" style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.08)" }}>
        <h5 className="fw-semibold mb-1 text-white" style={{ letterSpacing: "-0.02em" }}>
          EXpensoo
        </h5>
        <small className="text-muted" style={{ fontSize: "0.75rem" }}>
          Admin Panel
        </small>
      </div>

      <Nav className="flex-column gap-1">

        <Nav.Link
          as={Link}
          to="/AdminDashboard"
          className="text-white py-2 px-3 rounded"
          style={{ fontSize: "0.9rem" }}
        >
          Dashboard
        </Nav.Link>

        <Nav.Link
          as={Link}
          to="/admin-users"
          className="text-white py-2 px-3 rounded"
          style={{ fontSize: "0.9rem" }}
        >
          Users
        </Nav.Link>

        <Nav.Link
          as={Link}
          to="/admin-transactions"
          className="text-white py-2 px-3 rounded"
          style={{ fontSize: "0.9rem" }}
        >
          Transactions
        </Nav.Link>

        <Nav.Link
          as={Link}
          to="/admin-profile"
          className="text-white py-2 px-3 rounded"
          style={{ fontSize: "0.9rem" }}
        >
          Profile
        </Nav.Link>

      </Nav>

    </div>
  );
}

export default AdminSidebar;