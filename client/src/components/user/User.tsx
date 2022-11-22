import { Link } from "react-router-dom";
import { UserType } from "../../typings";
import "./user.scss";

const User = ({ user }: { user: UserType }) => {
  return (
    <div className="user">
      <div className="user-info">
        <Link to={`/profile/${user.username}`}>
        <img
          src={
            user.profile_pic
              ? "/upload/" + user.profile_pic
              : "/default-profile.jpeg"
          }
          alt=""
        />
        </Link>
        <span>
          {user.first_name} {user.last_name}
        </span>
      </div>

      <div className="buttons">
        <button>Follow</button>
        <button>Dismiss</button>
      </div>
    </div>
  );
};

export default User;
