import { Avatar } from "@material-ui/core";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ModeCommentOutlinedIcon from "@material-ui/icons/ModeCommentOutlined";
import { useRouter } from "next/router";
import NearMeOutlinedIcon from "@material-ui/icons/NearMeOutlined";
import BookmarkBorderOutlinedIcon from "@material-ui/icons/BookmarkBorderOutlined";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllComments } from "../store/actions/CommentActions";
import { getUsers } from "../store/actions/userActions";
import Image from "next/image";
import { getAllLikes, likePost } from "../store/actions/LikeActions";

const Post = ({ id, img, caption, username, userid }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [submitLoading, setsubmitLoading] = useState(false);

  let commentList = 0;
  let likeList = 0;
  let isLiked = 0;

  const routerHandler = () => {
    router.push(`/post/${id}`);
  };
  useEffect(() => {
    dispatch(getAllComments());
  }, []);
  useEffect(() => {
    dispatch(getUsers());
  }, []);
  useEffect(() => {
    dispatch(getAllLikes());
  }, []);

  const LikeHandler = async (e) => {
    setsubmitLoading(true);
    await dispatch(likePost(userid, id));
    location.reload();
  };

  const getEveryUser = useSelector((state) => state.getAllUsers);
  const { Users } = getEveryUser;
  const getEveryLike = useSelector((state) => state.GetAllLikes);
  const { AllLikes } = getEveryLike;

  const everyComment = useSelector((state) => state.AllComments);
  const { allComments } = everyComment;

  allComments &&
    allComments.forEach((comment) => {
      if (comment.postid === id) {
        commentList++;
      }
    });
  AllLikes &&
    AllLikes.forEach((like) => {
      if (like.postid === id) {
        likeList++;
      }
    });
  AllLikes &&
    AllLikes.forEach((like) => {
      if (like.userid === userid && like.postid === id) {
        isLiked++;
      }
    });

  return (
    <div className="post-container">
      <div>
        <div className="post-container-header">
          <div className="post-container-header-left">
            {Users &&
              Users.map((allusers) => (
                <Avatar
                  onClick={() =>
                    userid === allusers._id
                      ? router.push(`/profile/${allusers.username}`)
                      : router.push(`/user/${allusers._id}`)
                  }
                  src={
                    userid === allusers._id
                      ? `data:image/jpeg;base64,${allusers.actualAvatar}`
                      : ""
                  }
                  className={
                    userid !== allusers._id
                      ? "avatar-not-shown"
                      : "post-container-header-avatar"
                  }
                  style={{ cursor: "pointer" }}
                />
              ))}
            <p>{username}</p>
          </div>
          <MoreHorizIcon />
        </div>
        <div onClick={routerHandler} className="post-container-body">
          <Image
            className="post-container-image"
            src={`data:image/jpeg;base64,${img}`}
            width="600px"
            height="600px"
          />
        </div>
        <div className="post-container-reaction">
          <div className="post-container-reaction-left">
            {isLiked > 0 ? (
              <div className="reaction-icon-div">
                <FavoriteIcon style={{ color: "red" }} />
                <p className="reaction-icon-div-p">{likeList}</p>
              </div>
            ) : (
              <div className="reaction-icon-div">
                <button
                  className="reaction-icon-div-button"
                  disabled={submitLoading}
                  onClick={LikeHandler}
                >
                  <FavoriteBorderIcon />
                </button>
                <p className="reaction-icon-div-p">{likeList}</p>
              </div>
            )}

            <div className="reaction-icon-div" onClick={routerHandler}>
              <ModeCommentOutlinedIcon />
              <p className="reaction-icon-div-p">{commentList}</p>
            </div>
            <div className="reaction-icon" onClick={routerHandler}>
              <NearMeOutlinedIcon />
            </div>
          </div>
          <div className="post-container-reaction-right">
            <BookmarkBorderOutlinedIcon className="reaction-icon-right" />
          </div>
        </div>
        <div className="post-container-caption">
          <span className="username-span"> {username} </span>
          {caption}
        </div>
        <div className="post-container-comment"></div>
        <form className="post-container-input" onClick={routerHandler}>
          <input type="text" placeholder="Add a comment" />
          <button className="post-container-input-submit" type="submit">
            Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default Post;
