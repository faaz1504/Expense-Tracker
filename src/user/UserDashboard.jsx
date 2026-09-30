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

            <p className="text-muted mb-1">
              Welcome, {user?.name}
            </p>

            <h2 className="fw-bold mb-0">
              Manage your money wisely
            </h2>

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

            <Card className="border-0 shadow-sm h-100">

              <Card.Body>

                <p className="text-muted mb-2">
                  Current Balance
                </p>

                <h3 className="fw-bold">
                  ₹{balance.toLocaleString("en-IN")}
                </h3>

                <small className="text-muted">
                  Available balance
                </small>

              </Card.Body>

            </Card>

          </Col>



          {/* INCOME */}

          <Col xs={12} sm={6} lg={3}>

            <Card className="border-0 shadow-sm h-100">

              <Card.Body>

                <p className="text-muted mb-2">
                  Total Income
                </p>

                <h3 className="fw-bold text-success">
                  ₹{totalIncome.toLocaleString("en-IN")}
                </h3>

                <small className="text-muted">
                  Total income
                </small>

              </Card.Body>

            </Card>

          </Col>



          {/* EXPENSE */}

          <Col xs={12} sm={6} lg={3}>

            <Card className="border-0 shadow-sm h-100">

              <Card.Body>

                <p className="text-muted mb-2">
                  Total Expense
                </p>

                <h3 className="fw-bold text-danger">
                  ₹{totalExpense.toLocaleString("en-IN")}
                </h3>

                <small className="text-muted">
                  Total spending
                </small>

              </Card.Body>

            </Card>

          </Col>



          {/* TRANSACTIONS */}

          <Col xs={12} sm={6} lg={3}>

            <Card className="border-0 shadow-sm h-100">

              <Card.Body>

                <p className="text-muted mb-2">
                  Transactions
                </p>

                <h3 className="fw-bold">
                  {totalTransactions}
                </h3>

                <small className="text-muted">
                  Total transactions
                </small>

              </Card.Body>

            </Card>

          </Col>

        </Row>



        {/* BOTTOM SECTION */}

        <Row className="g-4">

          


          {/* RECENT TRANSACTIONS */}

          <Col lg={8}>
          

            <Card className="border-0 shadow-sm h-100">

              <Card.Body>

                <div className="d-flex justify-content-between align-items-center mb-3">

                  <h5 className="fw-bold mb-0">
                    Recent Transactions
                  </h5>
                
                <div  className="d-flex align-items-center gap-2">

                   <Form.Select
                  value={selectedMonth}
                  onChange={(e) => setselectedMonth(e.target.value)}
                  className="mt-3 xs-auto"
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
                    className="text-decoration-none"
                  >
                    View All
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

  <Card className="border-0 shadow-sm h-100">

    <Card.Body>

      <h5 className="fw-bold mb-4">
        Money Tips
      </h5>

      <div className="mb-4">

        <h6 className="fw-semibold">
          Track every expense
        </h6>

        <p className="text-muted small mb-0">
          Small daily expenses can make a big difference over time.
        </p>

      </div>


      <div className="mb-4">

        <h6 className="fw-semibold">
          Review your spending
        </h6>

        <p className="text-muted small mb-0">
          Check your transactions regularly to understand where your money goes.
        </p>

      </div>


      <div>

        <h6 className="fw-semibold">
          Save before you spend
        </h6>

        <p className="text-muted small mb-0">
          Try to keep a portion of your income aside for savings.
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