import { Link } from "react-router-dom";

import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Table,
  Badge
} from "react-bootstrap";

function Transactions() {

  return (
    <Container
      fluid
      className="bg-light py-5"
      style={{ minHeight: "100vh" }}
    >

      <Container>

        {/* HEADER */}

        <Row className="align-items-center mb-4">

          <Col md={8}>
            <h2 className="fw-bold">
              Transactions
            </h2>

            <p className="text-muted mb-0">
              View and manage all your income and expenses.
            </p>
          </Col>

          <Col
            md={4}
            className="text-md-end mt-3 mt-md-0"
          >
            <Button
              as={Link}
              to="/Add-transactions"
              variant="primary"
            >
              + Add Transaction
            </Button>
          </Col>

        </Row>


        {/* SEARCH AND FILTER */}

        <Card className="border-0 shadow-sm mb-4">

          <Card.Body>

            <Row className="g-3">

              <Col md={6}>

                <Form.Control
                  type="text"
                  placeholder="Search transactions..."
                />

              </Col>


              <Col md={3}>

                <Form.Select>
                  <option>All</option>
                  <option>Income</option>
                  <option>Expense</option>
                </Form.Select>

              </Col>


              <Col md={3}>

                <Form.Select>
                  <option>All Categories</option>
                  <option>Food</option>
                  <option>Travel</option>
                  <option>Shopping</option>
                  <option>Salary</option>
                  <option>Bills</option>
                </Form.Select>

              </Col>

            </Row>

          </Card.Body>

        </Card>


        {/* TRANSACTION TABLE */}

        <Card className="border-0 shadow-sm">

          <Card.Body>

            <Table
              responsive
              hover
              className="align-middle mb-0"
            >

              <thead className="table-light">

                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Date</th>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Action</th>
                </tr>

              </thead>


              <tbody>

                {/* SALARY */}

                <tr>

                  <td className="fw-semibold">
                    Salary
                  </td>

                  <td>
                    Salary
                  </td>

                  <td>
                    Aug 30
                  </td>

                  <td>
                    <Badge bg="success">
                      Income
                    </Badge>
                  </td>

                  <td className="text-success fw-semibold">
                    + ₹30,000
                  </td>

                  <td>

                    <Button
                      as={Link}
                      to="/edit-transaction"
                      variant="outline-primary"
                      size="sm"
                      className="me-2"
                    >
                      Edit
                    </Button>

                    <Button
                      variant="outline-danger"
                      size="sm"
                    >
                      Delete
                    </Button>

                  </td>

                </tr>


                {/* GROCERIES */}

                <tr>

                  <td className="fw-semibold">
                    Groceries
                  </td>

                  <td>
                    Food
                  </td>

                  <td>
                    Aug 29
                  </td>

                  <td>
                    <Badge bg="danger">
                      Expense
                    </Badge>
                  </td>

                  <td className="text-danger fw-semibold">
                    - ₹1,500
                  </td>

                  <td>

                    <Button
                      as={Link}
                      to="/edit-transaction"
                      variant="outline-primary"
                      size="sm"
                      className="me-2"
                    >
                      Edit
                    </Button>

                    <Button
                      variant="outline-danger"
                      size="sm"
                    >
                      Delete
                    </Button>

                  </td>

                </tr>


                {/* PETROL */}

                <tr>

                  <td className="fw-semibold">
                    Petrol
                  </td>

                  <td>
                    Travel
                  </td>

                  <td>
                    Aug 28
                  </td>

                  <td>
                    <Badge bg="danger">
                      Expense
                    </Badge>
                  </td>

                  <td className="text-danger fw-semibold">
                    - ₹1,000
                  </td>

                  <td>

                    <Button
                      as={Link}
                      to="/edit-transaction"
                      variant="outline-primary"
                      size="sm"
                      className="me-2"
                    >
                      Edit
                    </Button>

                    <Button
                      variant="outline-danger"
                      size="sm"
                    >
                      Delete
                    </Button>

                  </td>

                </tr>


                {/* SHOPPING */}

                <tr>

                  <td className="fw-semibold">
                    Shopping
                  </td>

                  <td>
                    Shopping
                  </td>

                  <td>
                    Aug 27
                  </td>

                  <td>
                    <Badge bg="danger">
                      Expense
                    </Badge>
                  </td>

                  <td className="text-danger fw-semibold">
                    - ₹2,000
                  </td>

                  <td>

                    <Button
                      as={Link}
                      to="/edit-transaction"
                      variant="outline-primary"
                      size="sm"
                      className="me-2"
                    >
                      Edit
                    </Button>

                    <Button
                      variant="outline-danger"
                      size="sm"
                    >
                      Delete
                    </Button>

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

export default Transactions;