import React, { useContext, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/authContext";
import Image from "../../assets/img.png";
import Map from "../../assets/map.png";
import Friend from "../../assets/friend.png";
import "./share.scss";

const Share = () => {
  const { currentUser } = useContext(AuthContext);
  const [file, setFile] = useState<File | null>(null);
  const [content, setContent] = useState("");

  const upload = async () => {
    try {
      const formData = new FormData();
      // @ts-ignore
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (newPost) => {
      return makeRequest.post("/posts", newPost);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["posts"]);
      },
    }
  );

  const handleClick = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    let imgUrl = "";
    if (file) imgUrl = await upload();
    // @ts-ignore
    mutation.mutate({ content, img: imgUrl });
    setContent("");
    setFile(null);
  };

  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <div className="left">
            <img
              src={
                currentUser.profile_pic
                  ? `/upload/${currentUser.profile_pic}`
                  : "/default-profile.jpeg"
              }
              alt=""
            />
            <input
              type="text"
              placeholder={`What's on your mind, ${currentUser.first_name}?`}
              onChange={(e) => setContent(e.target.value)}
              value={content}
            />
          </div>
          <div className="right">
            {/* create fake url to show img preview */}
            {file && (
              <img className="file" alt="" src={URL.createObjectURL(file)} />
            )}
          </div>
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <input
              type="file"
              id="file"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files && e.target.files[0])}
            />
            <label htmlFor="file">
              <div className="item">
                <img src={Image} alt="" />
                <span>Add Image</span>
              </div>
              <div className="item">
                <img src={Map} alt="" />
                <span>Add Place</span>
              </div>
              <div className="item">
                <img src={Friend} alt="" />
                <span>Tag Friends</span>
              </div>
            </label>
          </div>
          <div className="right">
            <button onClick={handleClick}>Share</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;
