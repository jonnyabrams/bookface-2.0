import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link, useNavigate } from "react-router-dom";

import "./navbar.scss";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";

interface IProps {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar = ({ darkMode, setDarkMode }: IProps) => {
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <span>Bookface</span>
        </Link>
        <HomeOutlinedIcon
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        />
        {darkMode ? (
          <WbSunnyOutlinedIcon
            style={{ cursor: "pointer" }}
            onClick={() => setDarkMode(!darkMode)}
          />
        ) : (
          <DarkModeOutlinedIcon
            style={{ cursor: "pointer" }}
            onClick={() => setDarkMode(!darkMode)}
          />
        )}
        <LogoutIcon style={{ cursor: "pointer" }} onClick={() => logout()} />
        <div className="search">
          <SearchOutlinedIcon />
          <input type="text" placeholder="Search..." />
        </div>
      </div>

      <div className="right">
        <Link
          style={{ textDecoration: "none", color: "inherit" }}
          to={`/profile/${currentUser.username}`}
        >
          <PersonOutlinedIcon />
        </Link>
        <EmailOutlinedIcon />
        <NotificationsOutlinedIcon />
        <Link
          style={{ textDecoration: "none", color: "inherit" }}
          to={`/profile/${currentUser.username}`}
        >
          <div className="user">
            <img src="/default-profile.jpeg" alt="" />
            <span>{`${currentUser.first_name} ${currentUser.last_name}`}</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
