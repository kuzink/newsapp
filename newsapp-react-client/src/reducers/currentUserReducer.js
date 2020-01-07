import {
	GET_CURRENT_USER_AVATAR, DELETE_CURRENT_USER_AVATAR,
	GET_CURRENT_USER_PROFILE,
	GET_CURRENT_USER_ROLES
} from "../actions/types";

const initialState = {
	currentUserAvatar: null,
	currentUserProfile: {},
	currentUserRoles: []
};

export default function (state = initialState, action) {
	switch (action.type) {
		case GET_CURRENT_USER_AVATAR:
			return {
				...state,
				currentUserAvatar: action.payload.avatar
			};
		case DELETE_CURRENT_USER_AVATAR:
			return {
				...state,
				currentUserAvatar: action.payload
			};
		case GET_CURRENT_USER_PROFILE:
			return {
				...state,
				currentUserProfile: action.payload
			};
		case GET_CURRENT_USER_ROLES:
			return {
				...state,
				currentUserRoles: action.payload
			};
		default:
			return state;
	}
}
