import { SET_CURRENT_USER, CLEAR_CURRENT_PROFILE } from "../actions/types";
import isEmpty from "../validation/is-empty";

const initialState = {
  isAuthenticated: false,
  user: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        // Change isAuthenticated from true to false
        isAuthenticated: false,
        // CLear user profile
        user: {}
      };

    default:
      return state;
  }
}
