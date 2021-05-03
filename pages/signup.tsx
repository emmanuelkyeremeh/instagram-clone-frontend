import Image from "next/image";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";
import { signup } from "../store/actions/userActions";
import Head from "next/head";
import Error from "../components/Error";
import { uploadImage } from "../store/actions/ImageActions";
import axios from "axios";
import uuid from "react-uuid";

const Registeration = () => {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [avatar, setavatar] = useState(null);
  const [password, setpassword] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const userSignUp = useSelector((state) => state.Signup);
  const { error, loading } = userSignUp;

  const submitHandler = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    let actualAvatar = "";
    let avatarName = "";
    if (avatar) {
      const newAvatar = new File([avatar], `${uuid()}${avatar.name}`, {
        type: avatar.type,
      });
      avatarName = newAvatar.name;
      const imageData = new FormData();
      imageData.append("image", newAvatar);
      await dispatch(uploadImage(imageData));

      const actualAvatarData = await axios.get(
        `https://instagram-clone-backend-1.herokuapp.com/api/image/${avatarName}`
      );
      actualAvatar = actualAvatarData.data;
    }

    await dispatch(
      signup(
        firstName,
        lastName,
        username,
        avatarName,
        actualAvatar,
        email,
        password
      )
    );

    router.push("/");
  };
  return (
    <div className="signup-container">
      <Head>
        <title>Sign Up, Instagram</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Create an account on instagram today. This build was created with vercel's next.js"
        />
        <meta name="robots" content="index, follow" />
        <meta charSet="UTF-8" />
      </Head>
      <div className="signup-input">
        <div className="sign-up-image">
          <Image
            src="/new-insta-logo.png"
            className="signup-image"
            width="150"
            height="100"
            alt="new-instagram-image"
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
          <label htmlFor="avatar">Upload a profile picture (optional) </label>
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
          <button type="submit" disabled={submitLoading}>
            {submitLoading ? "Loading..." : "Sign Up"}
          </button>
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
