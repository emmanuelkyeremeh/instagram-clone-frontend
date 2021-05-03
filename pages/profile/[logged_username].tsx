import { Avatar, Modal } from "@material-ui/core";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import GridOnOutlinedIcon from "@material-ui/icons/GridOnOutlined";
import Image from "next/image";
import Head from "next/head";
import Nav from "../../components/Nav";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { findPostByUser } from "../../store/actions/PostActions";
import Error from "../../components/Error";
import { useRouter } from "next/router";
import { makeStyles } from "@material-ui/core/styles";
import { getSingleUser, UpdateUser } from "../../store/actions/userActions";
import { getfollowers, getfollowing } from "../../store/actions/FollowActions";
import { uploadImage } from "../../store/actions/ImageActions";
import axios from "axios";
import uuid from "react-uuid";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const profile = () => {
  const User = localStorage.getItem("userDataInsta");

  if (!User) {
    window.location.assign("/login");
  }
  const userData = useSelector((state) => state.Login);
  const { userDataInsta } = userData;
  const userId = userDataInsta._id;

  useEffect(() => {
    dispatch(findPostByUser(userDataInsta._id));
  }, []);

  useEffect(() => {
    dispatch(getSingleUser(userId));
  }, []);

  useEffect(() => {
    dispatch(getfollowers(userId));
  }, []);
  useEffect(() => {
    dispatch(getfollowing(userId));
  }, []);
  const classes = useStyles();
  const rand = () => {
    return Math.round(Math.random() * 20) - 10;
  };
  const getModalStyle = () => {
    const top = 50 + rand();
    const left = 50 + rand();
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  };

  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);

  const handleOpened = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [avatar, setavatar] = useState(null);
  const [bio, setbio] = useState("");
  const [sumbitLoading, setsumbitLoading] = useState(false);

  const handleOpen = () => {
    //boilerplate function for props and error removal!
  };

  const UpdatedUserData = useSelector((state) => state.getOneUser);
  const { SingleUser } = UpdatedUserData;

  const userPost = useSelector((state) => state.findPostByUser);
  const { loading, error, PostData } = userPost;

  const userUpdate = useSelector((state) => state.updatedSingleUser);
  const { loading: userUpdateLoading, error: userUpdateError } = userUpdate;

  const grabfollowers = useSelector((state) => state.FollowersReducer);
  const { Followers } = grabfollowers;
  const grabfollowing = useSelector((state) => state.FollowingReducer);
  const { Following } = grabfollowing;

  const router = useRouter();

  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    setsumbitLoading(true);
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
      UpdateUser(
        userDataInsta._id,
        firstName,
        lastName,
        avatarName,
        actualAvatar,
        bio,
        email,
        password
      )
    );

    location.reload();
  };

  if (!userDataInsta) {
    window.location.assign("/accounts/login");
  }

  return (
    <div className="profile-container">
      <Head>
        <title>
          {SingleUser && SingleUser.firstName}{" "}
          {SingleUser && SingleUser.lastName}: Instagram Profile
        </title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Nav handleOpen={handleOpen} display={false} />
      <div className="profile-info">
        <div className="profile-avatar">
          <Avatar
            alt="User"
            src={`data:image/jpeg;base64,${
              SingleUser && SingleUser.actualAvatar
            }`}
            className="profile-avatar"
          />
        </div>
        <div className="profile-stats">
          <div className="profile-name">
            <p>{SingleUser && SingleUser.username}</p>
            <button onClick={handleOpened} className="profile-name-button">
              Edit Profile
            </button>
            <SettingsOutlinedIcon className="profile-name-icon" />
          </div>
          <div className="profile-stats-section">
            <span>{PostData && PostData.length} </span>posts{" "}
            <span>{Followers && Followers.length} </span>
            followers{" "}
            <span>
              {Following && Following.length > 0 ? Following.length : "0"}
            </span>{" "}
            following
          </div>
          <div className="profile-bio">
            <p>
              {SingleUser && SingleUser.firstName}{" "}
              {SingleUser && SingleUser.lastName}
            </p>
            <p>{SingleUser && SingleUser.bio}</p>
          </div>
        </div>
      </div>
      <div className="profile-activity">
        <hr />
        <div className="post-title">
          <GridOnOutlinedIcon className="post-title-icon" />
          <h5>POSTS</h5>
        </div>
      </div>

      <div className="profile-posts">
        {loading ? (
          <Error severity="info" error="" />
        ) : error ? (
          <Error severity="error" error={error} />
        ) : (
          PostData &&
          PostData.reverse().map((post) => (
            <div className="post-hover">
              <Image
                key={post._id}
                className="post-hover-image"
                width="290"
                height="300"
                src={`data:image/jpeg;base64,${post.actualImage}`}
                onClick={(e) => router.push(`/post/${post._id}`)}
              />
            </div>
          ))
        )}
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <div>
            <h3>Edit your Profile</h3>
          </div>
          <form
            className="form"
            encType="multipart/form-data"
            onSubmit={submitHandler}
          >
            {userUpdateError ? (
              <Error severity="error" error={userUpdateError} />
            ) : userUpdateLoading ? (
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
            <input
              type="text"
              placeholder="Add a bio (optional)"
              value={bio}
              onChange={(e) => setbio(e.target.value)}
            />
            <label htmlFor="avatar">Add a profile picture</label>
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
            <button type="submit" disabled={sumbitLoading}>
              {sumbitLoading ? "Loading..." : "Edit Profile"}
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default profile;
