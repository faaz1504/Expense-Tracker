import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button
} from "react-bootstrap";

function EditTransaction() {

  const navigate = useNavigate();

  const formik = useFormik({

    initialValues: {
      title: "Groceries",
      amount: 1500,
      type: "expense",
      category: "food",
      date: "2026-09-03"
    },

    validationSchema: Yup.object({

      title: Yup.string()
        .required("Title is required"),

      amount: Yup.number()
        .typeError("Amount must be a number")
        .positive("Amount must be greater than 0")
        .required("Amount is required"),

      type: Yup.string()
        .required("Type is required"),

      category: Yup.string()
        .required("Category is required"),

      date: Yup.string()
        .required("Date is required")

    }),

    onSubmit: (values) => {

      console.log("Updated Transaction:", values);

      // Update functionality later

      navigate("/user-transactions");
    }

  });

  return (

    <Container
      fluid
      className="bg-light py-4"
      style={{ minHeight: "100vh" }}
    >

      <Row className="justify-content-center">

        <Col xs={11} sm={8} md={6} lg={4}>

          <Card className="border-0 shadow-sm">

            <Card.Body className="p-3">

              <div className="text-center mb-3">

                <p className="text-primary fw-semibold mb-1">
                  UPDATE TRANSACTION
                </p>

                <h3>Edit Transaction</h3>

                <p className="text-muted small">
                  Update your transaction details
                </p>

              </div>

              <Form
                noValidate
                onSubmit={formik.handleSubmit}
              >

                {/* TITLE */}

                <Form.Group className="mb-2">

                  <Form.Label>Title</Form.Label>

                  <Form.Control
                    type="text"
                    name="title"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={
                      formik.touched.title &&
                      !!formik.errors.title
                    }
                  />

                  <Form.Control.Feedback type="invalid">
                    {formik.errors.title}
                  </Form.Control.Feedback>

                </Form.Group>


                {/* AMOUNT */}

                <Form.Group className="mb-2">

                  <Form.Label>Amount</Form.Label>

                  <Form.Control
                    type="number"
                    name="amount"
                    value={formik.values.amount}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={
                      formik.touched.amount &&
                      !!formik.errors.amount
                    }
                  />

                  <Form.Control.Feedback type="invalid">
                    {formik.errors.amount}
                  </Form.Control.Feedback>

                </Form.Group>


                {/* TYPE */}

                <Form.Group className="mb-2">

                  <Form.Label>Type</Form.Label>

                  <Form.Select
                    name="type"
                    value={formik.values.type}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={
                      formik.touched.type &&
                      !!formik.errors.type
                    }
                  >

                    <option value="">
                      Select transaction type
                    </option>

                    <option value="income">
                      Income
                    </option>

                    <option value="expense">
                      Expense
                    </option>

                  </Form.Select>

                  <Form.Control.Feedback type="invalid">
                    {formik.errors.type}
                  </Form.Control.Feedback>

                </Form.Group>


                {/* CATEGORY */}

                <Form.Group className="mb-2">

                  <Form.Label>Category</Form.Label>

                  <Form.Select
                    name="category"
                    value={formik.values.category}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={
                      formik.touched.category &&
                      !!formik.errors.category
                    }
                  >

                    <option value="">
                      Select category
                    </option>

                    <option value="food">
                      Food
                    </option>

                    <option value="travel">
                      Travel
                    </option>

                    <option value="shopping">
                      Shopping
                    </option>

                    <option value="rent">
                      Rent
                    </option>

                    <option value="bills">
                      Bills
                    </option>

                    <option value="salary">
                      Salary
                    </option>

                    <option value="health">
                      Health
                    </option>

                    <option value="other">
                      Other
                    </option>

                  </Form.Select>

                  <Form.Control.Feedback type="invalid">
                    {formik.errors.category}
                  </Form.Control.Feedback>

                </Form.Group>


                {/* DATE */}

                <Form.Group className="mb-4">

                  <Form.Label>Date</Form.Label>

                  <Form.Control
                    type="date"
                    name="date"
                    value={formik.values.date}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={
                      formik.touched.date &&
                      !!formik.errors.date
                    }
                  />

                  <Form.Control.Feedback type="invalid">
                    {formik.errors.date}
                  </Form.Control.Feedback>

                </Form.Group>


                {/* BUTTONS */}

                <div className="d-flex gap-2">

                  <Button
                    type="button"
                    variant="outline-secondary"
                    className="w-50"
                    onClick={() =>
                      navigate("/user-transactions")
                    }
                  >
                    Cancel
                  </Button>

                  <Button
                    type="submit"
                    variant="primary"
                    className="w-50"
                  >
                    Update
                  </Button>

                </div>

              </Form>

            </Card.Body>

          </Card>

        </Col>

      </Row>

    </Container>

  );
}

export default EditTransaction;