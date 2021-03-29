import { useEffect } from "react";
import { Avatar } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { getSingleUser, getUsers } from "../../store/actions/userActions";
import OtherUsers from "./other_users";
import { useRouter } from "next/router";

const profiles = ({ userid }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(getSingleUser(userid));
  }, []);

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const LoggedUser = useSelector((state) => state.getOneUser);
  const { SingleUser } = LoggedUser;

  const allUsers = useSelector((state) => state.getAllUsers);
  const { Users } = allUsers;

  const routerHandler = async (e) => {
    await router.push(`/profile/${SingleUser._id}`);
  };

  return (
    <div className="profile-list-container">
      <div className="logged-in-user-container">
        <div className="logged-in-user" onClick={routerHandler}>
          <Avatar
            className="single-user-avatar"
            alt="profile-image"
            src={SingleUser && `/${SingleUser.avatar}`}
          />
          <div className="logged-in-user-details">
            <p>
              <span className="logged-in-user-details-span-one">
                {SingleUser && SingleUser.username}
              </span>
              <br />{" "}
              <span className="logged-in-user-details-span-two">
                {SingleUser && SingleUser.firstName}
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="all-other-user-container-title">
        <h4>Who to Follow</h4>
      </div>
      <div className="all-other-users-container">
        {Users &&
          Users.map((user) => (
            <OtherUsers
              key={user._id}
              id={user && user._id}
              display={user._id === userid ? "none" : ""}
              follower={SingleUser && SingleUser._id}
              followed={user && user._id}
              username={user.username}
              avatar={user.avatar}
            />
          ))}
      </div>
    </div>
  );
};

export default profiles;
