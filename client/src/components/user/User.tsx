import { useNavigate } from "react-router-dom";
import { UserType } from "../../typings";
import "./user.scss";

const User = ({ user }: { user: UserType }) => {
  const navigate = useNavigate();
  return (
    <div className="user">
      <div className="user-info">
        <img
          src={
            user.profile_pic
              ? "/upload/" + user.profile_pic
              : "/default-profile.jpeg"
          }
          alt=""
        />
        <span>
          {user.first_name} {user.last_name}
        </span>
      </div>

      <div className="buttons">
        <button onClick={() => navigate(`/profile/${user.username}`)}>
          View
        </button>
      </div>
    </div>
  );
};

export default User;
