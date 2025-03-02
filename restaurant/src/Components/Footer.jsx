import React from "react";
import "../Styles/footer.css";
import { Facebook, Twitter, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <img
            src="https://plus.unsplash.com/premium_photo-1674374441531-138f34fb10d7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Zomato Logo"
          />
          <p>Discover the best food near you.</p>
        </div>

        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <a href="/about">About Us</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
            <li>
              <a href="/privacy-policy">Privacy Policy</a>
            </li>
            <li>
              <a href="/terms">Terms & Conditions</a>
            </li>
          </ul>
        </div>

        <div className="footer-social">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="https://facebook.com">
              <Facebook />
            </a>
            <a href="https://twitter.com">
              <Twitter />
            </a>
            <a href="https://instagram.com">
              <Instagram />
            </a>
          </div>
        </div>

        <div className="footer-app">
          <h4>Download App</h4>
          <div className="app-links">
            <a href="https://play.google.com">
              <img
                src="https://brandlogos.net/wp-content/uploads/2021/04/play-store-logo.png"
                alt="Play Store"
              />
            </a>
            <a href="https://apps.apple.com">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/App_Store_%28iOS%29.svg/512px-App_Store_%28iOS%29.svg.png"
                alt="App Store"
              />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} YumYard. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
