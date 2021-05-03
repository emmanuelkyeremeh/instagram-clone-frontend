import { Avatar } from "@material-ui/core";
import Head from "next/head";
import router from "next/router";
import { useEffect, useState } from "react";
import GridOnOutlinedIcon from "@material-ui/icons/GridOnOutlined";
import { useDispatch, useSelector } from "react-redux";
import {
  followUser,
  getFollowData,
  getfollowers,
  getfollowing,
} from "../../store/actions/FollowActions";
import { findPostByUser } from "../../store/actions/PostActions";
import { getSingleUser } from "../../store/actions/userActions";
import Nav from "../../components/Nav";
import Image from "next/image";
import Error from "../../components/Error";

export async function getServerSideProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  };
}

const UserDetail = () => {
  const [userid] = useState(router.query.userid);
  const dispatch = useDispatch();
  const [submitLoading, setsubmitLoading] = useState(false);

  useEffect(() => {
    dispatch(getSingleUser(userid));
  }, []);

  useEffect(() => {
    dispatch(findPostByUser(userid));
  }, []);

  useEffect(() => {
    dispatch(getfollowers(userid));
  }, []);
  useEffect(() => {
    dispatch(getfollowing(userid));
  }, []);
  useEffect(() => {
    dispatch(getFollowData());
  }, []);

  let isFollowing = 0;

  const userPost = useSelector((state) => state.findPostByUser);
  const { loading, error, PostData } = userPost;

  const grabfollowers = useSelector((state) => state.FollowersReducer);
  const { Followers } = grabfollowers;
  const grabfollowing = useSelector((state) => state.FollowingReducer);
  const { Following } = grabfollowing;

  const handleOpen = (e) => {
    // just to clear errors
  };

  const userData = useSelector((state) => state.Login);
  const { userDataInsta } = userData;
  const LoggeduserId = userDataInsta._id;

  const UpdatedUserData = useSelector((state) => state.getOneUser);
  const { SingleUser } = UpdatedUserData;

  const FollowHandler = async (e) => {
    setsubmitLoading(true);
    await dispatch(followUser(LoggeduserId, userid));
    location.reload();
  };

  Followers &&
    Followers.forEach((follow) => {
      if (follow.user_follower === LoggeduserId) {
        isFollowing++;
      }
    });

  return (
    <div className="profile-container">
      <Head>
        <title>{SingleUser && SingleUser.username}: Instagram profile</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Login or Create an Account on instagram today"
        />
        <meta name="robots" content="index, follow" />
        <meta charSet="UTF-8" />
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
            {isFollowing > 0 ? (
              <button disabled className="all-other-users-follow-button">
                following
              </button>
            ) : (
              <button
                className="all-other-users-follow-button"
                onClick={FollowHandler}
                disabled={submitLoading}
              >
                Follow
              </button>
            )}
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
                src={`/${post.image}`}
                onClick={(e) => router.push(`/post/${post._id}`)}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserDetail;
