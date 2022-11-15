import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import TimeAgo from "react-timeago";

import { PostType } from "../../typings";
import "./post.scss";
import Comments from "../comments/Comments";
import { useState } from "react";

interface IProps {
  post: PostType;
}

const Post = ({ post }: IProps) => {
  const [commentsOpen, setCommentsOpen] = useState(false);

  //temporary
  const liked = false;

  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="user-info">
            <img
              src={
                post.profile_pic ? post.profile_pic : "/default-profile.jpeg"
              }
              alt=""
            />
            <div className="details">
              <Link
                to={`/profile/${post.user_id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name">{`${post.first_name} ${post.last_name}`}</span>
              </Link>
              <span className="date">
                <TimeAgo date={post.created_at} />
              </span>
            </div>
          </div>
          <MoreHorizIcon />
        </div>

        <div className="content">
          <p>{post.content}</p>
          <img src={post.img && "./upload/" + post.img} alt="" />
        </div>

        <div className="info">
          <div className="item">
            {liked ? <FavoriteOutlinedIcon /> : <FavoriteBorderOutlinedIcon />}
            12 Likes
          </div>
          <div className="item" onClick={() => setCommentsOpen(!commentsOpen)}>
            <TextsmsOutlinedIcon />
            10 Comments
          </div>
          <div className="item">
            <ShareOutlinedIcon />
          </div>
        </div>
        {commentsOpen && <Comments />}
      </div>
    </div>
  );
};

export default Post;
