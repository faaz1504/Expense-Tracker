import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateTransaction } from "../../redux/transaction/transactionSlice";
import "./AddTransactions.css";

// Modern SVG Icons
const ArrowUpRightIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="7" y1="17" x2="17" y2="7"></line>
    <polyline points="7 7 17 7 17 17"></polyline>
  </svg>
);

const ArrowDownLeftIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="17" y1="7" x2="7" y2="7"></line>
    <polyline points="17 17 7 17 7 7"></polyline>
  </svg>
);

const TagIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
    <line x1="7" y1="7" x2="7.01" y2="7"></line>
  </svg>
);

const CalendarIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

const CheckCircleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);

const AlertCircleIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="8" x2="12" y2="12"></line>
    <line x1="12" y1="16" x2="12.01" y2="16"></line>
  </svg>
);

const ArrowLeftIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12"></line>
    <polyline points="12 19 5 12 12 5"></polyline>
  </svg>
);

// Modern Icon-based Categories
const CATEGORIES = [
  { id: "food", label: "Food & Dining", emoji: "🍔" },
  { id: "shopping", label: "Shopping", emoji: "🛍️" },
  { id: "travel", label: "Transport", emoji: "🚗" },
  { id: "bills", label: "Bills & Utilities", emoji: "⚡" },
  { id: "rent", label: "Rent & Housing", emoji: "🏠" },
  { id: "salary", label: "Salary", emoji: "💼" },
  { id: "health", label: "Healthcare", emoji: "🏥" },
  { id: "other", label: "Other", emoji: "📦" }
];

function EditTransaction() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const transactions = useSelector(
    (state) => state.transactions.transactions
  );

  const transaction = transactions.find(
    (item) => item.id === Number(id)
  );

  const formik = useFormik({

    initialValues: {
      title: transaction?.title || "",
      amount: transaction?.amount || "",
      type: transaction?.type || "expense",
      category: transaction?.category || "",
      date: transaction?.date || ""
    },

    enableReinitialize: true,

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

      const updatedTransaction = {
        ...transaction,
        title: values.title,
        amount: Number(values.amount),
        type: values.type,
        category: values.category,
        date: values.date
      };

      dispatch(updateTransaction(updatedTransaction));

      navigate("/user-transactions");
    }

  });

  if (!transaction) {
    return (
      <div className="add-tx-page d-flex flex-column align-items-center justify-content-center">
        <h4 className="fw-semibold text-muted mb-3">Transaction not found</h4>
        <Link to="/user-transactions" className="btn btn-primary">
          Return to Transactions
        </Link>
      </div>
    );
  }

  const isIncome = formik.values.type === "income";

  const handleQuickAdd = (delta) => {
    const current = Number(formik.values.amount) || 0;
    formik.setFieldValue("amount", current + delta);
    formik.setFieldTouched("amount", true);
  };

  return (

    <div className="add-tx-page">

      <Container>

        <div className="add-tx-wrapper">

          {/* BACK LINK */}

          <Link to="/user-transactions" className="add-tx-back">
            <ArrowLeftIcon />
            <span>Back to Transactions</span>
          </Link>


          {/* MAIN TRANSACTION COMPOSER CARD */}

          <div className="add-tx-composer">

            {/* HEADER */}

            <div className="add-tx-header">

              <h2>Edit Transaction</h2>

              <p>Update and manage transaction details.</p>

            </div>


            <form onSubmit={formik.handleSubmit}>


              {/* 1. TRANSACTION TYPE SEGMENTED TOGGLE */}

              <div className="type-segmented-control">

                <button
                  type="button"
                  onClick={() => {
                    formik.setFieldValue("type", "expense");
                    formik.setFieldTouched("type", true);
                  }}
                  className={`type-segmented-btn ${!isIncome ? "active-expense" : ""}`}
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
                  className={`type-segmented-btn ${isIncome ? "active-income" : ""}`}
                >
                  <ArrowDownLeftIcon />
                  <span>Income</span>
                </button>

              </div>

              {formik.touched.type && formik.errors.type && (
                <div className="validation-error-msg mb-3">
                  <AlertCircleIcon />
                  <span>{formik.errors.type}</span>
                </div>
              )}


              {/* 2. HERO AMOUNT SECTION */}

              <div
                className={`amount-hero-card ${
                  isIncome ? "focus-income" : "focus-expense"
                } ${
                  formik.touched.amount && formik.errors.amount ? "has-error" : ""
                }`}
              >

                <span className="amount-label">Transaction Amount</span>

                <div className="amount-input-row">

                  <span
                    className="amount-currency"
                    style={{ color: isIncome ? "#16a34a" : "#dc2626" }}
                  >
                    ₹
                  </span>

                  <input
                    type="number"
                    name="amount"
                    placeholder="0"
                    value={formik.values.amount}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="amount-big-input"
                    style={{ color: isIncome ? "#15803d" : "#09090b" }}
                  />

                </div>

                {/* Quick Add Suggestions */}
                <div className="amount-quick-chips">
                  <button
                    type="button"
                    className="quick-chip-btn"
                    onClick={() => handleQuickAdd(100)}
                  >
                    + ₹100
                  </button>
                  <button
                    type="button"
                    className="quick-chip-btn"
                    onClick={() => handleQuickAdd(500)}
                  >
                    + ₹500
                  </button>
                  <button
                    type="button"
                    className="quick-chip-btn"
                    onClick={() => handleQuickAdd(1000)}
                  >
                    + ₹1,000
                  </button>
                  <button
                    type="button"
                    className="quick-chip-btn"
                    onClick={() => handleQuickAdd(5000)}
                  >
                    + ₹5,000
                  </button>
                </div>

              </div>

              {formik.touched.amount && formik.errors.amount && (
                <div className="validation-error-msg mb-4" style={{ marginTop: "-20px" }}>
                  <AlertCircleIcon />
                  <span>{formik.errors.amount}</span>
                </div>
              )}


              {/* 3. CATEGORY SELECTION (CARDS / CHIPS) */}

              <div className="category-selector-section">

                <div className="section-subheading">
                  <span>Category</span>
                  {formik.values.category && (
                    <span style={{ color: isIncome ? "#16a34a" : "#dc2626", textTransform: "capitalize" }}>
                      ● {formik.values.category}
                    </span>
                  )}
                </div>

                <div className="category-grid">

                  {CATEGORIES.map((cat) => {
                    const isSelected = formik.values.category === cat.id;

                    return (
                      <div
                        key={cat.id}
                        onClick={() => {
                          formik.setFieldValue("category", cat.id);
                          formik.setFieldTouched("category", true);
                        }}
                        className={`category-chip ${
                          isSelected
                            ? isIncome
                              ? "selected selected-income"
                              : "selected selected-expense"
                            : ""
                        }`}
                      >
                        <div className="category-chip-icon">
                          {cat.emoji}
                        </div>
                        <span className="category-chip-label">
                          {cat.label}
                        </span>
                      </div>
                    );
                  })}

                </div>

                {formik.touched.category && formik.errors.category && (
                  <div className="validation-error-msg mt-2">
                    <AlertCircleIcon />
                    <span>{formik.errors.category}</span>
                  </div>
                )}

              </div>


              {/* 4. TRANSACTION DETAILS (TITLE & DATE) */}

              <div className="details-group-box">

                <Row className="g-3">

                  {/* Title / Description */}

                  <Col md={7}>

                    <div className="detail-item">

                      <label className="detail-item-header">
                        <TagIcon />
                        <span>Title / Note</span>
                      </label>

                      <input
                        type="text"
                        name="title"
                        placeholder="e.g. Grocery shopping, Salary"
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`detail-input-clean ${
                          formik.touched.title && formik.errors.title ? "is-invalid" : ""
                        }`}
                      />

                      {formik.touched.title && formik.errors.title && (
                        <div className="validation-error-msg">
                          <AlertCircleIcon />
                          <span>{formik.errors.title}</span>
                        </div>
                      )}

                    </div>

                  </Col>


                  {/* Date */}

                  <Col md={5}>

                    <div className="detail-item">

                      <label className="detail-item-header">
                        <CalendarIcon />
                        <span>Date</span>
                      </label>

                      <input
                        type="date"
                        name="date"
                        value={formik.values.date}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`detail-input-clean ${
                          formik.touched.date && formik.errors.date ? "is-invalid" : ""
                        }`}
                      />

                      {formik.touched.date && formik.errors.date && (
                        <div className="validation-error-msg">
                          <AlertCircleIcon />
                          <span>{formik.errors.date}</span>
                        </div>
                      )}

                    </div>

                  </Col>

                </Row>

              </div>


              {/* 5. ACTION BUTTON */}

              <button
                type="submit"
                className={`save-transaction-btn ${
                  isIncome ? "btn-income" : "btn-expense"
                }`}
              >
                <CheckCircleIcon />
                <span>Save Changes</span>
              </button>


              {/* CANCEL LINK */}

              <div className="cancel-action-row">

                <Link to="/user-transactions" className="cancel-action-link">
                  Cancel
                </Link>

              </div>

            </form>

          </div>

        </div>

      </Container>

    </div>

  );
}

export default EditTransaction;
