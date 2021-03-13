import Image from "next/image";
import { useState } from "react";
import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { signup } from "../../store/actions/userActions";
import Error from "../error";
import { useRouter } from "next/router";

const Registeration = () => {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  let severity = "error";
  const userSignUp = useSelector((state) => state.Signup);
  const { error, loading } = userSignUp;

  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(signup(firstName, lastName, username, email, password));
    if (loading === true) {
      severity = "info";
    }
    router.push("/");
  };
  return (
    <div className="signup-container">
      <Head>
        <title>Sign up 🚀 Instagram</title>
      </Head>
      <div className="signup-input">
        <div className="sign-up-image">
          <Image
            src="/new-insta-logo.png"
            className="signup-image"
            width="150"
            height="100"
          />
        </div>
        <div className="signup-title">
          <p>Sign up to see photos and videos from your friends</p>
        </div>
        <form className="form" onSubmit={submitHandler}>
          {
            <Error
              severity={severity}
              error={
                firstName === "" ||
                lastName === "" ||
                username === "" ||
                email === "" ||
                password === ""
                  ? "All fields are required"
                  : error
                  ? error
                  : "All fields are required"
              }
            />
          }
          <br />
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setfirstName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setlastName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setusername(e.target.value)}
          />
          <input
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />
          <button type="submit">Sign Up</button>
        </form>
      </div>
      <div className="signup-login">
        <p>
          Already have an Account?{" "}
          <Link href="/accounts/login">
            <a>Login</a>
          </Link>{" "}
        </p>
      </div>
    </div>
  );
};

export default Registeration;
