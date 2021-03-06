import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { login } from "../store/actions/userActions";
import Error from "../components/Error";
import Head from "next/head";

const Login = () => {
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const loginDetails = useSelector((state) => state.Login);
  const { loading, error } = loginDetails;

  const submitHandler = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    await dispatch(login(username, email, password));

    router.push("/");
  };

  return (
    <div className="login-container">
      <Head>
        <title>Login to instagram</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Login to instagram. A build was created with vercel's next.js"
        />
        <meta name="robots" content="index, follow" />
        <meta charSet="UTF-8" />
      </Head>
      <div className="login-image">
        <Image
          src="/Instagram_Collections.jpeg"
          width="650"
          height="500"
          alt="instagram-photo"
        />
      </div>
      <div className="login-form-container">
        <div className="login-forms">
          <div className="form-image">
            <Image
              src="/new-insta-logo.png"
              width="200"
              height="100"
              alt="new-instagram-logo"
            />
          </div>
          <form className="form" onSubmit={submitHandler}>
            {error ? (
              <Error severity="error" error={error} />
            ) : loading ? (
              <Error severity="info" error="" />
            ) : (
              <Error
                severity="error"
                error={
                  username === "" || email === "" || password === ""
                    ? "All fields are required"
                    : "All fields are required"
                }
              />
            )}
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
            <Link href="/signup">
              <a>Sign up</a>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
