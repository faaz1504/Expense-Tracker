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
          <p className="text-muted mb-1">
            ADMIN PANEL
          </p>

          <h2 className="fw-bold">
            Admin Dashboard
          </h2>

          <p className="text-muted">
            Monitor users and application activity.
          </p>
        </div>


        {/* SUMMARY CARDS */}

        <Row className="g-3 mb-4">

          <Col md={4}>

            <Card className="border-0 shadow-sm h-100">

              <Card.Body>

                <p className="text-muted mb-2">
                  Total Users
                </p>

                <h2 className="fw-bold">
                  {normalUsers.length}
                </h2>

                <small className="text-muted">
                  Registered users
                </small>

              </Card.Body>

            </Card>

          </Col>


          <Col md={4}>

            <Card className="border-0 shadow-sm h-100">

              <Card.Body>

                <p className="text-muted mb-2">
                  Total Transactions
                </p>

                <h2 className="fw-bold">
                  {transactions.length}
                </h2>

                <small className="text-muted">
                  All transactions
                </small>

              </Card.Body>

            </Card>

          </Col>


          <Col md={4}>

            <Card className="border-0 shadow-sm h-100">

              <Card.Body>

                <p className="text-muted mb-2">
                  Active Users
                </p>

                <h2 className="fw-bold">
                  {activeUsers.length}
                </h2>

                <small className="text-muted">
                  Currently active accounts
                </small>

              </Card.Body>

            </Card>

          </Col>

        </Row>


        {/* USERS TABLE */}

        <Card className="border-0 shadow-sm">

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