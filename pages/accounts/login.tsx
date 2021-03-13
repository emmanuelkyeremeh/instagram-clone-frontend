import Image from "next/image";
import { useState } from "react";
import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import Error from "../error";
import { login } from "../../store/actions/userActions";
import { useRouter } from "next/router";

const Login = () => {
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const dispatch = useDispatch();
  const loginDetails = useSelector((state) => state.Login);
  const router = useRouter();
  const { loading, error } = loginDetails;
  let severity = "error";

  const submitHandler = async (e) => {
    //code goes here
    e.preventDefault();
    await dispatch(login(username, email, password));
    if (loading === true) {
      severity = "info";
    }
    router.push("/");
  };

  return (
    <div className="login-container">
      <Head>
        <title>Login 🔥 Instagram</title>
      </Head>
      <div className="login-image">
        <Image src="/instagram_Collections.jpeg" width="650" height="500" />
      </div>
      <div className="login-form-container">
        <div className="login-forms">
          <div className="form-image">
            <Image src="/new-insta-logo.png" width="200" height="100" />
          </div>
          <form className="form" onSubmit={submitHandler}>
            <Error
              severity={severity}
              error={
                username === "" || email === "" || password === ""
                  ? "All fields are required"
                  : error
                  ? error
                  : "All fields are required"
              }
            />
            <br />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setusername(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
            <button type="submit">Login</button>
          </form>
        </div>
        <div className="login-signup">
          <p>
            Dont Have an account?{" "}
            <Link href="/accounts/signup">
              <a>Sign up</a>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
