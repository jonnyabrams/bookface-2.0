import { useQuery } from "@tanstack/react-query";

import { makeRequest } from "../../axios";
import { PostType } from "../../typings";
import Post from "../post/Post";
import "./posts.scss";

const Posts = () => {
  const { isLoading, error, data } = useQuery(["posts"], () =>
    makeRequest.get("/posts").then((res) => {
      return res.data;
    })
  );

  console.log(data?.rows);

  return (
    <div className="posts">
      {error
        ? "Something went wrong"
        : isLoading
        ? "Loading..."
        : data?.rows.map((post: PostType) => (
            <Post post={post} key={post.id} />
          ))}
    </div>
  );
};

export default Posts;
