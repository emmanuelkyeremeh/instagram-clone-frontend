import {
  FOLLOW_USER_FAIL,
  FOLLOW_USER_REQUEST,
  FOLLOW_USER_SUCCESS,
  GET_FOLLOW_DATA_FAIL,
  GET_FOLLOW_DATA_REQUEST,
  GET_FOLLOW_DATA_SUCCESS,
} from "../constants/FollowConstants";

export const followUserReducer = (state = {}, action) => {
  if (action.type === FOLLOW_USER_REQUEST) {
    return { loading: true };
  } else if (action.type === FOLLOW_USER_SUCCESS) {
    return { loading: false, userFollow: action.payoad };
  } else if (action.type === FOLLOW_USER_FAIL) {
    return { loading: false, error: action.payload };
  } else {
    return state;
  }
};

export const followDataReducer = (state = {}, action) => {
  if (action.type === GET_FOLLOW_DATA_REQUEST) {
    return { loading: true };
  } else if (action.type === GET_FOLLOW_DATA_SUCCESS) {
    return { loading: false, followData: action.payload };
  } else if (action.type === GET_FOLLOW_DATA_FAIL) {
    return { loading: false, error: action.payload };
  } else {
    return state;
  }
};
