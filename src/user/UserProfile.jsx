import {
  Container,
  Row,
  Col,
  Card,
  Button
} from "react-bootstrap";

function UserProfile(){

    return(

        <Container
      fluid
      className="bg-light py-5"
      style={{ minHeight: "100vh" }}
    >
      <Row className="justify-content-center">

        <Col xs={11} sm={8} md={6} lg={4}>

          <Card className="border-0 shadow-sm">

            <Card.Body className="p-4 text-center">

              <div
                className="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center mx-auto mb-3"
                style={{
                  width: "80px",
                  height: "80px",
                  fontSize: "30px"
                }}
              >
                F
              </div>

              <h3>User Profile</h3>

              <p className="text-muted">
                Manage your account information
              </p>

              <hr />

              <div className="text-start">

                <p>
                  <strong>Name:</strong> Faaz
                </p>

                <p>
                  <strong>Email:</strong> faaz@gmail.com
                </p>

                <p>
                  <strong>Role:</strong> User
                </p>

              </div>

              <Button
                variant="primary"
                className="w-100 mt-3"
              >
                Edit Profile
              </Button>

              <Button
                variant="danger"
                className="w-100 mt-3"
              >
                Logout
              </Button>


            </Card.Body>

          </Card>

        </Col>

      </Row>
    </Container>

    )

}
export default UserProfile;