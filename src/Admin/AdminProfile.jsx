
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Badge
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateProfile, logout } from "../redux/authSlice";

function AdminProfile() {

    const user = useSelector((state) => state.auth.user);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [editing,setEditing] = useState(false);

    const [name,setName] = useState(user?.name || "");


    const handleUpdate = () => {

        if(!name.trim()) return;

        dispatch(updateProfile({
            id:user.id,
            name:name.trim()
        }));

        setEditing(false);

    }


    const handleLogout = () => {

        dispatch(logout());

        navigate("/");

    }


    return(
        <Container fluid className="bg-light py-4" style={{minHeight:"100vh"}}>

            <Container>

                <div className="mb-4">

                    <p className="text-muted mb-1">
                        ADMIN PANEL
                    </p>

                    <h3 className="fw-bold mb-1">
                        My Profile
                    </h3>

                    <p className="text-muted small">
                        Manage your account details.
                    </p>

                </div>


                <Row className="justify-content-center">

                    <Col md={8} lg={6} xl={5}>

                        <Card className="border-0 shadow-sm rounded-4">

                            <Card.Body className="p-3 p-md-4">

                                <div className="d-flex align-items-center gap-3 mb-4">

                                    <div
                                        className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                                        style={{width:"60px",height:"60px",fontSize:"24px"}}
                                    >
                                        {user?.name?.charAt(0).toUpperCase() || "A"}
                                    </div>

                                    <div>

                                        <h5 className="fw-bold mb-1">
                                            {user?.name}
                                        </h5>

                                        <p className="text-muted small mb-1">
                                            {user?.email}
                                        </p>

                                        <Badge bg="primary">
                                            Administrator
                                        </Badge>

                                    </div>

                                </div>


                                <hr className="text-muted" />


                                <Form onSubmit={(e) => e.preventDefault()}>

                                    <Form.Group className="mb-3">

                                        <Form.Label className="small fw-semibold">
                                            Full Name
                                        </Form.Label>

                                        <Form.Control
                                            size="sm"
                                            type="text"
                                            value={editing ? name : user?.name || ""}
                                            readOnly={!editing}
                                            onChange={(e) => setName(e.target.value)}
                                        />

                                    </Form.Group>


                                    <Form.Group className="mb-3">

                                        <Form.Label className="small fw-semibold">
                                            Email Address
                                        </Form.Label>

                                        <Form.Control
                                            size="sm"
                                            type="email"
                                            value={user?.email || ""}
                                            readOnly
                                        />

                                    </Form.Group>


                                    <div className="d-flex justify-content-between align-items-center mb-4">

                                        <span className="small fw-semibold">
                                            Account Role
                                        </span>

                                        <Badge bg="success">
                                            Admin
                                        </Badge>

                                    </div>


                                    <div className="d-flex gap-2">

                                        {!editing ? (

                                            <Button
                                                type="button"
                                                variant="primary"
                                                size="sm"
                                                className="w-100"
                                                onClick={() => setEditing(true)}
                                            >
                                                Edit Profile
                                            </Button>

                                        ) : (

                                            <>
                                                <Button
                                                    type="button"
                                                    variant="success"
                                                    size="sm"
                                                    className="w-100"
                                                    onClick={handleUpdate}
                                                >
                                                    Save Changes
                                                </Button>

                                                <Button
                                                    type="button"
                                                    variant="outline-secondary"
                                                    size="sm"
                                                    className="w-100"
                                                    onClick={() => {
                                                        setEditing(false);
                                                        setName(user?.name || "");
                                                    }}
                                                >
                                                    Cancel
                                                </Button>
                                            </>

                                        )}

                                    </div>


                                    <Button
                                        type="button"
                                        variant="outline-danger"
                                        size="sm"
                                        className="w-100 mt-3"
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </Button>

                                </Form>

                            </Card.Body>

                        </Card>

                    </Col>

                </Row>

            </Container>

        </Container>
    )

}

export default AdminProfile;
