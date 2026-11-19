import {
  Container,
  Row,
  Col,
  Card
} from "react-bootstrap";

function About() {
  return (
    <Container fluid className="bg-light py-5">

      <Container>

        {/* ABOUT HEADER */}

        <Row className="justify-content-center text-center mb-5">

          <Col md={8}>

            <p className="text-muted small fw-semibold text-uppercase mb-2">
              About EXpensoo
            </p>

            <h2 className="fw-semibold mb-3">
              Manage Your Money Smarter
            </h2>

            <p className="text-muted fs-6">
              EXpensoo is a simple expense tracking application
              that helps you record income, manage daily expenses,
              and understand where your money goes.
            </p>

          </Col>

        </Row>


        {/* FEATURES */}

        <Row className="g-4 mb-5">

          <Col md={4}>

            <Card className="border shadow-sm h-100 text-center">

              <Card.Body className="p-4">

                <h5 className="fw-semibold mb-2">
                  Track Income
                </h5>

                <p className="text-muted small mb-0">
                  Record salary, freelance returns, bonuses,
                  and other sources of income.
                </p>

              </Card.Body>

            </Card>

          </Col>


          <Col md={4}>

            <Card className="border shadow-sm h-100 text-center">

              <Card.Body className="p-4">

                <h5 className="fw-semibold mb-2">
                  Manage Expenses
                </h5>

                <p className="text-muted small mb-0">
                  Log your daily expenses including food,
                  travel, shopping, rent, and bills.
                </p>

              </Card.Body>

            </Card>

          </Col>


          <Col md={4}>

            <Card className="border shadow-sm h-100 text-center">

              <Card.Body className="p-4">

                <h5 className="fw-semibold mb-2">
                  Know Your Balance
                </h5>

                <p className="text-muted small mb-0">
                  Automatically calculates your total income,
                  total expenses, and remaining balance.
                </p>

              </Card.Body>

            </Card>

          </Col>

        </Row>


        {/* HOW IT WORKS */}

        <Row className="align-items-center py-4">

          <Col lg={6} className="mb-4 mb-lg-0">

            <h3 className="fw-semibold mb-3">
              How EXpensoo Works
            </h3>

            <p className="text-muted small">
              Start by creating an account and signing in.
              Then add your income and expense transactions.
            </p>

            <p className="text-muted small">
              Your dashboard gives you a clean view of your
              total income, total expenses, and current balance.
            </p>

          </Col>


          <Col lg={6}>

            <Card className="border shadow-sm">

              <Card.Body className="p-4">

                <div className="mb-4">
                  <h6 className="fw-semibold mb-1">
                    1. Add Income
                  </h6>

                  <p className="text-muted small mb-0">
                    Add salary or any incoming credit.
                  </p>
                </div>


                <div className="mb-4">
                  <h6 className="fw-semibold mb-1">
                    2. Add Expenses
                  </h6>

                  <p className="text-muted small mb-0">
                    Record your daily spending.
                  </p>
                </div>


                <div>
                  <h6 className="fw-semibold mb-1">
                    3. Track Your Balance
                  </h6>

                  <p className="text-muted small mb-0">
                    View your financial summary directly on the dashboard.
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

export default About;