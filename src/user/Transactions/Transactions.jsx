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
import { useDispatch, useSelector } from "react-redux";
import { deleteTransaction } from "../../redux/transaction/transactionSlice";
import { useState } from "react";

function Transactions() {

  const user = useSelector(
    
    (state) => state.auth.user

  );

  const transactions = useSelector(

    (state) => state.transactions.transactions

  );

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const userTransactions = transactions.filter(
    (transaction) => transaction.userEmail === user?.email
  );

  const filteredTransactions = userTransactions.filter((transaction) =>{

    const matchesSearch = transaction.title
                          .toLowerCase()
                          .includes(search.toLowerCase());

    const matchesType = typeFilter === "all" ||
                        transaction.type === typeFilter;

    const matchesCategory = categoryFilter === 'all' ||
                            transaction.category === categoryFilter;

    return matchesSearch && matchesType && matchesCategory;

  });

  
  const dispatch = useDispatch();
 
  const handleDelete = (id) =>{

    dispatch(deleteTransaction(id));

  }

  

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
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}

                />

              </Col>


              <Col md={3}>

                <Form.Select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}>
                  <option value={"all"}>All</option>
                  <option value={"income"}>Income</option>
                  <option value={"expense"}>Expense</option>
                </Form.Select>

              </Col>


              <Col md={3}>

                <Form.Select 
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}>
                  <option value={"all"}>All Categories</option>
                  <option value={"food"}>Food</option>
                  <option value={"travel"}>Travel</option>
                  <option value={"shopping"}>Shopping</option>
                  <option value={"rent"}>Rent</option>
                  <option value={"salary"}>Salary</option>
                  <option value={"bills"}>Bills</option>
                  <option value={"health"}>health</option>
                  <option value={"other"}>Other</option>
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

                {filteredTransactions.length > 0 ?(
                  filteredTransactions.map((transaction) => (

                <tr key={transaction.id}>

                  <td className="fw-semibold">
                    {transaction.title}
                  </td>

                  <td>
                    {transaction.category}
                  </td>

                   <td>
                    {transaction.date}
                  </td>

                  <td>
                    <Badge bg={
                      transaction.type === "income"
                      ? "success"
                      : "danger"
                    }>
                      {transaction.type}
                    </Badge>
                  
                  </td>

                  <td className={
                    transaction.type === "income"
                    ? "text-success fw-semibold"
                    : "text-danger fw-semibold"
                    
                    }
                    
                    >
                    {transaction.type === "income"
                    ? "+"
                    : "-"
                    }
                    
                    {transaction.amount.toLocaleString("en-IN")}

                  </td>

                 

                  <td>

                    <Button
                      as={Link}
                      to={`/edit-transaction/${transaction.id}`}
                      variant="outline-primary"
                      size="sm"
                      className="me-2"
                    >
                      Edit
                    </Button>

                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDelete(transaction.id)}
                    >
                      Delete
                    </Button>

                  </td>

                </tr>

              ))

            ):(
                <tr>

                    <td
                      colSpan="6"
                      className="text-center text-muted py-4"
                    >
                      No transactions found
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

export default Transactions;