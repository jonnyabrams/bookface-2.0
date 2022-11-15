import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useQuery } from "@tanstack/react-query";

import "./profile.scss";
import Posts from "../../components/posts/Posts";
import { makeRequest } from "../../axios";

const Profile = () => {
  // const { isLoading, error, data } = useQuery(["user"], () =>
  //   makeRequest.get("/users/find" + userId).then((res) => {
  //     return res.data;
  //   })
  // );

  return (
    <div className="profile">
      <div className="images">
        <img
          src="https://images.pexels.com/photos/13440765/pexels-photo-13440765.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt=""
          className="cover-pic"
        />
        <img
          src="https://images.pexels.com/photos/14028501/pexels-photo-14028501.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
          alt=""
          className="profile-pic"
        />
      </div>
      <div className="profile-container">
        <div className="user-info">
          <div className="left">
            <a href="http://facebook.com">
              <InstagramIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <TwitterIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <LinkedInIcon fontSize="large" />
            </a>
          </div>
          <div className="center">
            <span>Bobson Dugnutt</span>
            <div className="info">
              <div className="item">
                <PlaceIcon />
                <span>UK</span>
              </div>
              <div className="item">
                <LanguageIcon />
                <span>bobs.on</span>
              </div>
            </div>
            <button>Follow</button>
          </div>
          <div className="right">
            <EmailOutlinedIcon />
            <MoreVertIcon />
          </div>
        </div>
      </div>
      <div className="posts"></div>
      <Posts />
    </div>
  );
};

export default Profile;
