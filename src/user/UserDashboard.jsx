import { Link } from "react-router-dom";
import './dashboard.css'

function UserDashboard(){

    return(

        <div>

        <div className="dashboard-page">

      <div className="dashboard-header">
        <div>
          <p className="welcome-text">Welcome back</p>
          <h2>Manage your money wisely</h2>
        </div>

        <Link to="/Add-transactions" className="add-btn">
          + Add Transaction
        </Link>
      </div>


      {/* SUMMARY CARDS */}

      <div className="summary-container">

        <div className="dashboard-card balance-box">
          <p>Current Balance</p>
          <h2>₹24,500</h2>
          <span>Available balance</span>
        </div>


        <div className="dashboard-card">
          <p>Total Income</p>
          <h2 className="income-text">₹35,000</h2>
          <span>This month</span>
        </div>


        <div className="dashboard-card">
          <p>Total Expense</p>
          <h2 className="expense-text">₹10,500</h2>
          <span>This month</span>
        </div>

      </div>


      

      <div className="dashboard-content">

        {/* RECENT TRANSACTIONS */}

        <div className="recent-transactions">

          <div className="section-heading">
            <h3>Recent Transactions</h3>

            <Link to="/transactions">
              View All
            </Link>
          </div>


          <div className="transaction-row">

            <div>
              <h4>Salary</h4>
              <p>Income • Aug 30</p>
            </div>

            <span className="income-text">
              + ₹30,000
            </span>

          </div>


          <div className="transaction-row">

            <div>
              <h4>Groceries</h4>
              <p>Food • Aug 29</p>
            </div>

            <span className="expense-text">
              - ₹1,500
            </span>

          </div>


          <div className="transaction-row">

            <div>
              <h4>Petrol</h4>
              <p>Travel • Aug 28</p>
            </div>

            <span className="expense-text">
              - ₹1,000
            </span>

          </div>


          <div className="transaction-row">

            <div>
              <h4>Shopping</h4>
              <p>Shopping • Aug 27</p>
            </div>

            <span className="expense-text">
              - ₹2,000
            </span>

          </div>

        </div>


        {/* SPENDING SUMMARY */}

        <div className="spending-summary">

          <h3>Spending Summary</h3>

          <div className="summary-item">
            <span>Food</span>
            <strong>₹2,500</strong>
          </div>

          <div className="summary-item">
            <span>Travel</span>
            <strong>₹1,500</strong>
          </div>

          <div className="summary-item">
            <span>Shopping</span>
            <strong>₹3,000</strong>
          </div>

          <div className="summary-item">
            <span>Bills</span>
            <strong>₹3,500</strong>
          </div>

        </div>

      </div>

    </div>


        </div>


    )

}
export default UserDashboard;