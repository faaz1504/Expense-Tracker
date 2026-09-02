import { Link } from "react-router-dom";
import './Home.css'

function Home(){

    return (
    <div className="home-page">

      <section className="hero-section">

        <div className="hero-content">

          <p className="hero-small-text">
            SIMPLE EXPENSE MANAGEMENT
          </p>

          <h1>
            Take Control of Your
            <span> Money</span>
          </h1>

          <p className="hero-description">
            Track your income and expenses, manage your daily transactions,
            and understand where your money goes.
          </p>

          <div className="hero-buttons">

            <Link to="/sign-up" className="get-started-btn">
              Get Started
            </Link>

            <Link to="/sign-in" className="signin-home-btn">
              Sign In
            </Link>

          </div>

        </div>


        <div className="hero-dashboard">

          <div className="balance-card">
            <p>Current Balance</p>
            <h2>₹24,500</h2>
          </div>

          <div className="summary-cards">

            <div className="summary-card">
              <p>Total Income</p>
              <h3>₹35,000</h3>
            </div>

            <div className="summary-card">
              <p>Total Expense</p>
              <h3>₹10,500</h3>
            </div>

          </div>

          <div className="recent-card">

            <h3>Recent Transactions</h3>

            <div className="transaction">
              <div>
                <strong>Salary</strong>
                <p>Income</p>
              </div>

              <span className="income">
                + ₹30,000
              </span>
            </div>

            <div className="transaction">
              <div>
                <strong>Food</strong>
                <p>Expense</p>
              </div>

              <span className="expense">
                - ₹500
              </span>
            </div>

            <div className="transaction">
              <div>
                <strong>Shopping</strong>
                <p>Expense</p>
              </div>

              <span className="expense">
                - ₹2,000
              </span>
            </div>

          </div>

        </div> 

      </section>


      <section className="features-section">

        <h2>Manage Your Money Easily</h2>

        <div className="features-container">

          <div className="feature-card">
            <h3>Track Expenses</h3>
            <p>
              Easily record and manage your daily expenses.
            </p>
          </div>

          <div className="feature-card">
            <h3>Track Income</h3>
            <p>
              Keep track of your income from different sources.
            </p>
          </div>

          <div className="feature-card">
            <h3>View Balance</h3>
            <p>
              See your current balance and understand your spending.
            </p>
          </div>

        </div>

      </section>

    </div>
  );


}
export default Home;