import {
  GET_NEWS,
  GET_NEWS_DETAIL,
  NEWS_LOADING,
  REMOVE_COMMENT,
  DELETE_NEWS
} from "../actions/types";

const initialState = {
  news: [],
  show_news: {},
  loading: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case NEWS_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_NEWS:
      return {
        ...state,
        news: action.payload,
        loading: false
      };
    case GET_NEWS_DETAIL:
      return {
        ...state,
        show_news: action.payload,
        loading: false
      };
    case DELETE_NEWS:
      return {
        ...state,
        news: state.news.filter(news => news._id !== action.payload)
      };
    case REMOVE_COMMENT:
      return {
        ...state,
        show_news: action.payload,
        loading: false
      }
    default:
      return state;
  }
}
