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

            <p className="text-primary fw-semibold mb-2">
              ABOUT EXPENSOO
            </p>

            <h1 className="fw-bold mb-3">
              Manage Your Money Smarter
            </h1>

            <p className="text-muted fs-5">
              EXpensoo is a simple expense tracking application
              that helps users record income, manage expenses,
              and understand where their money goes.
            </p>

          </Col>

        </Row>


        {/* FEATURES */}

        <Row className="g-4 mb-5">

          <Col md={4}>

            <Card className="border-0 shadow-sm h-100 text-center">

              <Card.Body className="p-4">

                <h4 className="fw-bold">
                  Track Income
                </h4>

                <p className="text-muted mb-0">
                  Add salary, freelance income, bonuses,
                  and other sources of income.
                </p>

              </Card.Body>

            </Card>

          </Col>


          <Col md={4}>

            <Card className="border-0 shadow-sm h-100 text-center">

              <Card.Body className="p-4">

                <h4 className="fw-bold">
                  Manage Expenses
                </h4>

                <p className="text-muted mb-0">
                  Record daily expenses such as food,
                  travel, shopping, rent and bills.
                </p>

              </Card.Body>

            </Card>

          </Col>


          <Col md={4}>

            <Card className="border-0 shadow-sm h-100 text-center">

              <Card.Body className="p-4">

                <h4 className="fw-bold">
                  Know Your Balance
                </h4>

                <p className="text-muted mb-0">
                  EXpensoo automatically calculates your
                  total income, expenses and remaining balance.
                </p>

              </Card.Body>

            </Card>

          </Col>

        </Row>


        {/* HOW IT WORKS */}

        <Row className="align-items-center py-4">

          <Col lg={6} className="mb-4 mb-lg-0">

            <h2 className="fw-bold mb-3">
              How EXpensoo Works
            </h2>

            <p className="text-muted">
              Start by creating an account and signing in.
              Then add your income and expense transactions.
            </p>

            <p className="text-muted">
              Your dashboard gives you a quick view of your
              total income, total expenses and current balance.
            </p>

          </Col>


          <Col lg={6}>

            <Card className="border-0 shadow-sm">

              <Card.Body className="p-4">

                <div className="mb-4">
                  <h5 className="fw-bold">
                    1. Add Income
                  </h5>

                  <p className="text-muted mb-0">
                    Add salary or any other income.
                  </p>
                </div>


                <div className="mb-4">
                  <h5 className="fw-bold">
                    2. Add Expenses
                  </h5>

                  <p className="text-muted mb-0">
                    Record your daily spending.
                  </p>
                </div>


                <div>
                  <h5 className="fw-bold">
                    3. Track Your Balance
                  </h5>

                  <p className="text-muted mb-0">
                    View your financial summary from the dashboard.
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