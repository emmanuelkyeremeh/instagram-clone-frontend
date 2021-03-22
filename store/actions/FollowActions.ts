import {
  FOLLOW_USER_FAIL,
  FOLLOW_USER_REQUEST,
  FOLLOW_USER_SUCCESS,
  GET_FOLLOW_DATA_FAIL,
  GET_FOLLOW_DATA_REQUEST,
  GET_FOLLOW_DATA_SUCCESS,
} from "../constants/FollowConstants";
import axios from "axios";

export const followUser = (follower, followed) => async (dispatch) => {
  dispatch({ type: FOLLOW_USER_REQUEST, payload: { follower, followed } });
  try {
    const res = await axios.post("http://localhost:8080/api/follow", {
      follower,
      followed,
    });
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

export const getFollowData = (follower, followed) => async (dispatch) => {
  dispatch({ type: GET_FOLLOW_DATA_REQUEST, payload: { follower, followed } });
  try {
    const res = await axios.get(
      `http://localhost:8080/api/follow/info/${follower}/${followed}`
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
