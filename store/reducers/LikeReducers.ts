import {
  GET_ALL_LIKES_FAIL,
  GET_ALL_LIKES_REQUEST,
  GET_ALL_LIKES_SUCCESS,
  LIKE_POST_FAIL,
  LIKE_POST_REQUEST,
  LIKE_POST_SUCCESS,
} from "../constants/LikeConstants";

export const likePostReducer = (state = {}, action) => {
  if (action.type === LIKE_POST_REQUEST) {
    return { loading: true };
  } else if (action.type === LIKE_POST_SUCCESS) {
    return { loading: false, likedPost: action.payload };
  } else if (action.type === LIKE_POST_FAIL) {
    return { loading: false, error: action.payload };
  } else {
    return state;
  }
};

export const getAllLikesReducer = (state = {}, action) => {
  if (action.type === GET_ALL_LIKES_REQUEST) {
    return { loading: true };
  } else if (action.type === GET_ALL_LIKES_SUCCESS) {
    return { loading: false, AllLikes: action.payload };
  } else if (action.type === GET_ALL_LIKES_FAIL) {
    return { loading: false, error: action.payload };
  } else {
    return state;
  }
};


