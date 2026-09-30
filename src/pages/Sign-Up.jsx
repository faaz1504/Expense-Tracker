import { useFormik } from "formik";
import { useNavigate, Link } from "react-router-dom";
import * as Yup from "yup";

import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button
} from "react-bootstrap";

import { useDispatch } from "react-redux";
import { register } from "../redux/authSlice";

function SignUp() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({

    initialValues: {
      name: "",
      email: "",
      password: "",
      role: "user"
    },

    validationSchema: Yup.object({

      name: Yup.string()
        .required("Name is required"),

      email: Yup.string()
        .email("Invalid email")
        .required("Email is required"),

      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .max(12, "Password can only be 12 characters")
        .required("Password is required")

    }),

    onSubmit: (values) => {

      const newUser = {
        id: Date.now(),
        ...values
      };

      dispatch(register(newUser));

      navigate("/sign-in");
    }

  });

  
    return (
  <Container
    fluid
    className="bg-light d-flex justify-content-center py-2"
  >

    <Card
      className="border-0 shadow-sm"
      style={{
        width: "100%",
        maxWidth: "380px"
      }}
    >

      <Card.Body className="p-3">

        <div className="text-center mb-2">

          <h4 className="fw-bold mb-1">
            Create Account
          </h4>

          <p className="text-muted small mb-2">
            Start tracking your expenses with EXpensoo
          </p>

        </div>


        <Form
          noValidate
          onSubmit={formik.handleSubmit}
        >

          {/* NAME */}

          <Form.Group className="mb-2">

            <Form.Label className="small fw-semibold mb-1">
              Name
            </Form.Label>

            <Form.Control
              size="sm"
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={
                formik.touched.name &&
                !!formik.errors.name
              }
            />

            <Form.Control.Feedback type="invalid">
              {formik.errors.name}
            </Form.Control.Feedback>

          </Form.Group>


          {/* EMAIL */}

          <Form.Group className="mb-2">

            <Form.Label className="small fw-semibold mb-1">
              Email
            </Form.Label>

            <Form.Control
              size="sm"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={
                formik.touched.email &&
                !!formik.errors.email
              }
            />

            <Form.Control.Feedback type="invalid">
              {formik.errors.email}
            </Form.Control.Feedback>

          </Form.Group>


          {/* PASSWORD */}

          <Form.Group className="mb-2">

            <Form.Label className="small fw-semibold mb-1">
              Password
            </Form.Label>

            <Form.Control
              size="sm"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={
                formik.touched.password &&
                !!formik.errors.password
              }
            />

            <Form.Control.Feedback type="invalid">
              {formik.errors.password}
            </Form.Control.Feedback>

          </Form.Group>


          {/* ROLE */}

          <Form.Group className="mb-2">

            <Form.Label className="small fw-semibold mb-1">
              Role
            </Form.Label>

            <Form.Select
              size="sm"
              name="role"
              value={formik.values.role}
              onChange={formik.handleChange}
            >
              <option value="user">
                User
              </option>

              <option value="admin">
                Admin
              </option>
            </Form.Select>

          </Form.Group>


          <Button
            type="submit"
            size="sm"
            variant="primary"
            className="w-100 mt-2"
          >
            Sign Up
          </Button>


          <p className="text-center text-muted small mt-2 mb-0">

            Already have an account?{" "}

            <Link
              to="/sign-in"
              className="text-decoration-none fw-semibold"
            >
              Sign In
            </Link>

          </p>

        </Form>

      </Card.Body>

    </Card>

  </Container>
);
  
}

export default SignUp;