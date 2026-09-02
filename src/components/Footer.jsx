import { Link } from "react-router-dom";
import './Footer.css'


function Footer(){

    return (
    <footer className="footer">

      <div className="footer-container">

        <div className="footer-about">
          <h3>EXpensoo</h3>
          <p>
            Track your income, manage your expenses, and stay in control
            of your money.
          </p>
        </div>

        <div className="footer-links">
          <h4>Quick Links</h4>

          <Link to="/">Home</Link>
          
          <Link to="/sign-in">Sign In</Link>
          <Link to="/sign-up">Sign Up</Link>
        </div>

        <div className="footer-contact">
          <h4>Expense Tracker</h4>

          <p>Simple expense management</p>
          <p>Easy transaction tracking</p>
          <p>Secure user access</p>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© 2026 EXpensoo. All Rights Reserved.</p>
      </div>

    </footer>
  );

}
export default Footer;