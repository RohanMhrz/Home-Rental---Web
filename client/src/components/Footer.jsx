import "../styles/Footer.scss"
import { LocationOn, LocalPhone, Email } from "@mui/icons-material"
import { Link, useNavigate } from "react-router-dom";
const Footer = () => {

  return (
    <div className="footer">
      <div className="footer_left">
        <a href="/"><img src="/assets/logo.png" alt="logo" /></a>
      </div>

      <div className="footer_center">
        <h3>Useful Links</h3>
        <ul>
          <Link to="/about"><li>About Us</li></Link>
          <Link to="/terms"><li>Terms and Conditions</li></Link>
          <Link to="/refund"><li>Return and Refund Policy</li></Link>
        </ul>
      </div>

      <div className="footer_right">
        <h3>Contact</h3>
        <div className="footer_right_info">
          <LocalPhone />
          <p>+437890</p>
        </div>
        <div className="footer_right_info">
          <Email />
          <p>Homerental@support.com</p>
        </div>
        <img src="/assets/payment.png" alt="payment" />
      </div>
    </div>
  )
}

export default Footer