import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";

import User from '../user/User'
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/authContext";
import { UserType } from "../../typings";
import "./rightbar.scss";

const Rightbar = () => {
  const { currentUser } = useContext(AuthContext);

  const { data: allUsersData } = useQuery(["users"], () =>
    makeRequest.get("/users/find/").then((res) => {
      return res.data;
    })
  );

  const {
    isLoading: followsLoading,
    error: followsError,
    data: followData,
  } = useQuery(["follow"], () =>
    makeRequest
      .get("/follows?followedUsername=" + currentUser?.username)
      .then((res) => {
        return res.data;
      })
  );

  const notFollowing = allUsersData?.filter(
    (user: UserType) =>
      !followData?.includes(user.username) && user.id !== currentUser.id
  );

  return (
    <div className="rightbar">
      <div className="container">
        <div className="item">
          <span>Suggestions For You</span>

          {notFollowing?.map((user: UserType) => (
            <div key={user.id}>
              <User user={user} />
            </div>
          ))}
        </div>

        <div className="item">
          <span>Latest Activities</span>
          <div className="user">
            <div className="user-info">
              <img src="/default-profile.jpeg" alt="" />
              <p>
                <span>Dwigt Rortugal</span> changed their cover picture
              </p>
            </div>
            <span>1 minute ago</span>
          </div>
          <div className="user">
            <div className="user-info">
              <img src="/default-profile.jpeg" alt="" />
              <p>
                <span>Dwigt Rortugal</span> changed their cover picture
              </p>
            </div>
            <span>1 minute ago</span>
          </div>
          <div className="user">
            <div className="user-info">
              <img src="/default-profile.jpeg" alt="" />
              <p>
                <span>Dwigt Rortugal</span> changed their cover picture
              </p>
            </div>
            <span>1 minute ago</span>
          </div>
          <div className="user">
            <div className="user-info">
              <img src="/default-profile.jpeg" alt="" />
              <p>
                <span>Dwigt Rortugal</span> changed their cover picture
              </p>
            </div>
            <span>1 minute ago</span>
          </div>
        </div>

        <div className="item">
          <span>Online Friends</span>
          <div className="user">
            <div className="user-info">
              <img src="/default-profile.jpeg" alt="" />
              <div className="online" />
              <span>Dwigt Rortugal</span>
            </div>
          </div>
          <div className="user">
            <div className="user-info">
              <img src="/default-profile.jpeg" alt="" />
              <div className="online" />
              <span>Dwigt Rortugal</span>
            </div>
          </div>
          <div className="user">
            <div className="user-info">
              <img src="/default-profile.jpeg" alt="" />
              <div className="online" />
              <span>Dwigt Rortugal</span>
            </div>
          </div>
          <div className="user">
            <div className="user-info">
              <img src="/default-profile.jpeg" alt="" />
              <div className="online" />
              <span>Dwigt Rortugal</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rightbar;
