import { useQuery } from "@tanstack/react-query";

import { makeRequest } from "../../axios";
import { PostType } from "../../typings";
import Post from "../post/Post";
import "./posts.scss";

const Posts = ({ username }: { username: string }) => {
  const { isLoading, error, data } = useQuery(["posts", username], () =>
    makeRequest.get("/posts?username=" + username).then((res) => {
      return res.data;
    })
  );

  return (
    <div className="posts">
      {error
        ? "Something went wrong"
        : isLoading
        ? "Loading..."
        : data?.rows.map((post: PostType, index: number) => (
            <Post post={post} key={index} />
          ))}
    </div>
  );
};

export default Posts;
