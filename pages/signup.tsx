import Image from "next/image";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";
import { signup } from "../store/actions/userActions";
import Error from "./error";

const Registeration = () => {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [avatar, setavatar] = useState("");
  const [password, setpassword] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  const userSignUp = useSelector((state) => state.Signup);
  const { error, loading } = userSignUp;

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("username", username);
    formData.append("avatar", avatar);
    formData.append("email", email);
    formData.append("password", password);
    await dispatch(signup(formData));

    router.push("/");
  };
  return (
    <div className="signup-container">
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
          {error ? (
            <Error severity="error" error={error} />
          ) : loading ? (
            <Error severity="info" error="" />
          ) : (
            ""
          )}
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
          <label htmlFor="avatar">Upload a profile picture</label>
          <input
            type="file"
            name="avatar"
            onChange={(e: any) => setavatar(e.target.files[0])}
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
          <Link href="/login">
            <a>Login</a>
          </Link>{" "}
        </p>
      </div>
    </div>
  );
};

export default Registeration;
