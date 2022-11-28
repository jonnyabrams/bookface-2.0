import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import TimeAgo from "react-timeago";
import { useContext, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { makeRequest } from "../../axios";
import { PostType } from "../../typings";
import "./post.scss";
import Comments from "../comments/Comments";
import { AuthContext } from "../../context/authContext";

interface IProps {
  post: PostType;
}

const Post = ({ post }: IProps) => {
  const { currentUser } = useContext(AuthContext);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const { isLoading, error, data } = useQuery(["likes", post.id], () =>
    makeRequest.get("/likes?postId=" + post.id).then((res) => {
      return res.data;
    })
  );

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (liked: boolean) => {
      if (liked) return makeRequest.delete("/likes?postId=" + post.id);
      // if not liked...
      return makeRequest.post("/likes", { postId: post.id });
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["likes"]);
      },
    }
  );

  const deleteMutation = useMutation(
    (postId: number) => {
      return makeRequest.delete(`/posts/${postId}`);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["posts"]);
      },
    }
  );

  const handleLike = () => {
    mutation.mutate(data?.includes(currentUser.id));
  };

  const handleDelete = () => {
    
    deleteMutation.mutate(post.id);
  };

  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="user-info">
            <Link to={`/profile/${post.username}`}>
              <img
                src={
                  post.profile_pic
                    ? `/upload/${post.profile_pic}`
                    : "/default-profile.jpeg"
                }
                alt=""
              />
            </Link>

            <div className="details">
              <Link
                to={`/profile/${post.username}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name">{`${post.first_name} ${post.last_name}`}</span>
              </Link>
              <span className="date">
                <TimeAgo date={post.created_at} />
              </span>
            </div>
          </div>
          <MoreHorizIcon onClick={() => setMenuOpen(!menuOpen)} />
          {menuOpen && post.user_id === currentUser.id && (
            <button onClick={handleDelete}>Delete</button>
          )}
        </div>

        <div className="content">
          <p>{post.content}</p>
          <img src={post.img && "/upload/" + post.img} alt="" />
        </div>

        <div className="info">
          <div className="item">
            {isLoading ? (
              "Loading..."
            ) : data?.includes(currentUser.id) ? (
              <FavoriteOutlinedIcon
                style={{ color: "red" }}
                onClick={handleLike}
              />
            ) : (
              <FavoriteBorderOutlinedIcon onClick={handleLike} />
            )}
            {data?.length === 1 ? "1 Like" : data?.length + " Likes"}
          </div>
          <div className="item" onClick={() => setCommentsOpen(!commentsOpen)}>
            <TextsmsOutlinedIcon />
            See Comments
          </div>
          <div className="item">
            <ShareOutlinedIcon />
          </div>
        </div>
        {commentsOpen && <Comments postId={post.id} />}
      </div>
    </div>
  );
};

export default Post;
