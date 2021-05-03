import {
  FOLLOW_USER_FAIL,
  FOLLOW_USER_REQUEST,
  FOLLOW_USER_SUCCESS,
  GET_FOLLOWERS_FAIL,
  GET_FOLLOWERS_REQUEST,
  GET_FOLLOWERS_SUCCESS,
  GET_FOLLOWING_FAIL,
  GET_FOLLOWING_REQUEST,
  GET_FOLLOWING_SUCCESS,
  GET_FOLLOW_DATA_FAIL,
  GET_FOLLOW_DATA_REQUEST,
  GET_FOLLOW_DATA_SUCCESS,
} from "../constants/FollowConstants";
import axios from "axios";

export const followUser = (follower, followed) => async (dispatch) => {
  dispatch({ type: FOLLOW_USER_REQUEST, payload: { follower, followed } });
  try {
    const res = await axios.post(
      "https://instagram-clone-backend-1.herokuapp.com/api/follow",
      {
        follower,
        followed,
      }
    );
    dispatch({ type: FOLLOW_USER_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({
      type: FOLLOW_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getFollowData = () => async (dispatch) => {
  dispatch({ type: GET_FOLLOW_DATA_REQUEST });
  try {
    const res = await axios.get(
      `https://instagram-clone-backend-1.herokuapp.com/api/follow/info/`
    );
    dispatch({ type: GET_FOLLOW_DATA_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({
      type: GET_FOLLOW_DATA_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getfollowers = (userid) => async (dispatch) => {
  dispatch({ type: GET_FOLLOWERS_REQUEST, payload: userid });
  try {
    const res = await axios.get(
      `https://instagram-clone-backend-1.herokuapp.com/api/follow/followers/${userid}`
    );
    dispatch({ type: GET_FOLLOWERS_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({
      type: GET_FOLLOWERS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getfollowing = (userid) => async (dispatch) => {
  dispatch({ type: GET_FOLLOWING_REQUEST, payload: userid });
  try {
    const res = await axios.get(
      `https://instagram-clone-backend-1.herokuapp.com/api/follow/following/${userid}`
    );
    dispatch({ type: GET_FOLLOWING_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({
      type: GET_FOLLOWING_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
