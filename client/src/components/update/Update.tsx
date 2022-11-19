import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";

import { makeRequest } from "../../axios";
import { UserType } from "../../typings";

import "./update.scss";

interface IProps {
  setOpenUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  user: UserType;
}

const Update = ({ setOpenUpdate, user }: IProps) => {
  const [coverPic, setCoverPic] = useState<File | null>(null);
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [inputs, setInputs] = useState({
    first_name: user.first_name,
    last_name: user.last_name,
    city: user.city,
    website: user.website,
    password: user.password,
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
      Update Your Profile
      <form>
        <input type="file" onChange={(e) => setCoverPic(e.target.files![0])} />
        <input type="file" onChange={(e) => setProfilePic(e.target.files![0])} />
        <input
          type="text"
          name="first_name"
          placeholder="First name"
          onChange={handleChange}
        />
        <input
          type="text"
          name="last_name"
          placeholder="Last name"
          onChange={handleChange}
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          onChange={handleChange}
        />
        <input
          type="text"
          name="website"
          placeholder="Website"
          onChange={handleChange}
        />
        <input
          type="text"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>Update</button>
      </form>
      <button onClick={() => setOpenUpdate(false)}>X</button>
    </div>
  );
};

export default Update;
