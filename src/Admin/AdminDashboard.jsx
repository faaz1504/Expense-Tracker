import {
  Container,
  Row,
  Col,
  Badge
} from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useState, useMemo } from "react";
import "./AdminDashboard.css";

// SVG Icons
const UsersIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
);

const ReceiptListIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="7" y1="8" x2="17" y2="8"></line>
    <line x1="7" y1="12" x2="17" y2="12"></line>
    <line x1="7" y1="16" x2="13" y2="16"></line>
  </svg>
);

const ArrowUpRightIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <line x1="7" y1="17" x2="17" y2="7"></line>
    <polyline points="7 7 17 7 17 17"></polyline>
  </svg>
);

const ArrowDownLeftIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <line x1="17" y1="7" x2="7" y2="17"></line>
    <polyline points="17 17 7 17 7 7"></polyline>
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

const ArrowRightIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);

// Category visual mappings
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

function AdminDashboard() {
  const users = useSelector((state) => state.auth.users || []);
  const transactions = useSelector(
    (state) => state.transactions.transactions || []
  );

  const [hoveredMonth, setHoveredMonth] = useState(null);

  // Normal users (excluding admin)
  const normalUsers = useMemo(() => {
    return users.filter((u) => u.role === "user");
  }, [users]);

  // Statistics calculation across all user data
  const totalUsersCount = normalUsers.length;
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

  // Monthly Analytics for Income vs Expense (Last 6 Months)
  const monthlyAnalytics = useMemo(() => {
    const today = new Date();
    const months = [];

    for (let i = 5; i >= 0; i--) {
      const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
      months.push({
        monthIndex: d.getMonth(),
        year: d.getFullYear(),
        shortLabel: d.toLocaleDateString("en-US", { month: "short" }),
        fullLabel: d.toLocaleDateString("en-US", { month: "long", year: "numeric" }),
        income: 0,
        expense: 0
      });
    }

    transactions.forEach((tx) => {
      if (!tx.date) return;
      const parts = String(tx.date).split("-");
      if (parts.length >= 2) {
        const txYear = Number(parts[0]);
        const txMonth = Number(parts[1]) - 1;

        const target = months.find(
          (m) => m.year === txYear && m.monthIndex === txMonth
        );
        if (target) {
          const amt = Number(tx.amount || 0);
          if (tx.type === "income") {
            target.income += amt;
          } else if (tx.type === "expense") {
            target.expense += amt;
          }
        }
      }
    });

    return months;
  }, [transactions]);

  // Max value to scale bar heights proportionally
  const maxChartVal = useMemo(() => {
    const maxInMonths = Math.max(
      ...monthlyAnalytics.map((m) => Math.max(m.income, m.expense)),
      0
    );
    return maxInMonths > 0 ? maxInMonths : 1000;
  }, [monthlyAnalytics]);

  // Recent 5 Users
  const recentUsers = useMemo(() => {
    return [...normalUsers]
      .sort((a, b) => Number(b.id || 0) - Number(a.id || 0))
      .slice(0, 5);
  }, [normalUsers]);

  // Recent 5 Transactions across all users
  const recentTransactions = useMemo(() => {
    return [...transactions]
      .sort((a, b) => {
        const dateA = a.date ? new Date(a.date).getTime() : 0;
        const dateB = b.date ? new Date(b.date).getTime() : 0;
        if (dateB !== dateA) return dateB - dateA;
        return Number(b.id || 0) - Number(a.id || 0);
      })
      .slice(0, 5);
  }, [transactions]);

  // Current formatted date
  const currentFormattedDate = useMemo(() => {
    return new Date().toLocaleDateString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  }, []);

  return (
    <Container fluid className="admin-dash-page px-0">

      {/* 1. WELCOME SECTION */}
      <div className="admin-welcome-box">
        <div>
          <h2 className="admin-welcome-title">Welcome back, Admin</h2>
          <p className="admin-welcome-sub">
            Here's what's happening with EXpensoo today.
          </p>
        </div>

        <div className="admin-date-pill">
          <CalendarIcon />
          <span>{currentFormattedDate}</span>
        </div>
      </div>

      {/* 2. FOUR STATISTICS CARDS */}
      <Row className="g-3 mb-4">
        {/* Total Users */}
        <Col xs={12} sm={6} lg={3}>
          <div className="admin-dash-stat-card">
            <div className="admin-dash-stat-top">
              <span className="admin-dash-stat-label">Total Users</span>
              <div className="admin-dash-icon-box users">
                <UsersIcon />
              </div>
            </div>
            <div className="admin-dash-stat-val">
              {totalUsersCount.toLocaleString("en-IN")}
            </div>
            <div className="admin-dash-stat-sub">Registered accounts</div>
          </div>
        </Col>

        {/* Total Transactions */}
        <Col xs={12} sm={6} lg={3}>
          <div className="admin-dash-stat-card">
            <div className="admin-dash-stat-top">
              <span className="admin-dash-stat-label">Total Transactions</span>
              <div className="admin-dash-icon-box tx">
                <ReceiptListIcon />
              </div>
            </div>
            <div className="admin-dash-stat-val">
              {totalTransactionsCount.toLocaleString("en-IN")}
            </div>
            <div className="admin-dash-stat-sub">Platform entries</div>
          </div>
        </Col>

        {/* Total Income */}
        <Col xs={12} sm={6} lg={3}>
          <div className="admin-dash-stat-card">
            <div className="admin-dash-stat-top">
              <span className="admin-dash-stat-label">Total Income</span>
              <div className="admin-dash-icon-box income">
                <ArrowUpRightIcon />
              </div>
            </div>
            <div className="admin-dash-stat-val text-success">
              ₹{totalIncome.toLocaleString("en-IN")}
            </div>
            <div className="admin-dash-stat-sub">Platform-wide inflows</div>
          </div>
        </Col>

        {/* Total Expenses */}
        <Col xs={12} sm={6} lg={3}>
          <div className="admin-dash-stat-card">
            <div className="admin-dash-stat-top">
              <span className="admin-dash-stat-label">Total Expenses</span>
              <div className="admin-dash-icon-box expense">
                <ArrowDownLeftIcon />
              </div>
            </div>
            <div className="admin-dash-stat-val text-danger">
              ₹{totalExpense.toLocaleString("en-IN")}
            </div>
            <div className="admin-dash-stat-sub">Platform-wide outflows</div>
          </div>
        </Col>
      </Row>

      {/* 3. TRANSACTION ANALYTICS: INCOME VS EXPENSE CHART */}
      <div className="admin-chart-card">
        <div className="admin-chart-header">
          <div>
            <h4 className="admin-chart-title">Transaction Analytics</h4>
            <p className="admin-chart-subtitle">
              Monthly comparison of total platform income and expenses.
            </p>
          </div>

          <div className="d-flex align-items-center gap-3 flex-wrap">
            {hoveredMonth ? (
              <div className="admin-chart-hover-info">
                <strong>{hoveredMonth.fullLabel}:</strong>{" "}
                <span className="text-success fw-semibold">
                  +₹{hoveredMonth.income.toLocaleString("en-IN")}
                </span>{" "}
                |{" "}
                <span className="text-danger fw-semibold">
                  -₹{hoveredMonth.expense.toLocaleString("en-IN")}
                </span>
              </div>
            ) : null}

            <div className="admin-chart-legend">
              <div className="admin-legend-item">
                <span className="admin-legend-dot income"></span>
                <span>Income</span>
              </div>
              <div className="admin-legend-item">
                <span className="admin-legend-dot expense"></span>
                <span>Expenses</span>
              </div>
            </div>
          </div>
        </div>

        {/* Responsive Bar Chart Body */}
        <div className="admin-chart-body">
          {/* Subtle horizontal grid lines */}
          <div className="admin-chart-grid-line" style={{ top: "0%" }}></div>
          <div className="admin-chart-grid-line" style={{ top: "33%" }}></div>
          <div className="admin-chart-grid-line" style={{ top: "66%" }}></div>

          {monthlyAnalytics.map((monthData, idx) => {
            const incomeHeight =
              maxChartVal > 0
                ? Math.max((monthData.income / maxChartVal) * 100, 3)
                : 3;
            const expenseHeight =
              maxChartVal > 0
                ? Math.max((monthData.expense / maxChartVal) * 100, 3)
                : 3;

            return (
              <div
                key={idx}
                className="admin-chart-column"
                onMouseEnter={() => setHoveredMonth(monthData)}
                onMouseLeave={() => setHoveredMonth(null)}
              >
                <div className="admin-chart-bars-wrap">
                  {/* Income Bar (Green) */}
                  <div
                    className="admin-chart-bar income"
                    style={{ height: `${incomeHeight}%` }}
                    title={`${monthData.fullLabel} Income: ₹${monthData.income.toLocaleString("en-IN")}`}
                  ></div>

                  {/* Expense Bar (Red) */}
                  <div
                    className="admin-chart-bar expense"
                    style={{ height: `${expenseHeight}%` }}
                    title={`${monthData.fullLabel} Expense: ₹${monthData.expense.toLocaleString("en-IN")}`}
                  ></div>
                </div>

                <span className="admin-chart-month-label">
                  {monthData.shortLabel}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4 & 5. RECENT TRANSACTIONS AND RECENT USERS SECTIONS */}
      <Row className="g-4">
        {/* RECENT TRANSACTIONS (Col 7) */}
        <Col xs={12} lg={7}>
          <div className="admin-section-card">
            <div className="admin-section-header">
              <h5 className="admin-section-title">Recent Transactions</h5>
              <Link to="/admin-transactions" className="admin-view-all-link">
                <span>View All Transactions</span>
                <ArrowRightIcon />
              </Link>
            </div>

            <div className="admin-section-body">
              {recentTransactions.length > 0 ? (
                recentTransactions.map((tx) => {
                  const catInfo =
                    CATEGORY_MAP[tx.category?.toLowerCase()] || {
                      label: tx.category || "General",
                      emoji: "💰",
                      bg: "#f4f4f5"
                    };
                  const isIncome = tx.type === "income";

                  return (
                    <div key={tx.id} className="admin-dash-tx-item">
                      <div className="admin-dash-tx-left">
                        <div
                          className="admin-dash-icon-box-sm"
                          style={{ backgroundColor: catInfo.bg }}
                          title={catInfo.label}
                        >
                          <span>{catInfo.emoji}</span>
                        </div>

                        <div className="admin-dash-tx-info">
                          <div className="admin-dash-tx-title">
                            {tx.title}
                          </div>
                          <div className="admin-dash-tx-meta">
                            <span>{tx.userEmail || "No email"}</span>
                            <span>•</span>
                            <span>{tx.date || "—"}</span>
                            <span>•</span>
                            <Badge
                              bg={isIncome ? "success" : "danger"}
                              className="fw-normal text-capitalize px-2"
                              style={{ fontSize: "0.7rem" }}
                            >
                              {tx.type}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <div className="admin-dash-tx-right">
                        <div
                          className={`admin-dash-tx-amount ${
                            isIncome ? "income" : "expense"
                          }`}
                        >
                          {isIncome ? "+" : "-"} ₹
                          {Number(tx.amount || 0).toLocaleString("en-IN")}
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="admin-dash-empty-box">
                  No transactions recorded yet.
                </div>
              )}
            </div>
          </div>
        </Col>

        {/* RECENT USERS (Col 5) */}
        <Col xs={12} lg={5}>
          <div className="admin-section-card">
            <div className="admin-section-header">
              <h5 className="admin-section-title">Recent Users</h5>
              <Link to="/admin-users" className="admin-view-all-link">
                <span>View All Users</span>
                <ArrowRightIcon />
              </Link>
            </div>

            <div className="admin-section-body">
              {recentUsers.length > 0 ? (
                recentUsers.map((u) => {
                  const initial = u.name ? u.name.charAt(0).toUpperCase() : "U";
                  const isActive = u.status !== false;

                  return (
                    <div key={u.id} className="admin-dash-user-item">
                      <div className="admin-dash-user-left">
                        <div className="admin-dash-avatar">{initial}</div>

                        <div style={{ minWidth: 0, flex: 1 }}>
                          <div className="admin-dash-user-name">
                            {u.name || "Unnamed User"}
                          </div>
                          <div className="admin-dash-user-email">
                            {u.email}
                          </div>
                        </div>
                      </div>

                      <div className="text-end flex-shrink-0 ms-2">
                        <Badge
                          bg={isActive ? "success" : "secondary"}
                          className="fw-normal px-2 py-1"
                          style={{ fontSize: "0.72rem" }}
                        >
                          {isActive ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="admin-dash-empty-box">
                  No registered users found.
                </div>
              )}
            </div>
          </div>
        </Col>
      </Row>

    </Container>
  );
}

export default AdminDashboard;
