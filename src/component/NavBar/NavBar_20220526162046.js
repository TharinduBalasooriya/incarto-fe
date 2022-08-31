import React from "react";
import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from 'react-router-dom';

export default function NavBar() {
  let user = JSON.parse(localStorage.getItem("user"));
  const [logedIn, setLogedIn] = React.useState(user ? true : false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleMenuClose = (event) => {
    console.log(event);

    switch (event) {
      case "logout":
        localStorage.removeItem("user");
        setLogedIn(false);
        break;
      case "profile":
        navigate("/prefProfileMgmt");
        break;
      default:
    }
    setAnchorEl(null);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <header className={`${styles.navbar}`}>
      <Link to="/">
        <div className={`${styles.navbar__title} ${styles.navbar__item}`}>
          <img
            src="https://res.cloudinary.com/iplus/image/upload/v1649581381/new/incartologo_wu3u3g_copy_sadsxg.png"
            alt="logo"
            className={`${styles.navabar_log}`}
          />
        </div>
      </Link>

      <Link
        to="/propertyList"
        style={{ color: "white", textDecoration: "none" }}
      >
        <div className={`${styles.navbar__item}`}>Buy</div>
      </Link>

      <div className={`${styles.navbar__item}`}>Sell</div>
      <div className={`${styles.navbar__item} ${styles.navbar__lst_item}`}>
        Insights
      </div>

      {!logedIn ? (
        <Link to="/login" style={{ color: "white", textDecoration: "none" }}>
          <div className={`${styles.navbar__item} ${styles.nav_signup}`}>
            Sign up or Log in
          </div>
        </Link>
      ) : (
        <div>
          <div
            style={{ color: "white", textDecoration: "none" }}
            id="settingsButton"
          >
            <div
              className={`${styles.navbar__item} ${styles.nav_signup}`}
              onClick={handleMenuClick}
            >
              Settings & Profile
            </div>
          </div>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            MenuListProps={{
              "aria-labelledby": "settingsButton",
            }}
          >
            <MenuItem
              onClick={() => {
                handleMenuClose("account");
              }}
            >
              My account
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleMenuClose("profile");
              }}
              name="account"
            >
              Prefernce Profile
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleMenuClose("logout");
              }}
              name="logout"
            >
              Logout
            </MenuItem>
          </Menu>
        </div>
      )}
    </header>
  );
}
