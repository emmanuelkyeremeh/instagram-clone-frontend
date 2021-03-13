import { Avatar, Modal } from "@material-ui/core";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ModeCommentOutlinedIcon from "@material-ui/icons/ModeCommentOutlined";
import NearMeOutlinedIcon from "@material-ui/icons/NearMeOutlined";
import BookmarkBorderOutlinedIcon from "@material-ui/icons/BookmarkBorderOutlined";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Head from "next/head";
import Error from "../error";
import { useRouter } from "next/router";
import Nav from "../nav";
import {
  deletePost,
  findSinglePost,
  updatePost,
} from "../../store/actions/PostActions";
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import Typography from "@material-ui/core/Typography";
import { POST_DELETE_FAIL } from "../../store/constants/PostConstant";
import { createComment, getComments } from "../../store/actions/CommentActions";
import { postImage } from "../../store/actions/ImageActions";

export async function getServerSideProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  };
}
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
  root2: {
    width: 500,
  },
  typography: {
    padding: theme.spacing(2),
  },
  paper2: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  root3: {
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
}));

const posts = () => {
  const router = useRouter();
  const [postid] = useState(router.query.id);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(findSinglePost(postid));
  }, []);

  useEffect(() => {
    dispatch(getComments(postid));
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
  const [image, setimage] = useState("");
  const [caption, setcaption] = useState("");
  const [comment, setcomment] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [opened, setOpened] = useState(false);
  const [placement, setPlacement] = useState();

  const handleClick = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget);
    setOpened((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };

  const deleteHandler = async () => {
    await dispatch(deletePost(postid));
    window.location.assign("/");
    dispatch({ type: POST_DELETE_FAIL });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(updatePost(postid, image, caption));
    window.location.assign("/");
  };

  const deletePosts = useSelector((state) => state.deletePost);
  const { loading: deleteloading, error: deleteerror, success } = deletePosts;

  const updatePosts = useSelector((state) => state.updatePost);
  const {
    loading: updatePostLoading,
    error: updatePostError,
    success: updatePostSuccess,
  } = updatePosts;

  const getUserId = useSelector((state) => state.Login);
  const { userDataInsta } = getUserId;

  const getUserComment = useSelector((state) => state.getUserComments);
  const { commentList } = getUserComment;

  const getOnePost = useSelector((state) => state.getSinglePost);
  const { loading, error, newposts } = getOnePost;

  // const commentstatus = useSelector((state) => state.createComment);
  // const {
  //   loading: createCommentLoading,
  //   error: createCommentError,
  // } = commentstatus;

  const currentDate = new Date().toLocaleString();

  const commentHandler = async (e) => {
    const userComment = newposts.user_username;
    await dispatch(createComment(postid, userComment, comment, currentDate));
    location.reload();
  };

  return (
    <div>
      <Head>
        <title>Post from Instagram</title>
      </Head>
      <Nav handleOpen={handleOpen} display={false} />
      {loading ? (
        <Error severity="info" error="" />
      ) : error ? (
        <Error severity="error" error={error} />
      ) : (
        <div className="post-id-container">
          {/* {createCommentLoading ? (
            <Error severity="info" error="" />
          ) : createCommentError ? (
            <Error severity="error" error={error} />
          ) : (
            ""
          )} */}
          {deleteloading && <Error severity="info" error="" />}
          {success && (
            <Error severity="success" error="Post deleted successfully!" />
          )}
          {deleteerror && <Error severity="error" error={deleteerror} />}
          <div className="post-container post-id-container-wrapper">
            <div className="post-container-header">
              <div className="post-container-header-left">
                <Avatar className="post-container-header-avatar" />
                <p>{newposts.user_username}</p>
              </div>
              <MoreHorizIcon
                onClick={handleClick("bottom-start")}
                style={{ cursor: "pointer" }}
              />
            </div>
            <div className="post-container-body">
              <img src={newposts.image} alt="Post image" />
            </div>
            <div className="post-container-reaction">
              <div className="post-container-reaction-left">
                <div className="reaction-icon">
                  <FavoriteBorderIcon />
                </div>
                <div className="reaction-icon-div">
                  <ModeCommentOutlinedIcon />
                  <p className="reaction-icon-div-p">
                    {commentList ? commentList.length : 0}
                  </p>
                </div>
                <div className="reaction-icon">
                  <NearMeOutlinedIcon />
                </div>
              </div>
              <div className="post-container-reaction-right">
                <BookmarkBorderOutlinedIcon className="reaction-icon-right" />
              </div>
            </div>
            <div className="post-container-caption">
              <span className="username-span">{newposts.user_username} </span>
              {newposts.caption}
            </div>
            <div className="post-container-comment">
              <span>Comments {commentList ? commentList.length : 0}</span>
              {commentList &&
                commentList.map((comments) => (
                  <div
                    key={comments._id}
                    className="post-container-comment-container"
                  >
                    <div className="post-container-comment-username">
                      {comments.username}
                    </div>
                    <div className="post-container-comment-comment">
                      {comments.comment}
                    </div>
                  </div>
                ))}
            </div>
            <form className="post-container-input" onSubmit={commentHandler}>
              <input
                className="input"
                type="text"
                value={comment}
                onChange={(e) => setcomment(e.target.value)}
                placeholder="Add a comment"
              />
              <button className="post-container-input-submit" type="submit">
                Post
              </button>
            </form>
          </div>

          <div className={classes.root2}>
            <Popper
              open={opened}
              anchorEl={anchorEl}
              placement={placement}
              transition
            >
              {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={350}>
                  <Paper>
                    <Typography className={classes.typography}>
                      {userDataInsta._id !== newposts.user ? (
                        ""
                      ) : (
                        <>
                          <span onClick={deleteHandler} className="delete-span">
                            Delete post
                          </span>
                          <br />
                          <span className="delete-span" onClick={handleOpen}>
                            Update Post
                          </span>
                        </>
                      )}
                    </Typography>
                  </Paper>
                </Fade>
              )}
            </Popper>
          </div>
        </div>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper2}>
          <div className="modal-container">
            {updatePostError ? (
              <Error error={updatePostError} severity="error" />
            ) : updatePostLoading ? (
              <Error error="" severity="info" />
            ) : null}
            <h2>Update Post</h2>
            <form className="form" onSubmit={submitHandler}>
              <input
                type="text"
                placeholder="link to image.."
                value={image}
                onChange={(e) => setimage(e.target.value)}
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
};

export default posts;
