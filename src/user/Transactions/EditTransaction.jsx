import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";

import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateTransaction } from "../../redux/transaction/transactionSlice";

// Modern SVG Icons
const TagIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
    <line x1="7" y1="7" x2="7.01" y2="7"></line>
  </svg>
);

const RupeeIcon = () => (
  <span style={{ fontSize: "15px", fontWeight: "600", fontFamily: "sans-serif" }}>₹</span>
);

const FolderIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
  </svg>
);

const CalendarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

const ArrowUpRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="7" y1="17" x2="17" y2="7"></line>
    <polyline points="7 7 17 7 17 17"></polyline>
  </svg>
);

const ArrowDownLeftIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="17" y1="7" x2="7" y2="17"></line>
    <polyline points="17 17 7 17 7 7"></polyline>
  </svg>
);

const EditPencilIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 20h9"></path>
    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
  </svg>
);

const AlertCircleIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="me-1">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="8" x2="12" y2="12"></line>
    <line x1="12" y1="16" x2="12.01" y2="16"></line>
  </svg>
);

function EditTransaction() {

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const {id} = useParams();

  const transactions = useSelector(
    (state) => state.transactions.transactions
  );

  const transaction = transactions.find(
    (item) => item.id === Number(id)
  )

  const formik = useFormik({

    initialValues:{

    title:transaction?.title || "",

    amount:transaction?.amount || "",

    type:transaction?.type || "",

    category:transaction?.category || "",

    date:transaction?.date || ""

  },

  enableReinitialize:true,

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

      const updatedTransaction ={

        ...transaction,

        title:values.title,

        amount:Number(values.amount),

        type:values.type,

        category:values.category,

        date:values.date

      };

      dispatch(updateTransaction(updatedTransaction));

      navigate("/user-transactions");
    }

  });

   if (!transaction) {

    return (
      <div className="text-center mt-5 text-muted">
        Transaction not found
      </div>
    );

  }

  return (

    <Container
      fluid
      className="bg-light py-5"
      style={{ minHeight: "100vh" }}
    >

      <Row className="justify-content-center">

        <Col xs={11} sm={9} md={7} lg={5} xl={4}>

          <Card className="border shadow-sm">

            <Card.Body className="p-4">

              {/* HEADER WITH ICON */}

              <div className="text-center mb-4">

                <div
                  className="mx-auto mb-3 d-flex align-items-center justify-content-center rounded-circle"
                  style={{
                    width: "48px",
                    height: "48px",
                    backgroundColor: "#f4f4f5",
                    color: "#18181b",
                    border: "1px solid #e4e4e7"
                  }}
                >
                  <EditPencilIcon />
                </div>

                <h4 className="fw-semibold mb-1">Edit Transaction</h4>

                <p className="text-muted small mb-0">
                  Update transaction details
                </p>

              </div>


              <Form onSubmit={formik.handleSubmit}>


                {/* TYPE SELECTOR (SEGMENTED TABS) */}

                <Form.Group className="mb-3">

                  <Form.Label className="small fw-medium text-muted">
                    Transaction Type
                  </Form.Label>

                  <div className="d-flex gap-2">

                    <button
                      type="button"
                      onClick={() => {
                        formik.setFieldValue("type", "expense");
                        formik.setFieldTouched("type", true);
                      }}
                      className={`flex-fill py-2 px-3 rounded d-flex align-items-center justify-content-center gap-2 border fw-medium transition ${
                        formik.values.type === "expense"
                          ? "bg-danger text-white border-danger shadow-sm"
                          : "bg-white text-secondary border-secondary-subtle"
                      }`}
                      style={{ fontSize: "0.88rem" }}
                    >
                      <ArrowUpRightIcon />
                      <span>Expense</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        formik.setFieldValue("type", "income");
                        formik.setFieldTouched("type", true);
                      }}
                      className={`flex-fill py-2 px-3 rounded d-flex align-items-center justify-content-center gap-2 border fw-medium transition ${
                        formik.values.type === "income"
                          ? "bg-success text-white border-success shadow-sm"
                          : "bg-white text-secondary border-secondary-subtle"
                      }`}
                      style={{ fontSize: "0.88rem" }}
                    >
                      <ArrowDownLeftIcon />
                      <span>Income</span>
                    </button>

                  </div>

                  {formik.touched.type && formik.errors.type && (

                    <div className="text-danger small mt-1 d-flex align-items-center">
                      <AlertCircleIcon /> {formik.errors.type}
                    </div>

                  )}

                </Form.Group>


                {/* TITLE */}

                <Form.Group className="mb-3">

                  <Form.Label className="small fw-medium text-muted">
                    Title
                  </Form.Label>

                  <div className="position-relative">

                    <span
                      className="position-absolute top-50 start-0 translate-middle-y ps-3 text-muted d-flex align-items-center"
                      style={{ pointerEvents: "none" }}
                    >
                      <TagIcon />
                    </span>

                    <Form.Control
                      type="text"
                      name="title"
                      placeholder="e.g. Grocery, Salary, Petrol"
                      style={{ paddingLeft: "2.5rem" }}
                      value={formik.values.title}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      isInvalid={
                        formik.touched.title &&
                        !!formik.errors.title
                      }
                    />

                  </div>

                  {formik.touched.title && formik.errors.title && (

                    <div className="text-danger small mt-1 d-flex align-items-center">
                      <AlertCircleIcon /> {formik.errors.title}
                    </div>

                  )}

                </Form.Group>


                {/* AMOUNT */}

                <Form.Group className="mb-3">

                  <Form.Label className="small fw-medium text-muted">
                    Amount
                  </Form.Label>

                  <div className="position-relative">

                    <span
                      className="position-absolute top-50 start-0 translate-middle-y ps-3 text-muted d-flex align-items-center"
                      style={{ pointerEvents: "none" }}
                    >
                      <RupeeIcon />
                    </span>

                    <Form.Control
                      type="number"
                      name="amount"
                      placeholder="0.00"
                      style={{ paddingLeft: "2.5rem" }}
                      value={formik.values.amount}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      isInvalid={
                        formik.touched.amount &&
                        !!formik.errors.amount
                      }
                    />

                  </div>

                  {formik.touched.amount && formik.errors.amount && (

                    <div className="text-danger small mt-1 d-flex align-items-center">
                      <AlertCircleIcon /> {formik.errors.amount}
                    </div>

                  )}

                </Form.Group>


                {/* CATEGORY */}

                <Form.Group className="mb-3">

                  <Form.Label className="small fw-medium text-muted">
                    Category
                  </Form.Label>

                  <div className="position-relative">

                    <span
                      className="position-absolute top-50 start-0 translate-middle-y ps-3 text-muted d-flex align-items-center"
                      style={{ pointerEvents: "none" }}
                    >
                      <FolderIcon />
                    </span>

                    <Form.Select
                      name="category"
                      style={{ paddingLeft: "2.5rem" }}
                      value={formik.values.category}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      isInvalid={
                        formik.touched.category &&
                        !!formik.errors.category
                      }
                    >

                      <option value="">
                        Select a category
                      </option>

                      <option value="food">
                        🍔 Food & Dining
                      </option>

                      <option value="travel">
                        🚗 Travel & Transport
                      </option>

                      <option value="shopping">
                        🛍️ Shopping
                      </option>

                      <option value="rent">
                        🏠 Rent & Housing
                      </option>

                      <option value="bills">
                        ⚡ Bills & Utilities
                      </option>

                      <option value="salary">
                        💼 Salary & Earnings
                      </option>

                      <option value="health">
                        🏥 Health & Medical
                      </option>

                      <option value="other">
                        📦 Other
                      </option>

                    </Form.Select>

                  </div>

                  {formik.touched.category && formik.errors.category && (

                    <div className="text-danger small mt-1 d-flex align-items-center">
                      <AlertCircleIcon /> {formik.errors.category}
                    </div>

                  )}

                </Form.Group>


                {/* DATE */}

                <Form.Group className="mb-4">

                  <Form.Label className="small fw-medium text-muted">
                    Date
                  </Form.Label>

                  <div className="position-relative">

                    <span
                      className="position-absolute top-50 start-0 translate-middle-y ps-3 text-muted d-flex align-items-center"
                      style={{ pointerEvents: "none" }}
                    >
                      <CalendarIcon />
                    </span>

                    <Form.Control
                      type="date"
                      name="date"
                      style={{ paddingLeft: "2.5rem" }}
                      value={formik.values.date}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      isInvalid={
                        formik.touched.date &&
                        !!formik.errors.date
                      }
                    />

                  </div>

                  {formik.touched.date && formik.errors.date && (

                    <div className="text-danger small mt-1 d-flex align-items-center">
                      <AlertCircleIcon /> {formik.errors.date}
                    </div>

                  )}

                </Form.Group>


                {/* BUTTONS */}

                <div className="d-flex gap-2 pt-1">

                  <Button
                    variant="outline-secondary"
                    className="w-50"
                    type="button"
                    onClick={() => navigate("/user-transactions")}
                  >
                    Cancel
                  </Button>

                  <Button
                    variant="primary"
                    className="w-50"
                    type="submit"
                  >
                    Update Entry
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
