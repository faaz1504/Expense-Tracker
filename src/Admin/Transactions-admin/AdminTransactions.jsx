import {
  Container,
  Card,
  Table,
  Badge,
  Form,
  Row,
  Col
} from "react-bootstrap";
import { useSelector } from "react-redux";
import { useState } from "react";

function AdminTransactions(){

    const transactions = useSelector(
        (state) => state.transactions.transactions
    )

    const [search,setSearch] = useState("");

    const [typeFilter,setTypeFilter] = useState("all");


    const filteredTransactions = transactions.filter((transaction) => {

        const searchValue = search.toLowerCase().trim();

        const matchesSearch =
            transaction.title?.toLowerCase().includes(searchValue) ||
            transaction.userEmail?.toLowerCase().includes(searchValue) ||
            transaction.category?.toLowerCase().includes(searchValue);

        const matchesType =
            typeFilter === "all" ||
            transaction.type === typeFilter;

        return matchesSearch && matchesType;

    });


    return(
        <div>

        <Container fluid className="py-4">

      <div className="mb-4">

        <h2 className="fw-bold mb-1">
          Transactions
        </h2>

        <p className="text-muted mb-0">
          View all user transactions
        </p>

      </div>


      <Card className="border-0 shadow-sm rounded-4">

        <Card.Header className="bg-white border-0 py-3">

          <Row className="g-3 align-items-center">

            <Col md={6}>

              <Form.Control
                type="text"
                placeholder="Search by title, email or category..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

            </Col>


            <Col md={3}>

              <Form.Select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              >

                <option value="all">
                  All Types
                </option>

                <option value="income">
                  Income
                </option>

                <option value="expense">
                  Expense
                </option>

              </Form.Select>

            </Col>


            <Col md={3} className="text-md-end">

              <Badge
                bg="primary"
                pill
                className="px-3 py-2"
              >
                {filteredTransactions.length} Transactions
              </Badge>

            </Col>

          </Row>

        </Card.Header>


        <Card.Body className="p-0">

          <Table
            responsive
            hover
            className="align-middle mb-0"
          >

            <thead className="table-light">

              <tr>
                <th className="ps-4 py-3">User</th>
                <th>Title</th>
                <th>Category</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Date</th>
              </tr>

            </thead>


            <tbody>

              {filteredTransactions.length > 0 ? (

                filteredTransactions.map((transaction) => (

                  <tr key={transaction.id}>

                    <td className="ps-4 text-muted">
                      {transaction.userEmail}
                    </td>

                    <td className="fw-semibold">
                      {transaction.title}
                    </td>

                    <td className="text-capitalize">
                      {transaction.category}
                    </td>

                    <td>

                      <Badge
                        bg={
                          transaction.type === "income"
                          ? "success"
                          : "danger"
                        }
                      >
                        {transaction.type}
                      </Badge>

                    </td>

                    <td className={
                      transaction.type === "income"
                      ? "text-success fw-semibold"
                      : "text-danger fw-semibold"
                    }>

                      {transaction.type === "income" ? "+" : "-"}

                      ₹{Number(transaction.amount).toLocaleString("en-IN")}

                    </td>

                    <td>
                      {transaction.date}
                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan="6"
                    className="text-center text-muted py-5"
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

    </div>

    )

}

export default AdminTransactions;