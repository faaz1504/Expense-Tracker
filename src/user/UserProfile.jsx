import {
  Container,
  Row,
  Col,
  Card,
  Button
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/authSlice";

function UserProfile(){

  const user = useSelector(

    (state) => state.auth.user

  )

  if(!user){
    return <p className="text-center mt-5">No user logged in</p>
  }

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleLogout = () =>{

    dispatch(logout());

    navigate('/sign-up');
  }



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
                <img
                src="https://images.unsplash.com/photo-1740252117044-2af197eea287?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHByb2ZpbGUlMjBpY29ufGVufDB8fDB8fHww"
                alt="profile"
                className="rounded-circle mb-3"
                style={{
                  width: "130px",
                  height: "100px",
                  objectFit: "cover"
                }}
              />
              </div>

              <h3>User Profile</h3>

              <p className="text-muted">
                Manage your account information
              </p>

              <hr />

              <div className="text-start">

                <p>
                  <strong>Name:</strong> {user.name}
                </p>

                <p>
                  <strong>Email:</strong> {user.email}
                </p>

                <p>
                  <strong>Role:</strong> {user.role}
                </p>

              </div>

              {/* <Button
                variant="primary"
                className="w-100 mt-3"
              >
                Edit Profile
              </Button> */}

              <Button
                variant="danger"
                className="w-100 mt-3"
                onClick={handleLogout}
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