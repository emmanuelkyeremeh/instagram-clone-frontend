import { Avatar } from "@material-ui/core";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import GridOnOutlinedIcon from "@material-ui/icons/GridOnOutlined";
import Image from "next/image";
import Head from "next/head";
import Nav from "../nav";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

const profile = () => {
  const handleOpen = () => {
    //boilerplate function for props and error removal!
  };
  useEffect(() => {}, []);

  return (
    <div className="profile-container">
      <Head>
        <title>site</title>
      </Head>
      <Nav handleOpen={handleOpen} display={false} />
      <div className="profile-info">
        <div className="profile-avatar">
          <Avatar alt="User" src="" className="profile-avatar" />
        </div>
        <div className="profile-stats">
          <div className="profile-name">
            <p>aning_49</p>
            <button>Edit Profile</button>
            <SettingsOutlinedIcon className="profile-name-icon" />
          </div>
          <div className="profile-stats-section">
            1 post 73 followers 88 following
          </div>
          <div className="profile-bio">
            <p>Emmanuel Kepler</p>
            <p>Avid Sports fan</p>
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
        <div className="post-hover">
          <Image
            className="post-hover-image"
            width="350"
            height="350"
            src="/103114.jpg"
          />
        </div>
      </div>
    </div>
  );
};

export default profile;
