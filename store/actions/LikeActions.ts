import axios from "axios";
import {
  GET_ALL_LIKES_FAIL,
  GET_ALL_LIKES_REQUEST,
  GET_ALL_LIKES_SUCCESS,
  LIKE_POST_FAIL,
  LIKE_POST_REQUEST,
  LIKE_POST_SUCCESS,
} from "../constants/LikeConstants";

export const likePost = (userid, postid) => async (dispatch) => {
  dispatch({ type: LIKE_POST_REQUEST, payload: { userid, postid } });
  try {
    const res = await axios.post("http://localhost:8080/api/like/", {
      userid,
      postid,
    });
    dispatch({ type: LIKE_POST_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({
      type: LIKE_POST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getAllLikes = () => async (dispatch) => {
  dispatch({ type: GET_ALL_LIKES_REQUEST });
  try {
    const res = await axios.get("http://localhost:8080/api/like/get/likes");
    dispatch({ type: GET_ALL_LIKES_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({
      type: GET_ALL_LIKES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
