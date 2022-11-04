import { Link } from "react-router-dom";
import "./register.scss";

const Register = () => {
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
            <input type="text" placeholder="First name" />
            <input type="text" placeholder="Last name" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <input type="password" placeholder="Confirm password" />
            <button>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
