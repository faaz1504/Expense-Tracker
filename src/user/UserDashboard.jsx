import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  Container,Row,Col,Card,Button,Badge
} from "react-bootstrap";
import { useState } from "react";

const MONTH_OPTIONS = [
  { label: "All", value: "all" },
  { label: "Jan", value: "0" },
  { label: "Feb", value: "1" },
  { label: "Mar", value: "2" },
  { label: "Apr", value: "3" },
  { label: "May", value: "4" },
  { label: "Jun", value: "5" },
  { label: "Jul", value: "6" },
  { label: "Aug", value: "7" },
  { label: "Sep", value: "8" },
  { label: "Oct", value: "9" },
  { label: "Nov", value: "10" },
  { label: "Dec", value: "11" },
];


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

  const [selectedMonth, setselectedMonth] = useState("all");

  const currentYear = currentDate.getFullYear();

  const monthlyTransactions = userTransactions.filter((transaction) => {
    if (selectedMonth === "all") {
      return true;
    }

    if (!transaction.date) return false;

    const dateParts = String(transaction.date).split("-");
    if (dateParts.length >= 2) {
      const tYear = Number(dateParts[0]);
      const tMonth = Number(dateParts[1]) - 1;
      return (
        tMonth === Number(selectedMonth) &&
        (isNaN(tYear) || tYear === currentYear)
      );
    }

    const transactionDate = new Date(transaction.date);
    return (
      transactionDate.getMonth() === Number(selectedMonth) &&
      transactionDate.getFullYear() === currentYear
    );
  });


  

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



        {/* MONTH FILTER PILLS */}

        <div className="mb-4">

          <div
            className="month-pill-container"
            role="tablist"
            aria-label="Filter transactions by month"
          >

            {MONTH_OPTIONS.map((month) => {

              const isSelected = selectedMonth === month.value;

              return (

                <button
                  key={month.value}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  className={`month-pill-btn ${isSelected ? "active" : ""}`}
                  onClick={() => setselectedMonth(month.value)}
                >
                  {month.label}
                </button>

              );

            })}

          </div>

        </div>



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
                  {selectedMonth === "all" ? "All time" : "This month"}
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
                  {selectedMonth === "all" ? "All time" : "This month"}
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
                  {selectedMonth === "all" ? "Total entries" : "This month"}
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