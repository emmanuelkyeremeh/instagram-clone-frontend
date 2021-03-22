import { Avatar } from "@material-ui/core";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ModeCommentOutlinedIcon from "@material-ui/icons/ModeCommentOutlined";
import { useRouter } from "next/router";
import NearMeOutlinedIcon from "@material-ui/icons/NearMeOutlined";
import BookmarkBorderOutlinedIcon from "@material-ui/icons/BookmarkBorderOutlined";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getComments } from "../store/actions/CommentActions";
import Image from "next/image";

const Post = ({ id, img, caption, username }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const routerHandler = () => {
    router.push(`/post/${id}`);
  };
  useEffect(() => {
    dispatch(getComments(id));
  }, []);

  const getUserComment = useSelector((state) => state.getUserComments);
  const { commentList } = getUserComment;

  return (
    <div className="post-container">
      <div onClick={routerHandler}>
        <div className="post-container-header">
          <div className="post-container-header-left">
            <Avatar className="post-container-header-avatar" />
            <p>{username}</p>
          </div>
          <MoreHorizIcon />
        </div>
        <div className="post-container-body">
          <Image src={`/${img}`} width="600px" height="600px" />
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
          <span className="username-span">{username} </span>
          {caption}
        </div>
        <div className="post-container-comment"></div>
        <form className="post-container-input">
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
