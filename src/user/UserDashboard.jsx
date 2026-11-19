import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  Container,Row,Col,Card,Button,Badge,Form
} from "react-bootstrap";
import { useState } from "react";


function UserDashboard() {

  
  const user = useSelector(
    (state) => state.auth.user
  );

  const transactions = useSelector((state) => state.transactions.transactions
  );


  const userTransactions = transactions.filter((transaction) =>
      transaction.userEmail === user?.email
  );

const currentDate = new Date();

  const [selectedMonth,setselectedMonth] = useState(currentDate.getMonth());

  // const currentMonth = currentDate.getMonth();

  const currentYear = currentDate.getFullYear();

    const monthlyTransactions = userTransactions.filter((transaction) =>{

    const transactionDate = new Date(transaction.date);

    return (transactionDate.getMonth() === Number(selectedMonth) &&
            transactionDate.getFullYear() === currentYear 
          );


  })


  

  const totalIncome = monthlyTransactions
    .filter((transaction) =>
        transaction.type === "income"
    )
    .reduce((total, transaction) =>
        total + Number(transaction.amount),
      0
    );



  const totalExpense = monthlyTransactions
    .filter((transaction) =>
        transaction.type === "expense"
    )
    .reduce((total, transaction) =>
        total + Number(transaction.amount),
      0
    );




  const balance = totalIncome - totalExpense;




  const totalTransactions =
    monthlyTransactions.length;


  const recentTransactions = [...monthlyTransactions]
    .sort((a, b) => b.id - a.id)
    .slice(0, 4);


  return (

    <Container
      fluid
      className="bg-light py-4"
      style={{ minHeight: "100vh" }}
    >

      <Container>


        {/* HEADER */}

        <Row className="align-items-center mb-4">

          <Col>

            <p className="text-muted mb-1 small">
              Welcome back, {user?.name}
            </p>

            <h3 className="fw-semibold mb-0">
              Dashboard
            </h3>

          </Col>


          <Col
            xs="auto"
            className="mt-3 mt-md-0"
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



        {/* SUMMARY CARDS */}

        <Row className="g-3 mb-4">


          {/* BALANCE */}

          <Col xs={12} sm={6} lg={3}>

            <Card className="border shadow-sm h-100">

              <Card.Body className="p-3">

                <p className="text-muted mb-2 small fw-medium">
                  Current Balance
                </p>

                <h3 className="fw-semibold mb-1">
                  ₹{balance.toLocaleString("en-IN")}
                </h3>

                <small className="text-muted">
                  Available funds
                </small>

              </Card.Body>

            </Card>

          </Col>



          {/* INCOME */}

          <Col xs={12} sm={6} lg={3}>

            <Card className="border shadow-sm h-100">

              <Card.Body className="p-3">

                <p className="text-muted mb-2 small fw-medium">
                  Total Income
                </p>

                <h3 className="fw-semibold text-success mb-1">
                  ₹{totalIncome.toLocaleString("en-IN")}
                </h3>

                <small className="text-muted">
                  This month
                </small>

              </Card.Body>

            </Card>

          </Col>



          {/* EXPENSE */}

          <Col xs={12} sm={6} lg={3}>

            <Card className="border shadow-sm h-100">

              <Card.Body className="p-3">

                <p className="text-muted mb-2 small fw-medium">
                  Total Expense
                </p>

                <h3 className="fw-semibold text-danger mb-1">
                  ₹{totalExpense.toLocaleString("en-IN")}
                </h3>

                <small className="text-muted">
                  This month
                </small>

              </Card.Body>

            </Card>

          </Col>



          {/* TRANSACTIONS */}

          <Col xs={12} sm={6} lg={3}>

            <Card className="border shadow-sm h-100">

              <Card.Body className="p-3">

                <p className="text-muted mb-2 small fw-medium">
                  Transactions
                </p>

                <h3 className="fw-semibold mb-1">
                  {totalTransactions}
                </h3>

                <small className="text-muted">
                  Total entries
                </small>

              </Card.Body>

            </Card>

          </Col>

        </Row>



        {/* BOTTOM SECTION */}

        <Row className="g-4">

          


          {/* RECENT TRANSACTIONS */}

          <Col lg={8}>
          

            <Card className="border shadow-sm h-100">

              <Card.Body className="p-3 p-md-4">

                <div className="d-flex justify-content-between align-items-center mb-3">

                  <h5 className="fw-semibold mb-0">
                    Recent Transactions
                  </h5>
                
                <div  className="d-flex align-items-center gap-2">

                   <Form.Select
                  size="sm"
                  value={selectedMonth}
                  onChange={(e) => setselectedMonth(e.target.value)}
                  style={{ width: "auto" }}
                  >
                    <option value="0">January</option>
                    <option value="1">February</option>
                    <option value="2">March</option>
                    <option value="3">April</option>
                    <option value="4">May</option>
                    <option value="5">June</option>
                    <option value="6">July</option>
                    <option value="7">August</option>
                    <option value="8">September</option>
                    <option value="9">October</option>
                    <option value="10">November</option>
                    <option value="11">December</option>
                  </Form.Select>

              </div>

                  <Link
                    to="/user-transactions"
                    className="text-decoration-none small fw-medium text-muted"
                  >
                    View all
                  </Link>

                </div>

                


                {recentTransactions.length > 0 ? (

                  recentTransactions.map(
                    (transaction) => (

                      <div
                        key={transaction.id}
                        className="d-flex justify-content-between align-items-center border-bottom py-3"
                      >

                        <div>

                          <h6 className="fw-semibold mb-1">
                            {transaction.title}
                          </h6>

                          <small className="text-muted">

                            {transaction.category}

                            {" • "}

                            {transaction.date}

                          </small>

                        </div>


                        <div className="text-end">

                          <Badge
                            bg={
                              transaction.type === "income"
                                ? "success"
                                : "danger"
                            }
                            className="mb-1"
                          >
                            {transaction.type}
                          </Badge>

                          <div
                            className={
                              transaction.type === "income"
                                ? "text-success fw-bold"
                                : "text-danger fw-bold"
                            }
                          >

                            {transaction.type === "income"
                              ? "+"
                              : "-"
                            }

                            ₹{Number(
                              transaction.amount
                            ).toLocaleString("en-IN")}

                          </div>

                        </div>

                      </div>
                      

                    )
                  )

                ) : (

                  <div className="text-center py-5">

                    <p className="text-muted">
                      No transactions yet
                    </p>

                    <Button
                      as={Link}
                      to="/Add-transactions"
                      size="sm"
                    >
                      Add your first transaction
                    </Button>

                  </div>

                )}

              </Card.Body>

            </Card>

          </Col>

          <Col lg={4}>

  <Card className="border shadow-sm h-100">

    <Card.Body className="p-3 p-md-4">

      <h5 className="fw-semibold mb-3">
        Tips
      </h5>

      <div className="mb-3 pb-3 border-bottom">

        <h6 className="fw-medium mb-1" style={{ fontSize: "0.9rem" }}>
          Track daily expenses
        </h6>

        <p className="text-muted small mb-0">
          Small everyday expenses add up quickly over a month.
        </p>

      </div>


      <div className="mb-3 pb-3 border-bottom">

        <h6 className="fw-medium mb-1" style={{ fontSize: "0.9rem" }}>
          Review categories
        </h6>

        <p className="text-muted small mb-0">
          Check which categories consume the most of your income.
        </p>

      </div>


      <div>

        <h6 className="fw-medium mb-1" style={{ fontSize: "0.9rem" }}>
          Save systematically
        </h6>

        <p className="text-muted small mb-0">
          Try to maintain a positive balance by setting aside savings first.
        </p>

      </div>

    </Card.Body>

  </Card>

</Col>



         

        </Row>

      </Container>

    </Container>

  );
}

export default UserDashboard;