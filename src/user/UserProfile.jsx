import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, updateProfile } from "../redux/authSlice";
import { useState } from "react";

function UserProfile(){

  const user = useSelector(

    (state) => state.auth.user

  )

  

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleLogout = () =>{

    dispatch(logout());

    navigate('/');
  }

  const [editing,setEditing] = useState(false);

  const [name,setName] = useState(user?.name || "")

  const handleUpdate = () =>{

    if(name.trim() === ""){
      
      return;
    }

    dispatch(updateProfile({

      id:user.id,
      name:name
    }))

    setEditing(false)
  }

  if(!user){
    return <p className="text-center mt-5">No user logged in</p>
  }



    return(

        <Container
      fluid
      className="bg-light py-5"
      style={{ minHeight: "100vh" }}
    >
      <Row className="justify-content-center">

        <Col xs={11} sm={8} md={6} lg={4}>

          <Card className="border shadow-sm">

            <Card.Body className="p-4 text-center">

              <div
                className="rounded-circle d-flex justify-content-center align-items-center mx-auto mb-3"
                style={{
                  width: "88px",
                  height: "88px",
                  border: "1px solid #e4e4e7",
                  padding: "2px",
                  backgroundColor: "#ffffff"
                }}
              >
                <img
                src="https://images.unsplash.com/photo-1740252117044-2af197eea287?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHByb2ZpbGUlMjBpY29ufGVufDB8fDB8fHww"
                alt="profile"
                className="rounded-circle"
                style={{
                  width: "80px",
                  height: "80px",
                  objectFit: "cover"
                }}
              />
              </div>

              <h4 className="fw-semibold mb-1">{user.name}</h4>

              <p className="text-muted small mb-3">
                {user.email}
              </p>

              <hr className="my-3" />

              <div className="text-start mb-3">

                <div className="mb-3">
                  <span className="text-muted small d-block mb-1">
                    Name
                  </span>
                  {editing ? (

                    <Form.Control
                    size="sm"
                    type="text"
                    value={name}
                    onChange={(e)=> setName(e.target.value)}
                    className="mt-1"
                    />


                  ):(

                    <span className="fw-medium">{user.name}</span>

                  )}
                </div>

                <div>
                  <span className="text-muted small d-block mb-1">
                    Email
                  </span>
                  <span className="fw-medium">{user.email}</span>
                </div>

              </div>
                
                {editing ?(
                  <Button
                  variant="success"
                  className="w-100 mt-3"
                  onClick={handleUpdate}
                  >
                    Save Name

                  </Button>
                ):(
                   <Button
                  variant="success"
                  className="w-100 mt-3"
                  onClick={() => setEditing(true)}
                  >
                   Edit Name

                  </Button>
                )}
              

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