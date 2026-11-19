import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Badge
} from "react-bootstrap";
import { useSelector } from "react-redux";
import {Link} from "react-router-dom"

function AdminDashboard() {

  const users = useSelector(
    (state) => state.auth.users
  );

  const transactions = useSelector(
    (state) => state.transactions.transactions
  );

  const normalUsers = users.filter(
    (user) => user.role === "user"
  );

  const activeUsers = normalUsers.filter(
    (user) => user.status !== false
  );

  const recentUsers = [...normalUsers]
    .sort((a, b) => b.id - a.id)
    .slice(0, 3);


  return (
    <Container
      fluid
      className="bg-light py-4"
      style={{ minHeight: "100vh" }}
    >

      <Container>

        {/* HEADER */}

        <div className="mb-4">
          <p className="text-muted small mb-1">
            Admin Panel
          </p>

          <h3 className="fw-semibold mb-1">
            Dashboard
          </h3>

          <p className="text-muted small mb-0">
            Monitor users and application activity
          </p>
        </div>


        {/* SUMMARY CARDS */}

        <Row className="g-3 mb-4">

          <Col md={4}>

            <Card className="border shadow-sm h-100">

              <Card.Body className="p-3">

                <p className="text-muted small mb-1 fw-medium">
                  Total Users
                </p>

                <h3 className="fw-semibold mb-1">
                  {normalUsers.length}
                </h3>

                <small className="text-muted">
                  Registered accounts
                </small>

              </Card.Body>

            </Card>

          </Col>


          <Col md={4}>

            <Card className="border shadow-sm h-100">

              <Card.Body className="p-3">

                <p className="text-muted small mb-1 fw-medium">
                  Total Transactions
                </p>

                <h3 className="fw-semibold mb-1">
                  {transactions.length}
                </h3>

                <small className="text-muted">
                  All transactions
                </small>

              </Card.Body>

            </Card>

          </Col>


          <Col md={4}>

            <Card className="border shadow-sm h-100">

              <Card.Body className="p-3">

                <p className="text-muted small mb-1 fw-medium">
                  Active Users
                </p>

                <h3 className="fw-semibold text-success mb-1">
                  {activeUsers.length}
                </h3>

                <small className="text-muted">
                  Currently active
                </small>

              </Card.Body>

            </Card>

          </Col>

        </Row>


        {/* USERS TABLE */}

        <Card className="border shadow-sm">

          <Card.Body>

            <div className="d-flex justify-content-between align-items-center mb-3">

              <h4 className="mb-0">
                Recent Users
              </h4>

              <Link
                    to="/admin-transactions"
                    className="text-decoration-none"
                  >
                    View All
                  </Link>

            </div>


            <Table
              responsive
              hover
              className="align-middle mb-0"
            >

              <thead className="table-light">

                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                </tr>

              </thead>


              <tbody>

                {recentUsers.length > 0 ? (

                  recentUsers.map((user) => (

                    <tr key={user.id}>

                      <td className="fw-semibold">
                        {user.name}
                      </td>

                      <td>
                        {user.email}
                      </td>

                      <td className="text-capitalize">
                        {user.role}
                      </td>

                      <td>

                        <Badge
                          bg={
                            user.status === false
                            ? "secondary"
                            : "success"
                          }
                        >
                          {user.status === false ? "Inactive" : "Active"}
                        </Badge>

                      </td>

                    </tr>

                  ))

                ) : (

                  <tr>

                    <td
                      colSpan="4"
                      className="text-center text-muted py-4"
                    >
                      No users registered yet
                    </td>

                  </tr>

                )}

              </tbody>

            </Table>

          </Card.Body>

        </Card>

      </Container>

    </Container>
  );
}

export default AdminDashboard;