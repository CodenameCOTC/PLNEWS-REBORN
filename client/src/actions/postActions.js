import axios from "axios";

import {
  GET_ERRORS,
  GET_NEWS,
  GET_NEWS_DETAIL,
  NEWS_LOADING,
  DELETE_NEWS
} from "./types";

// Post News
export const postNews = (newsData, history) => dispatch => {
  axios
    .post("/api/news", newsData)
    .then(res => {
      history.push("/");
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// GET Index News
export const getNews = () => dispatch => {
  dispatch(setNewsLoading());
  axios
    .get("api/news")
    .then(res =>
      dispatch({
        type: GET_NEWS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: null
      })
    );
};

// Get Single News Deatil
export const getShowNews = id => dispatch => {
  dispatch(setNewsLoading());
  axios
    .get(`/api/news/${id}`)
    .then(res =>
      dispatch({
        type: GET_NEWS_DETAIL,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_NEWS_DETAIL,
        payload: null
      })
    );
};

// Posting comment
export const postComments = (news_id, commentData) => dispatch => {
  axios
    .post(`/api/news/${news_id}/comments`, commentData)
    .then(res =>
      dispatch({
        type: GET_NEWS_DETAIL,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Delete News
export const deleteNews = (id, history) => dispatch => {
  dispatch(setNewsLoading());
  axios
    .delete(`/api/news/${id}`)
    .then(res => {
      dispatch({
        type: DELETE_NEWS,
        payload: id
      });
      history.push("/");
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err
      })
    );
};

// Delete News
export const removeComment = (news_id, comment_id) => dispatch => {
  axios
    .delete(`/api/news/${news_id}/comments/${comment_id}`)
    .then(res => {
      dispatch({
        type: GET_NEWS_DETAIL,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err
      })
    );
};


// Set loading state
export const setNewsLoading = () => {
  return {
    type: NEWS_LOADING
  };
};
