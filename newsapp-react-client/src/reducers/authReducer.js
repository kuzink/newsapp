import {SET_CURRENT_USER, GET_USERNAME_AVAILABILITY, GET_CURRENT_PERMISSIONS} from "../actions/types";

const initialState = {
  user: {},
  validToken: false,
  isUsernameAvailable: true,
	currentPermissions: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        validToken: !!action.payload,
        user: action.payload
      };
	  case GET_USERNAME_AVAILABILITY:
		  return {
			  ...state,
			  isUsernameAvailable: action.payload
		  };
	  case GET_CURRENT_PERMISSIONS:
		  return {
			  ...state,
			  currentPermissions: action.payload
		  };
    default:
      return state;
  }
}
