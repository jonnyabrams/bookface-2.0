import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { useContext, useState } from "react";

import "./profile.scss";
import Posts from "../../components/posts/Posts";
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/authContext";
import Update from "../../components/update/Update";

const Profile = () => {
  const [openUpdate, setOpenUpdate] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const username = useLocation().pathname.split("/")[2];

  const { isLoading, error, data } = useQuery(["user", username], () =>
    makeRequest.get("/users/find/" + username).then((res) => {
      return res.data;
    })
  );

  // get usernames of all profile user's followers
  const {
    isLoading: followsLoading,
    error: followsError,
    data: followData,
  } = useQuery(["follow", username], () =>
    makeRequest.get("/follows?followedUsername=" + username).then((res) => {
      return res.data;
    })
  );

  console.log(followData)

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (following) => {
      // @ts-ignore
      if (following) return makeRequest.delete("/follows?username=" + username);
      // if not liked...
      // @ts-ignore
      return makeRequest.post("/follows", { username });
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["follow"]);
      },
    }
  );

  const handleFollow = () => {
    mutation.mutate(followData?.includes(currentUser?.username));
  };

  return (
    <div className="profile">
      {isLoading ? (
        "Loading..."
      ) : (
        <>
          <div className="images">
            <img
              src={
                data?.cover_pic && data?.cover_pic !== "/default-cover.jpeg"
                  ? `/upload/${data?.cover_pic}`
                  : "/default-cover.jpeg"
              }
              alt=""
              className="cover-pic"
            />
            <img
              src={
                data?.profile_pic &&
                data?.profile_pic !== "/default-profile.jpeg"
                  ? `/upload/${data?.profile_pic}`
                  : "/default-profile.jpeg"
              }
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
                <a href="https://twitter.com/">
                  <TwitterIcon fontSize="large" />
                </a>
                <a href="https://linkedin.com">
                  <LinkedInIcon fontSize="large" />
                </a>
              </div>
              <div className="center">
                <span>
                  {data?.first_name} {data?.last_name}
                </span>
                <div className="info">
                  <div className="item">
                    <PlaceIcon />
                    <span>{data?.city ? data?.city : "Earth"}</span>
                  </div>
                  <div className="item">
                    <LanguageIcon />
                    <span>
                      {data?.website ? data?.website : "bookface.com"}
                    </span>
                  </div>
                </div>
                {followsLoading ? (
                  "Loading..."
                ) : currentUser?.username === username ? (
                  <button onClick={() => setOpenUpdate(true)}>Update</button>
                ) : (
                  <button onClick={handleFollow}>
                    {followData?.includes(currentUser.username)
                      ? "Following"
                      : "Follow"}
                  </button>
                )}
              </div>
              <div className="right">
                <EmailOutlinedIcon />
                <MoreVertIcon />
              </div>
            </div>
          </div>
          <Posts username={username} />
        </>
      )}
      {openUpdate && <Update setOpenUpdate={setOpenUpdate} user={data} />}
    </div>
  );
};

export default Profile;
