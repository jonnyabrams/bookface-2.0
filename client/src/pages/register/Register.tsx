import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import "./register.scss";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const [err, setErr] = useState(null);

  const navigate = useNavigate();

  const handleClick = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setPasswordsMatch(false);
    } else {
      const newUser = {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
        username: firstName.toLowerCase() + lastName.toLowerCase(),
      };
      try {
        await axios.post("http://localhost:8000/api/auth/register", newUser);
        navigate("/login");
      } catch (error: any) {
        setErr(error.response.data);
      }
    }
  };
  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>BOOK FACE</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corrupti
            veritatis dolorem nulla eum odio tempore, asperiores molestias
            repudiandae et natus nesciunt excepturi sit non sed, libero,
            recusandae exercitationem aliquid vero.
          </p>
          <span>Already have an account?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>

        <div className="right">
          <h1>Register</h1>
          <form>
            <input
              type="text"
              placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            {!passwordsMatch && (
              <span style={{ color: "red", fontSize: "10px" }}>
                * Passwords do not match
              </span>
            )}
            {err && err}
            <button onClick={handleClick}>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
