import React from "react";
import  "./footer.css";
import { FaFacebookF, FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";

export default function NavBar() {
  return (
    <footer class="footer-distributed">
      <div class="footer-left">
        <span>
          {" "}
          <img
            src="https://res.cloudinary.com/iplus/image/upload/v1649581381/new/incartologo_wu3u3g_copy_sadsxg.png"
            alt="logo"
            class="logo"
          />
        </span>

        <p class="footer-links">
          <a href="/"  hclass="link-1">
            Home
          </a>

          <a href="/">Price Prediction</a>

          <a href="/">Insights</a>

          <a href="/">Preference Analysis</a>
          
          <a href="/">Seller Support</a>

          <a href="/">Faq</a>

          <a href="/">Contact</a>
        </p>

        <p class="footer-company-name">
          © Copyright incarto 2022 | All Rights Reserved
        </p>
      </div>

      <div class="footer-center">
        <div>
          <i class="fa fa-map-marker"></i>
          <p>
            <span>444 S. Cedros Ave</span> Solana Beach, Sri Lanka
          </p>
        </div>

        <div>
          <i class="fa fa-phone"></i>
          <p>+1.0115678567</p>
        </div>
        <div>
          <i class="fa fa-phone"></i>

          <p>+1.0714567366</p>
        </div>

        <div>
          <i class="fa fa-envelope"></i>
          <p>
            <a href="mailto:support@company.com">support@incarto.com</a>
          </p>
        </div>
      </div>

      <div class="footer-right">
        <p class="footer-company-about">
          <span>About InCarto</span>
          Lorem ipsum dolor sit amet, consectateur adispicing elit. Fusce
          euismod convallis velit, eu auctor lacus vehicula sit amet.
        </p>

        <div class="footer-icons">
          <a href="/">
            <FaFacebookF />
          </a>
          <a href="/">
            <FaTwitter />
          </a>
          <a href="/">
            <FaLinkedin />
          </a>
          <a href="/">
            <FaGithub />
          </a>
        </div>
      </div>
    </footer>
  );
}
