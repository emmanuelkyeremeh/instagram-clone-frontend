import Head from "next/head";
import { useState, useEffect } from "react";
import Nav from "./nav";
import { useSelector, useDispatch } from "react-redux";
import Post from "./post";
import { useRouter } from "next/router";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { createPost } from "../store/actions/PostActions";
import Error from "./error";
import { getposts } from "../store/actions/PostActions";
import CircularProgress from "@material-ui/core/CircularProgress";
import Profiles from "./profile/profiles";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  root: {
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
}));

export default function Home() {
  const user = useSelector((state) => state.Login);
  const { userDataInsta } = user;

  const ISSERVER = typeof window === "undefined";

  if (!ISSERVER) {
    if (!userDataInsta) {
      window.location.assign("/login");
    }
  }

  const _id = userDataInsta._id;

  const getmyposts = useSelector((state) => state.getPosts);
  const { loading: getPostsLoading, error: getPostsError, posts } = getmyposts;

  const username = userDataInsta.username;
  const post = useSelector((state) => state.createPost);
  const { loading, error } = post;
  const router = useRouter();
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getposts());
  }, []);

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
  const [image, setimage] = useState();
  const [caption, setcaption] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("_id", _id);
    formData.append("username", username);
    formData.append("image", image);
    formData.append("caption", caption);

    await dispatch(createPost(formData));
    location.reload();
  };

  return (
    <div>
      <Head>
        <title>Instagram</title>
      </Head>
      <Nav handleOpen={handleOpen} display={true} />
      <div className="container">
        <div className="post-body">
          {getPostsLoading ? (
            <div className={classes.root}>
              <CircularProgress />
            </div>
          ) : getPostsError ? (
            <Error error={error} severity="error" />
          ) : (
            <div className="post-body">
              {posts &&
                posts
                  .reverse()
                  .map((post) => (
                    <Post
                      key={post._id}
                      id={post._id}
                      userid={post.user}
                      img={post.image}
                      caption={post.caption}
                      username={post.user_username}
                    />
                  ))}
            </div>
          )}
        </div>
        <div className="post-side">
          <Profiles userid={_id} />
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <div className="modal-container">
            {error ? (
              <Error error={error} severity="error" />
            ) : loading ? (
              <Error error="" severity="info" />
            ) : null}
            <h2>Create a Post</h2>
            <form
              className="form"
              onSubmit={submitHandler}
              encType="multipart/form-data"
            >
              <label htmlFor="image">Choose an Image</label>
              <input
                type="file"
                name="image"
                onChange={(e) => setimage(e.target.files[0])}
              />
              <input
                type="text"
                placeholder="caption (optional)"
                value={caption}
                onChange={(e) => setcaption(e.target.value)}
              />
              <button type="submit">Post</button>
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
}
