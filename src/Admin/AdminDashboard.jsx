import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Badge
} from "react-bootstrap";

function AdminDashboard() {

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
                  25
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
                  148
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
                  20
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

              <span className="text-primary">
                View All
              </span>

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

                <tr>

                  <td>Rahul</td>

                  <td>
                    rahul@gmail.com
                  </td>

                  <td>
                    User
                  </td>

                  <td>
                    <Badge bg="success">
                      Active
                    </Badge>
                  </td>

                </tr>


                <tr>

                  <td>Fathima</td>

                  <td>
                    fathima@gmail.com
                  </td>

                  <td>
                    User
                  </td>

                  <td>
                    <Badge bg="success">
                      Active
                    </Badge>
                  </td>

                </tr>


                <tr>

                  <td>Arjun</td>

                  <td>
                    arjun@gmail.com
                  </td>

                  <td>
                    User
                  </td>

                  <td>
                    <Badge bg="secondary">
                      Inactive
                    </Badge>
                  </td>

                </tr>

              </tbody>

            </Table>

          </Card.Body>

        </Card>

      </Container>

    </Container>
  );
}

export default AdminDashboard;