import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Badge,
  Button
} from "react-bootstrap";
import { useSelector } from "react-redux";
import { useState, useMemo } from "react";
import "./AdminTransactions.css";

// Modern SVG Icons
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

const XCloseIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const ArrowUpRightIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
    <line x1="7" y1="17" x2="17" y2="7"></line>
    <polyline points="7 7 17 7 17 17"></polyline>
  </svg>
);

const ArrowDownLeftIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
    <line x1="17" y1="7" x2="7" y2="17"></line>
    <polyline points="17 17 7 17 7 7"></polyline>
  </svg>
);

const ReceiptListIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="7" y1="8" x2="17" y2="8"></line>
    <line x1="7" y1="12" x2="17" y2="12"></line>
    <line x1="7" y1="16" x2="13" y2="16"></line>
  </svg>
);

const UserIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
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

// Category mappings
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
  other: { label: "Other", emoji: "📦", bg: "#f4f4f5" }
};

// Date group header helper
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

function AdminTransactions() {
  const transactions = useSelector(
    (state) => state.transactions.transactions
  );

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Dynamic summary metrics based on ALL transactions (not filtered)
  const totalTransactionsCount = transactions.length;

  const totalIncome = useMemo(() => {
    return transactions
      .filter((tx) => tx.type === "income")
      .reduce((sum, tx) => sum + Number(tx.amount || 0), 0);
  }, [transactions]);

  const totalExpense = useMemo(() => {
    return transactions
      .filter((tx) => tx.type === "expense")
      .reduce((sum, tx) => sum + Number(tx.amount || 0), 0);
  }, [transactions]);

  // Combined dynamic filtering across all users
  const filteredTransactions = useMemo(() => {
    const searchValue = search.toLowerCase().trim();

    return transactions.filter((transaction) => {
      const matchesSearch =
        !searchValue ||
        transaction.title?.toLowerCase().includes(searchValue) ||
        transaction.userEmail?.toLowerCase().includes(searchValue) ||
        transaction.category?.toLowerCase().includes(searchValue);

      const matchesType =
        typeFilter === "all" || transaction.type === typeFilter;

      const matchesCategory =
        categoryFilter === "all" ||
        transaction.category?.toLowerCase() === categoryFilter.toLowerCase();

      const matchesDate = !dateFilter || transaction.date === dateFilter;

      return matchesSearch && matchesType && matchesCategory && matchesDate;
    });
  }, [transactions, search, typeFilter, categoryFilter, dateFilter]);

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
    <Container fluid className="admin-tx-page px-0">

      {/* 1. HEADER SECTION */}
      <div className="mb-4">
        <h3 className="admin-tx-title">All Transactions</h3>
        <p className="admin-tx-subtitle">
          Monitor and manage transactions across all users.
        </p>
      </div>

      {/* 2. DYNAMIC SUMMARY CARDS (FULL DATASET) */}
      <Row className="g-3 mb-4">
        {/* Total Transactions */}
        <Col xs={12} md={4}>
          <div className="admin-stat-card">
            <div className="admin-stat-header">
              <span className="admin-stat-label">Total Transactions</span>
              <div className="admin-stat-icon total">
                <ReceiptListIcon />
              </div>
            </div>
            <div className="admin-stat-val">
              {totalTransactionsCount.toLocaleString("en-IN")}
            </div>
            <div className="admin-stat-sub">Across all registered users</div>
          </div>
        </Col>

        {/* Total Income */}
        <Col xs={12} md={4}>
          <div className="admin-stat-card">
            <div className="admin-stat-header">
              <span className="admin-stat-label">Total Income</span>
              <div className="admin-stat-icon income">
                <ArrowUpRightIcon />
              </div>
            </div>
            <div className="admin-stat-val text-success">
              ₹{totalIncome.toLocaleString("en-IN")}
            </div>
            <div className="admin-stat-sub">Platform-wide inflows</div>
          </div>
        </Col>

        {/* Total Expenses */}
        <Col xs={12} md={4}>
          <div className="admin-stat-card">
            <div className="admin-stat-header">
              <span className="admin-stat-label">Total Expenses</span>
              <div className="admin-stat-icon expense">
                <ArrowDownLeftIcon />
              </div>
            </div>
            <div className="admin-stat-val text-danger">
              ₹{totalExpense.toLocaleString("en-IN")}
            </div>
            <div className="admin-stat-sub">Platform-wide outflows</div>
          </div>
        </Col>
      </Row>

      {/* 3, 4, 5. CONTROLS CARD: SEARCH, TYPE FILTER, DATE FILTER */}
      <div className="admin-controls-card">
        <Row className="g-3 align-items-center">
          {/* Search Bar */}
          <Col xs={12} lg={6}>
            <div className="admin-search-container">
              <span className="admin-search-icon">
                <SearchIcon />
              </span>
              <input
                type="text"
                className="admin-search-input"
                placeholder="Search by title, category or user email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Search transactions"
              />
              {search && (
                <button
                  type="button"
                  className="admin-search-clear"
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                >
                  <XCloseIcon />
                </button>
              )}
            </div>
          </Col>

          {/* Segmented Type Filter & Date Filter Button */}
          <Col xs={12} lg={6}>
            <div className="d-flex align-items-center justify-content-lg-end gap-2 flex-wrap">
              {/* Segmented Type Filter */}
              <div
                className="admin-segmented-control"
                role="tablist"
                aria-label="Filter by transaction type"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={typeFilter === "all"}
                  className={`admin-segmented-btn ${
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
                  className={`admin-segmented-btn ${
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
                  className={`admin-segmented-btn ${
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
                className={`admin-date-btn ${dateFilter ? "active" : ""}`}
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

        {/* Expandable Date Picker Panel */}
        {showDatePicker && (
          <div className="admin-date-panel">
            <span className="small text-muted fw-medium">Pick a date:</span>
            <input
              type="date"
              className="admin-date-picker"
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

        {/* Active Filters Summary Bar */}
        {isFiltered && (
          <div className="admin-active-bar">
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
                ({filteredTransactions.length} of {transactions.length} record
                {filteredTransactions.length === 1 ? "" : "s"})
              </span>
            </div>

            <button
              type="button"
              className="admin-clear-all-btn"
              onClick={handleClearFilters}
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>

      {/* CATEGORY FILTER CHIPS (HORIZONTAL SCROLLABLE ROW) */}
      <div
        className="admin-category-row"
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
              className={`admin-cat-chip ${isSelected ? "active" : ""}`}
              onClick={() => setCategoryFilter(cat.id)}
            >
              <span>{cat.emoji}</span>
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* 6. TRANSACTION RECORDS (GROUPED BY DATE) */}
      {groupedTransactions.length > 0 ? (
        groupedTransactions.map(([dateKey, txList]) => (
          <div key={dateKey} className="admin-tx-date-group">
            <div className="admin-tx-date-header">
              <span className="admin-tx-date-title">
                {formatDateGroupHeader(dateKey)}
              </span>
              <span className="text-muted small">
                {txList.length} {txList.length === 1 ? "entry" : "entries"}
              </span>
            </div>

            {/* Desktop Modern Table View */}
            <div className="admin-tx-table-card d-none d-md-block">
              <Table responsive hover className="admin-tx-table">
                <thead>
                  <tr>
                    <th className="ps-4">Transaction</th>
                    <th>User</th>
                    <th>Category</th>
                    <th>Date</th>
                    <th>Type</th>
                    <th className="text-end pe-4">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {txList.map((transaction) => {
                    const catInfo =
                      CATEGORY_MAP[transaction.category?.toLowerCase()] || {
                        label: transaction.category || "General",
                        emoji: "💰",
                        bg: "#f4f4f5"
                      };

                    const isIncome = transaction.type === "income";

                    return (
                      <tr key={transaction.id}>
                        {/* Transaction Title + Icon */}
                        <td className="ps-4">
                          <div className="d-flex align-items-center gap-3">
                            <div
                              className="admin-icon-box"
                              style={{ backgroundColor: catInfo.bg }}
                              title={catInfo.label}
                            >
                              <span>{catInfo.emoji}</span>
                            </div>
                            <div>
                              <div className="fw-semibold text-dark">
                                {transaction.title}
                              </div>
                              <small className="text-muted">
                                ID #{transaction.id}
                              </small>
                            </div>
                          </div>
                        </td>

                        {/* User Email */}
                        <td>
                          <span
                            className="admin-user-pill"
                            title={transaction.userEmail}
                          >
                            <UserIcon />
                            <span>{transaction.userEmail || "No email"}</span>
                          </span>
                        </td>

                        {/* Category */}
                        <td>
                          <span className="text-capitalize text-muted small fw-medium">
                            {catInfo.label}
                          </span>
                        </td>

                        {/* Date */}
                        <td className="text-muted small">
                          {transaction.date || "—"}
                        </td>

                        {/* Type Badge */}
                        <td>
                          <Badge
                            bg={isIncome ? "success" : "danger"}
                            className="fw-normal text-capitalize px-2 py-1"
                          >
                            {transaction.type}
                          </Badge>
                        </td>

                        {/* Amount */}
                        <td className="text-end pe-4">
                          <span
                            className={`admin-amount ${
                              isIncome ? "income" : "expense"
                            }`}
                          >
                            {isIncome ? "+" : "-"} ₹
                            {Number(transaction.amount || 0).toLocaleString(
                              "en-IN"
                            )}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>

            {/* Mobile Card View */}
            <div className="admin-mobile-card d-md-none">
              {txList.map((transaction) => {
                const catInfo =
                  CATEGORY_MAP[transaction.category?.toLowerCase()] || {
                    label: transaction.category || "General",
                    emoji: "💰",
                    bg: "#f4f4f5"
                  };

                const isIncome = transaction.type === "income";

                return (
                  <div key={transaction.id} className="admin-mobile-item">
                    {/* Top Row: Icon + Title + Amount */}
                    <div className="d-flex align-items-center justify-content-between gap-2">
                      <div className="d-flex align-items-center gap-2 min-width-0">
                        <div
                          className="admin-icon-box"
                          style={{ backgroundColor: catInfo.bg }}
                        >
                          <span>{catInfo.emoji}</span>
                        </div>
                        <div className="text-truncate">
                          <div className="fw-semibold text-dark text-truncate">
                            {transaction.title}
                          </div>
                          <small className="text-muted">
                            {catInfo.label}
                          </small>
                        </div>
                      </div>

                      <div
                        className={`admin-amount text-end flex-shrink-0 ${
                          isIncome ? "income" : "expense"
                        }`}
                      >
                        {isIncome ? "+" : "-"} ₹
                        {Number(transaction.amount || 0).toLocaleString("en-IN")}
                      </div>
                    </div>

                    {/* Bottom Metadata: User, Date, Type */}
                    <div className="admin-mobile-meta justify-content-between">
                      <span className="admin-user-pill">
                        <UserIcon />
                        <span>{transaction.userEmail || "No email"}</span>
                      </span>

                      <div className="d-flex align-items-center gap-2">
                        <span>{transaction.date}</span>
                        <Badge
                          bg={isIncome ? "success" : "danger"}
                          className="fw-normal text-capitalize"
                        >
                          {transaction.type}
                        </Badge>
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
        <div className="admin-empty-card">
          <div className="admin-empty-icon">
            <EmptyReceiptIcon />
          </div>
          <h5 className="admin-empty-title">No transactions found</h5>
          <p className="admin-empty-desc">
            {isFiltered
              ? "No transactions match your search and filter criteria. Try adjusting your query or clearing filters."
              : "No user transactions are currently stored in the system."}
          </p>

          {isFiltered && (
            <Button
              variant="outline-primary"
              size="sm"
              onClick={handleClearFilters}
            >
              Clear all filters
            </Button>
          )}
        </div>
      )}

    </Container>
  );
}

export default AdminTransactions;
