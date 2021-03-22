import { Avatar } from "@material-ui/core";
import { followUser, getFollowData } from "../../store/actions/FollowActions";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Error from "../error";
import { useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
}));

const Other_users = ({ display, follower, followed, username, avatar }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFollowData(follower, followed));
  }, []);

  const FollowHandler = async (e) => {
    await dispatch(followUser(followed, follower));
    location.reload();
  };
  const fData = useSelector((state) => state.FollowData);
  const { loading, error, followData } = fData;
  return (
    <div className="all-other-users-container2" style={{ display: display }}>
      <div className="all-other-users">
        <Avatar src={`/${avatar}`} />
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
        ) : followData && followData.length > 0 ? (
          <button disabled className="all-other-users-follow-button">
            following
          </button>
        ) : (
          <button
            className="all-other-users-follow-button"
            onClick={FollowHandler}
          >
            Follow
          </button>
        )}
      </div>
    </div>
  );
};

export default Other_users;
