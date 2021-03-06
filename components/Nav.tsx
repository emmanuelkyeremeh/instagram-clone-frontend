import Image from "next/image";
import SearchIcon from "@material-ui/icons/Search";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import SendRoundedIcon from "@material-ui/icons/SendRounded";
import ExploreOutlinedIcon from "@material-ui/icons/ExploreOutlined";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import Typography from "@material-ui/core/Typography";
import { useDispatch } from "react-redux";
import Link from "next/link";
import AccountCircleRoundedIcon from "@material-ui/icons/AccountCircleRounded";
import IconButton from "@material-ui/core/IconButton";
import AddToPhotosOutlinedIcon from "@material-ui/icons/AddToPhotosOutlined";
import Tooltip from "@material-ui/core/Tooltip";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { usersignout } from "../store/actions/userActions";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 500,
  },
  typography: {
    padding: theme.spacing(2),
  },
}));

const Nav = ({ handleOpen, display }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState();
  const classes = useStyles();

  const handleClick = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };

  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogOut = (e) => {
    dispatch(usersignout());
  };
  const userData = useSelector((state) => state.Login);
  const { userDataInsta } = userData;
  return (
    <nav className="navbar-container">
      <div className="navbar-logo">
        <Link href="/">
          <Image src="/instagram-clone.png" width="103" height="29" />
        </Link>
      </div>
      <div className="navbar-search">
        <SearchIcon style={{ color: "grey" }} />
        <input type="text" placeholder="Search" />
      </div>
      <div className="navbar-icons">
        <Tooltip title="Home">
          <IconButton>
            <Link href="/">
              <HomeRoundedIcon
                style={{ color: "black" }}
                className="navbar-icon"
              />
            </Link>
          </IconButton>
        </Tooltip>
        {display ? (
          <Tooltip title="Create Post">
            <IconButton onClick={handleOpen}>
              <AddToPhotosOutlinedIcon
                style={{ color: "black" }}
                className="navbar-icon"
              />
            </IconButton>
          </Tooltip>
        ) : null}
        <Tooltip title="Me">
          <IconButton onClick={handleClick("bottom")}>
            <AccountCircleRoundedIcon
              style={{ color: "black" }}
              className="navbar-icon"
            />
          </IconButton>
        </Tooltip>
        <Tooltip title="Direct Message">
          <IconButton>
            <SendRoundedIcon
              style={{ color: "black" }}
              className="navbar-icon message-icon"
            />
          </IconButton>
        </Tooltip>
        <Tooltip title="Explore">
          <IconButton>
            <ExploreOutlinedIcon
              style={{ color: "black" }}
              className="navbar-icon explore-icon"
            />
          </IconButton>
        </Tooltip>
      </div>
      <Popper open={open} anchorEl={anchorEl} placement={placement} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper style={{ borderRadius: "5px" }}>
              <Typography
                className={classes.typography}
                style={{
                  color: "black",
                  backgroundColor: "white",
                  borderRadius: "5px",
                  padding: 0,
                  margin: 0,
                }}
              >
                <div className="nav-dropdown">
                  <div
                    className="my-profile"
                    onClick={(e) =>
                      router.push(`/profile/${userDataInsta.username}`)
                    }
                  >
                    <AccountCircleOutlinedIcon />
                    <p>profile</p>
                  </div>
                  <div className="logout" onClick={handleLogOut}>
                    <p>Log Out</p>
                  </div>
                </div>
              </Typography>
            </Paper>
          </Fade>
        )}
      </Popper>
    </nav>
  );
};

export default Nav;
