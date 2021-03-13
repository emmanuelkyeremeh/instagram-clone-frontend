import {
  CREATE_POST_FAIL,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  FIND_POST_BY_USER_FAIL,
  FIND_POST_BY_USER_REQUEST,
  FIND_POST_BY_USER_SUCCESS,
  FIND_SINGLE_POST_FAIL,
  FIND_SINGLE_POST_REQUEST,
  FIND_SINGLE_POST_SUCCESS,
  GET_POSTS_FAIL,
  GET_POSTS_REQUEST,
  GET_POSTS_SUCCESS,
  POST_DELETE_FAIL,
  POST_DELETE_REQUEST,
  POST_DELETE_SUCCESS,
  POST_UPDATE_FAIL,
  POST_UPDATE_REQUEST,
  POST_UPDATE_SUCCESS,
} from "../constants/PostConstant";

export const createPostReducer = (state = {}, action) => {
  if (action.type === CREATE_POST_REQUEST) {
    return { loading: true };
  } else if (action.type === CREATE_POST_SUCCESS) {
    return { loading: false, post: action.payload };
  } else if (action.type === CREATE_POST_FAIL) {
    return { loading: false, error: action.payload };
  } else {
    return state;
  }
};
export const getPostReducer = (state = {}, action) => {
  if (action.type === GET_POSTS_REQUEST) {
    return { loading: true };
  } else if (action.type === GET_POSTS_SUCCESS) {
    return { loading: false, posts: action.payload };
  } else if (action.type === GET_POSTS_FAIL) {
    return { loading: false, error: action.payload };
  } else {
    return state;
  }
};

export const getSinglePostReducer = (state = {}, action) => {
  if (action.type === FIND_SINGLE_POST_REQUEST) {
    return { loading: true };
  } else if (action.type === FIND_SINGLE_POST_SUCCESS) {
    return { loading: false, newposts: action.payload };
  } else if (action.type === FIND_SINGLE_POST_FAIL) {
    return { loading: false, error: action.payload };
  } else {
    return state;
  }
};
export const findPostByUserReducer = (state = {}, action) => {
  if (action.type === FIND_POST_BY_USER_REQUEST) {
    return { loading: true };
  } else if (action.type === FIND_POST_BY_USER_SUCCESS) {
    return { loading: false, PostData: action.payload };
  } else if (action.type === FIND_POST_BY_USER_FAIL) {
    return { loading: false, error: action.payload };
  } else {
    return state;
  }
};

export const deletePostReducer = (state = {}, action) => {
  if (action.type === POST_DELETE_REQUEST) {
    return { loading: true, success: false };
  } else if (action.type === POST_DELETE_SUCCESS) {
    return { loading: false, success: true, deletedPost: action.payload };
  } else if (action.type === POST_DELETE_FAIL) {
    return { loading: false, success: false, error: action.payload };
  } else {
    return state;
  }
};

export const updatePostReducer = (state = {}, action) => {
  if (action.type === POST_UPDATE_REQUEST) {
    return { loading: true };
  } else if (action.type === POST_UPDATE_SUCCESS) {
    return { loading: false, success: true, updatedPost: action.payload };
  } else if (action.type === POST_UPDATE_FAIL) {
    return { loading: false, error: action.payload };
  } else {
    return state;
  }
};
