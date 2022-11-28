import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import { makeRequest } from "../../axios";
import { UserType } from "../../typings";

import "./update.scss";
import { AuthContext } from "../../context/authContext";

interface IProps {
  setOpenUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  user: UserType;
}

const Update = ({ setOpenUpdate, user }: IProps) => {
  const { setCurrentUser } = useContext(AuthContext);
  const [coverPic, setCoverPic] = useState<File | null>(null);
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [inputs, setInputs] = useState({
    first_name: user.first_name,
    last_name: user.last_name,
    city: user.city,
    website: user.website,
  });

  const upload = async (file: File) => {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (user) => {
      return makeRequest.put("/users", user);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["user"]);
        setCurrentUser({...user, ...inputs})
      },
    }
  );

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    let coverPicUrl;
    let profilePicUrl;

    coverPicUrl = coverPic
      ? await upload(coverPic)
      : user.cover_pic
      ? user.cover_pic
      : "/default-cover.jpeg";
    profilePicUrl = profilePic
      ? await upload(profilePic)
      : user.profile_pic
      ? user.profile_pic
      : "/default-profile.jpeg";

    // @ts-ignore
    mutation.mutate({
      ...inputs,
      profile_pic: profilePicUrl,
      cover_pic: coverPicUrl,
    });
    setOpenUpdate(false);
  };

  return (
    <div className="update">
      <div className="wrapper">
        <h1>Update Your Profile</h1>
        <form>
          <div className="files">
            <label htmlFor="cover">
              <span>Cover Picture</span>
              <div className="img-container">
                <img
                  src={
                    coverPic
                      ? URL.createObjectURL(coverPic)
                      : "/upload/" + user.cover_pic
                  }
                  alt=""
                />
                <CloudUploadIcon className="icon" />
              </div>
            </label>
            <input
              type="file"
              id="cover"
              style={{ display: "none" }}
              onChange={(e) => setCoverPic(e.target.files![0])}
            />
            <label htmlFor="profile">
              <span>Profile Picture</span>
              <div className="img-container">
                <img
                  src={
                    profilePic
                      ? URL.createObjectURL(profilePic)
                      : "/upload/" + user.profile_pic
                  }
                  alt=""
                />
                <CloudUploadIcon className="icon" />
              </div>
            </label>
            <input
              type="file"
              id="profile"
              style={{ display: "none" }}
              onChange={(e) => setProfilePic(e.target.files![0])}
            />
          </div>
          <label>First Name</label>
          <input type="text" name="first_name" onChange={handleChange} />
          <label>Last Name</label>
          <input type="text" name="last_name" onChange={handleChange} />
          <label>City</label>
          <input type="text" name="city" onChange={handleChange} />
          <label>Website</label>
          <input type="text" name="website" onChange={handleChange} />
          <button onClick={handleSubmit}>Update</button>
        </form>
        <button className="close" onClick={() => setOpenUpdate(false)}>
          close
        </button>
      </div>
    </div>
  );
};

export default Update;
