import { GET_NEWS, GET_NEWS_DETAIL, NEWS_LOADING } from "../actions/types";

const initialState = {
  news: [],
  show_news: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case NEWS_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_NEWS_DETAIL:
      return {
        ...state,
        news: [],
        loading: false,
        show_news: action.payload
      };

    case GET_NEWS:
      return {
        ...state,
        news: action.payload,
        loading: false
      };
    default:
      return {};
  }
}
