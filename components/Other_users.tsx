import { Avatar } from "@material-ui/core";
import { followUser, getFollowData } from "../store/actions/FollowActions";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
}));

const Other_users = ({ id, display, follower, followed, username, avatar }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();

  const [submitLoading, setsubmitLoading] = useState(false);

  let isFollowing = 0;

  useEffect(() => {
    dispatch(getFollowData());
  }, []);

  const FollowHandler = async (e) => {
    setsubmitLoading(true);
    await dispatch(followUser(follower, followed));
    location.reload();
  };
  const fData = useSelector((state) => state.FollowData);
  const { loading, error, followData } = fData;

  const routerHandler = async (e) => {
    await router.push(`/user/${id}`);
  };

  followData &&
    followData.forEach((follow) => {
      if (
        follow.user_follower === follower &&
        follow.user_followed === followed
      ) {
        isFollowing++;
      }
    });

  return (
    <div className="all-other-users-container2" style={{ display: display }}>
      <div className="all-other-users" onClick={routerHandler}>
        <Avatar
          src={`data:image/jpeg;base64,${avatar}`}
          style={{ cursor: "pointer" }}
          alt="user avatar"
        />
        <div className="all-other-user-details">
          <p>{username}</p>
        </div>
      </div>
      <div className="all-other-users-follow">
        {loading ? (
          <div className={classes.root}>
            <CircularProgress />
          </div>
        ) : error ? (
          // <Error error="an error occured" severity="error" />
          <CircularProgress />
        ) : isFollowing > 0 ? (
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
    </div>
  );
};

export default Other_users;
