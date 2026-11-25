import { Link } from "react-router-dom";
import { Container, Row, Col, Button, Badge } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteTransaction } from "../../redux/transaction/transactionSlice";
import { useState, useMemo } from "react";
import "./Transactions.css";

// SVG Icons
const SearchIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
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

const EditIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
  </svg>
);

const TrashIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
  </svg>
);

const XCloseIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const EmptyReceiptIcon = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1-2-1z"></path>
    <line x1="8" y1="6" x2="16" y2="6"></line>
    <line x1="8" y1="10" x2="16" y2="10"></line>
    <line x1="8" y1="14" x2="12" y2="14"></line>
  </svg>
);

// Categories definitions matching EXpensoo project
const CATEGORY_CHIPS = [
  { id: "all", label: "All", emoji: "✨" },
  { id: "food", label: "Food", emoji: "🍔" },
  { id: "shopping", label: "Shopping", emoji: "🛍️" },
  { id: "travel", label: "Travel", emoji: "🚗" },
  { id: "bills", label: "Bills", emoji: "⚡" },
  { id: "rent", label: "Rent", emoji: "🏠" },
  { id: "salary", label: "Salary", emoji: "💼" },
  { id: "health", label: "Health", emoji: "🏥" },
  { id: "other", label: "Other", emoji: "📦" }
];

const CATEGORY_MAP = {
  food: { label: "Food & Dining", emoji: "🍔", bg: "#fef3c7" },
  shopping: { label: "Shopping", emoji: "🛍️", bg: "#fce7f3" },
  travel: { label: "Travel & Transport", emoji: "🚗", bg: "#e0e7ff" },
  bills: { label: "Bills & Utilities", emoji: "⚡", bg: "#ffedd5" },
  rent: { label: "Rent & Housing", emoji: "🏠", bg: "#e0f2fe" },
  salary: { label: "Salary & Income", emoji: "💼", bg: "#dcfce7" },
  health: { label: "Health & Medical", emoji: "🏥", bg: "#fee2e2" },
  other: { label: "Other Expenses", emoji: "📦", bg: "#f4f4f5" }
};

// Helper to format date group headers ("Today • 25 Nov 2026", "Yesterday", or "25 Nov 2026")
const formatDateGroupHeader = (dateStr) => {
  if (!dateStr) return "Unscheduled";
  try {
    const parts = String(dateStr).split("-");
    if (parts.length === 3) {
      const year = Number(parts[0]);
      const month = Number(parts[1]) - 1;
      const day = Number(parts[2]);
      const dateObj = new Date(year, month, day);

      const today = new Date();
      const todayYear = today.getFullYear();
      const todayMonth = today.getMonth();
      const todayDay = today.getDate();

      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);

      const isToday =
        year === todayYear && month === todayMonth && day === todayDay;
      const isYesterday =
        year === yesterday.getFullYear() &&
        month === yesterday.getMonth() &&
        day === yesterday.getDate();

      const formatted = dateObj.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric"
      });

      if (isToday) return `Today • ${formatted}`;
      if (isYesterday) return `Yesterday • ${formatted}`;
      return formatted;
    }
    return dateStr;
  } catch {
    return dateStr;
  }
};

function Transactions() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  const transactions = useSelector(
    (state) => state.transactions.transactions
  );

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Filter only logged-in user's transactions
  const userTransactions = useMemo(() => {
    return transactions.filter(
      (transaction) => transaction.userEmail === user?.email
    );
  }, [transactions, user?.email]);

  // Combined filter: search, type, category, date
  const filteredTransactions = useMemo(() => {
    return userTransactions.filter((transaction) => {
      const searchLower = search.toLowerCase().trim();
      const matchesSearch =
        !searchLower ||
        transaction.title?.toLowerCase().includes(searchLower) ||
        transaction.category?.toLowerCase().includes(searchLower);

      const matchesType =
        typeFilter === "all" || transaction.type === typeFilter;

      const matchesCategory =
        categoryFilter === "all" ||
        transaction.category?.toLowerCase() === categoryFilter.toLowerCase();

      const matchesDate = !dateFilter || transaction.date === dateFilter;

      return matchesSearch && matchesType && matchesCategory && matchesDate;
    });
  }, [userTransactions, search, typeFilter, categoryFilter, dateFilter]);

  // Group filtered transactions by date (descending)
  const groupedTransactions = useMemo(() => {
    const sorted = [...filteredTransactions].sort((a, b) => {
      const dateA = a.date ? new Date(a.date).getTime() : 0;
      const dateB = b.date ? new Date(b.date).getTime() : 0;
      if (dateB !== dateA) return dateB - dateA;
      return Number(b.id) - Number(a.id);
    });

    const groups = {};
    sorted.forEach((tx) => {
      const key = tx.date || "Unknown Date";
      if (!groups[key]) groups[key] = [];
      groups[key].push(tx);
    });

    return Object.entries(groups);
  }, [filteredTransactions]);

  const handleDelete = (id) => {
    dispatch(deleteTransaction(id));
  };

  const handleClearFilters = () => {
    setSearch("");
    setTypeFilter("all");
    setCategoryFilter("all");
    setDateFilter("");
    setShowDatePicker(false);
  };

  const isFiltered =
    search.trim() !== "" ||
    typeFilter !== "all" ||
    categoryFilter !== "all" ||
    dateFilter !== "";

  return (
    <Container fluid className="tx-page py-4 py-md-5">
      <Container>

        {/* HEADER SECTION */}
        <Row className="align-items-center mb-4">
          <Col md={8}>
            <h2 className="tx-header-title">Transactions</h2>
            <p className="tx-header-subtitle">
              Track and manage your income and expenses.
            </p>
          </Col>

          <Col md={4} className="text-md-end mt-3 mt-md-0">
            <Button
              as={Link}
              to="/Add-transactions"
              variant="primary"
              className="fw-medium px-3"
            >
              + Add Transaction
            </Button>
          </Col>
        </Row>

        {/* CONTROLS CARD: SEARCH, TYPE FILTER & DATE FILTER */}
        <div className="tx-controls-card">
          <Row className="g-3 align-items-center">
            {/* Search Bar */}
            <Col xs={12} lg={6}>
              <div className="tx-search-container">
                <span className="tx-search-icon">
                  <SearchIcon />
                </span>
                <input
                  type="text"
                  className="tx-search-input"
                  placeholder="Search by title or category..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  aria-label="Search transactions"
                />
                {search && (
                  <button
                    type="button"
                    className="tx-search-clear"
                    onClick={() => setSearch("")}
                    aria-label="Clear search"
                  >
                    <XCloseIcon />
                  </button>
                )}
              </div>
            </Col>

            {/* Type Segmented Pill Filter & Date Button */}
            <Col xs={12} lg={6}>
              <div className="d-flex align-items-center justify-content-lg-end gap-2 flex-wrap">
                {/* Segmented Type Filter */}
                <div
                  className="tx-segmented-control"
                  role="tablist"
                  aria-label="Filter by transaction type"
                >
                  <button
                    type="button"
                    role="tab"
                    aria-selected={typeFilter === "all"}
                    className={`tx-segmented-btn ${
                      typeFilter === "all" ? "active" : ""
                    }`}
                    onClick={() => setTypeFilter("all")}
                  >
                    All
                  </button>

                  <button
                    type="button"
                    role="tab"
                    aria-selected={typeFilter === "income"}
                    className={`tx-segmented-btn ${
                      typeFilter === "income" ? "active" : ""
                    }`}
                    onClick={() => setTypeFilter("income")}
                  >
                    Income
                  </button>

                  <button
                    type="button"
                    role="tab"
                    aria-selected={typeFilter === "expense"}
                    className={`tx-segmented-btn ${
                      typeFilter === "expense" ? "active" : ""
                    }`}
                    onClick={() => setTypeFilter("expense")}
                  >
                    Expense
                  </button>
                </div>

                {/* Advanced Date Filter Button */}
                <button
                  type="button"
                  className={`tx-date-btn ${dateFilter ? "active" : ""}`}
                  onClick={() => setShowDatePicker((prev) => !prev)}
                  title="Filter by date"
                  aria-expanded={showDatePicker}
                >
                  <CalendarIcon />
                  <span>
                    {dateFilter
                      ? new Date(dateFilter).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short"
                        })
                      : "Date"}
                  </span>
                  {dateFilter && (
                    <span
                      role="button"
                      tabIndex={0}
                      onClick={(e) => {
                        e.stopPropagation();
                        setDateFilter("");
                      }}
                      className="ms-1 d-inline-flex align-items-center"
                      title="Clear date filter"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.stopPropagation();
                          setDateFilter("");
                        }
                      }}
                    >
                      <XCloseIcon />
                    </span>
                  )}
                </button>
              </div>
            </Col>
          </Row>

          {/* Optional Expandable Date Picker Panel */}
          {showDatePicker && (
            <div className="tx-date-panel">
              <span className="small text-muted fw-medium">Pick a date:</span>
              <input
                type="date"
                className="tx-date-picker"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              />
              {dateFilter && (
                <Button
                  variant="outline-secondary"
                  size="sm"
                  className="py-1 px-2"
                  onClick={() => setDateFilter("")}
                >
                  Reset date
                </Button>
              )}
            </div>
          )}

          {/* Active Filter Summary Bar */}
          {isFiltered && (
            <div className="tx-active-bar">
              <div className="d-flex align-items-center gap-2 flex-wrap">
                <span className="fw-medium">Showing:</span>
                {search && (
                  <Badge bg="secondary" className="fw-normal">
                    Search: "{search}"
                  </Badge>
                )}
                {typeFilter !== "all" && (
                  <Badge
                    bg={typeFilter === "income" ? "success" : "danger"}
                    className="fw-normal text-capitalize"
                  >
                    {typeFilter}
                  </Badge>
                )}
                {categoryFilter !== "all" && (
                  <Badge bg="primary" className="fw-normal text-capitalize">
                    Category: {categoryFilter}
                  </Badge>
                )}
                {dateFilter && (
                  <Badge bg="secondary" className="fw-normal">
                    Date: {dateFilter}
                  </Badge>
                )}
                <span className="text-muted ms-1">
                  ({filteredTransactions.length} result
                  {filteredTransactions.length === 1 ? "" : "s"})
                </span>
              </div>

              <button
                type="button"
                className="tx-clear-all-btn"
                onClick={handleClearFilters}
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>

        {/* CATEGORY FILTER CHIPS (HORIZONTAL SCROLLABLE ROW) */}
        <div
          className="tx-category-row"
          role="tablist"
          aria-label="Filter by category"
        >
          {CATEGORY_CHIPS.map((cat) => {
            const isSelected = categoryFilter === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                className={`tx-cat-chip ${isSelected ? "active" : ""}`}
                onClick={() => setCategoryFilter(cat.id)}
              >
                <span>{cat.emoji}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* TRANSACTION LIST (GROUPED BY DATE) */}
        {groupedTransactions.length > 0 ? (
          groupedTransactions.map(([dateKey, txList]) => (
            <div key={dateKey} className="tx-date-group">
              <div className="tx-date-header">
                <span className="tx-date-title">
                  {formatDateGroupHeader(dateKey)}
                </span>
                <span className="tx-date-count">
                  {txList.length} {txList.length === 1 ? "entry" : "entries"}
                </span>
              </div>

              <div className="tx-group-card">
                {txList.map((transaction) => {
                  const catInfo =
                    CATEGORY_MAP[transaction.category?.toLowerCase()] || {
                      label: transaction.category || "General",
                      emoji: "💰",
                      bg: "#f4f4f5"
                    };

                  const isIncome = transaction.type === "income";

                  return (
                    <div key={transaction.id} className="tx-row-item">
                      {/* Left: Category Icon + Title + Meta */}
                      <div className="tx-item-left">
                        <div
                          className="tx-icon-box"
                          style={{ backgroundColor: catInfo.bg }}
                          title={catInfo.label}
                        >
                          <span>{catInfo.emoji}</span>
                        </div>

                        <div className="tx-item-info">
                          <h6 className="tx-item-title mb-1">
                            {transaction.title}
                          </h6>
                          <div className="tx-item-meta">
                            <span>{catInfo.label}</span>
                            <span>•</span>
                            <span>{transaction.date || "No date"}</span>
                            <span>•</span>
                            <span
                              className={`tx-meta-badge ${
                                isIncome ? "income" : "expense"
                              }`}
                            >
                              {transaction.type}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Right: Amount + Actions */}
                      <div className="tx-item-right">
                        <div
                          className={`tx-amount ${
                            isIncome ? "income" : "expense"
                          }`}
                        >
                          {isIncome ? "+" : "-"} ₹
                          {Number(transaction.amount || 0).toLocaleString(
                            "en-IN"
                          )}
                        </div>

                        <div className="tx-actions">
                          <Link
                            to={`/edit-transaction/${transaction.id}`}
                            className="tx-action-btn edit"
                            title="Edit transaction"
                            aria-label="Edit transaction"
                          >
                            <EditIcon />
                          </Link>

                          <button
                            type="button"
                            className="tx-action-btn delete"
                            title="Delete transaction"
                            aria-label="Delete transaction"
                            onClick={() => handleDelete(transaction.id)}
                          >
                            <TrashIcon />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        ) : (
          /* EMPTY STATE */
          <div className="tx-empty-card">
            <div className="tx-empty-icon">
              <EmptyReceiptIcon />
            </div>
            <h5 className="tx-empty-title">No transactions found</h5>
            <p className="tx-empty-desc">
              {isFiltered
                ? "No transactions match your current filter combination. Try adjusting or clearing your filters."
                : "You haven't added any transactions yet. Start logging your income and expenses to track your finances."}
            </p>

            {isFiltered ? (
              <Button
                variant="outline-primary"
                size="sm"
                onClick={handleClearFilters}
              >
                Clear all filters
              </Button>
            ) : (
              <Button as={Link} to="/Add-transactions" variant="primary">
                + Add your first transaction
              </Button>
            )}
          </div>
        )}

      </Container>
    </Container>
  );
}

export default Transactions;
