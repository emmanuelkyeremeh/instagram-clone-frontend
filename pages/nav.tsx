import Image from "next/image";
import SearchIcon from "@material-ui/icons/Search";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import SendRoundedIcon from "@material-ui/icons/SendRounded";
import ExploreOutlinedIcon from "@material-ui/icons/ExploreOutlined";
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import Typography from "@material-ui/core/Typography";
import Link from "next/link";
import AccountCircleRoundedIcon from "@material-ui/icons/AccountCircleRounded";
import IconButton from "@material-ui/core/IconButton";
import AddToPhotosOutlinedIcon from "@material-ui/icons/AddToPhotosOutlined";
import Tooltip from "@material-ui/core/Tooltip";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

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
  const userData = useSelector((state) => state.Login);
  const { userDataInsta } = userData;
  return (
    <div className="navbar-container">
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
        <Tooltip title="Direct Message">
          <IconButton>
            <SendRoundedIcon
              style={{ color: "black" }}
              className="navbar-icon"
            />
          </IconButton>
        </Tooltip>
        <Tooltip title="Explore">
          <IconButton>
            <ExploreOutlinedIcon
              style={{ color: "black" }}
              className="navbar-icon"
            />
          </IconButton>
        </Tooltip>
        <Tooltip title="Me">
          <IconButton>
            <AccountCircleRoundedIcon
              onClick={handleClick("bottom")}
              style={{ color: "black" }}
              className="navbar-icon"
            />
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
      </div>
      <Popper open={open} anchorEl={anchorEl} placement={placement} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper style={{ borderRadius: "20px" }}>
              <Typography
                className={classes.typography}
                style={{
                  color: "white",
                  backgroundColor: "rgb(66, 65, 65)",
                  borderRadius: "20px",
                  padding: 0,
                  margin: 0,
                }}
              >
                <div className="nav-dropdown">
                  <p
                    onClick={(e) =>
                      router.push(`/profile/${userDataInsta.username}`)
                    }
                  >
                    profile
                  </p>
                  <p>Log Out</p>
                </div>
              </Typography>
            </Paper>
          </Fade>
        )}
      </Popper>
    </div>
  );
};

export default Nav;
