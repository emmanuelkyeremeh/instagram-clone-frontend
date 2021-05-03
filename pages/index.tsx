import Head from "next/head";
import { useState, useEffect } from "react";
import Nav from "../components/Nav";
import { useSelector, useDispatch } from "react-redux";
import Post from "../components/Post";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { createPost } from "../store/actions/PostActions";
import Error from "../components/Error";
import { getposts } from "../store/actions/PostActions";
import CircularProgress from "@material-ui/core/CircularProgress";
import Profiles from "../components/Profiles";
import { uploadImage } from "../store/actions/ImageActions";
import uuid from "react-uuid";
import axios from "axios";

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

  if (!userDataInsta) {
    window.location.assign("/login");
  }

  const _id = userDataInsta._id;

  const getmyposts = useSelector((state) => state.getPosts);
  const { loading: getPostsLoading, error: getPostsError, posts } = getmyposts;

  const username = userDataInsta.username;
  const post = useSelector((state) => state.createPost);
  const { loading, error } = post;
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
  const [image, setimage] = useState(null);
  const [caption, setcaption] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    let actualImage = "";
    let imageName = "";

    if (image) {
      const newImage = new File([image], `${uuid()}${image?.name}`, {
        type: image.type,
      });
      imageName = newImage.name;

      const ImageData = new FormData();

      ImageData.append("image", newImage);
      await dispatch(uploadImage(ImageData));

      const imageData = await axios.get(
        `https://instagram-clone-backend-1.herokuapp.com/api/image/${imageName}`
      );
      actualImage = imageData.data;
    }

    await dispatch(createPost(_id, username, imageName, actualImage, caption));

    location.reload();
  };

  return (
    <div>
      <Head>
        <title>Instagram</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Welcome to my instagram clone. This build was created with vercel's next.js"
        />
        <meta name="robots" content="index, follow" />
        <meta charSet="UTF-8" />
      </Head>
      <Nav handleOpen={handleOpen} display={true} />
      <main className="container">
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
                      img={post.actualImage}
                      caption={post.caption}
                      username={post.user_username}
                    />
                  ))}
            </div>
          )}
        </div>
        <aside className="post-side">
          <Profiles userid={_id} />
        </aside>
      </main>
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
                required
                onChange={(e: any) => setimage(e.target.files[0])}
              />
              <input
                type="text"
                placeholder="caption (optional)"
                value={caption}
                onChange={(e) => setcaption(e.target.value)}
              />
              <button type="submit" disabled={submitLoading}>
                {submitLoading ? "Loading..." : "Post"}
              </button>
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
}
