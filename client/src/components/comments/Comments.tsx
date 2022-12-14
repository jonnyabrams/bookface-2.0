import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext, useState } from "react";
import TimeAgo from "react-timeago";

import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/authContext";
import { CommentType } from "../../typings";
import "./comments.scss";

interface IComment {
  content: string;
  post_id: number;
}

const Comments = ({ postId }: { postId: number }) => {
  const { currentUser } = useContext(AuthContext);
  const [content, setContent] = useState("");

  const { isLoading, error, data } = useQuery(["comments"], () =>
    makeRequest.get("/comments?postId=" + postId).then((res) => {
      return res.data;
    })
  );

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (newComment: IComment) => {
      return makeRequest.post("/comments", newComment);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["comments"]);
      },
    }
  );

  const deleteMutation = useMutation(
    (commentId) => {
      return makeRequest.delete(`/comments/${commentId}`);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["comments"]);
      },
    }
  );

  const handleClick = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    
    mutation.mutate({ content, post_id: postId });
    setContent("");
  };

  return (
    <div className="comments">
      <div className="write">
        <img src={`/upload/${currentUser.profile_pic}`} alt="" />
        <input
          type="text"
          placeholder="Write a comment..."
          onChange={(e) => setContent(e.target.value)}
          value={content}
        />
        <button onClick={handleClick}>Send</button>
      </div>
      {isLoading
        ? "Loading..."
        : data.rows.map((comment: CommentType, index: number) => (
            <div className="comment" key={index}>
              <img
                src={
                  comment.profile_pic
                    ? `/upload/${comment.profile_pic}`
                    : "/default-profile.jpeg"
                }
                alt=""
              />

             {comment.user_id === currentUser.id && <div
                className="delete"
                // @ts-ignore
                onClick={() => deleteMutation.mutate(comment.id)}
              >
                x
              </div>}
              <div className="info">
                <span>
                  {comment.first_name} {comment.last_name}
                </span>
                <p>{comment.content}</p>
              </div>
              <span className="date">
                <TimeAgo date={comment.created_at} />
              </span>
            </div>
          ))}
    </div>
  );
};

export default Comments;
