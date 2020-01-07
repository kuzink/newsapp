import {
	GET_USER_PROFILES,
	GET_USER_AVATAR, DELETE_USER_AVATAR,
	GET_USER_PROFILE,
	GET_USER_ROLES
} from "../actions/types";

const initialState = {
	profiles: [],
	userAvatar: null,
	userProfile: {},
	userRoles: []
};

export default function (state = initialState, action) {
	switch (action.type) {
		case GET_USER_PROFILES:
			return {
				...state,
				profiles: action.payload
			};
		case GET_USER_AVATAR:
			return {
				...state,
				userAvatar: action.payload.avatar
			};
		case DELETE_USER_AVATAR:
			return {
				...state,
				userAvatar: action.payload
			};
		case GET_USER_PROFILE:
			return {
				...state,
				userProfile: action.payload
			};
		case GET_USER_ROLES:
			return {
				...state,
				userRoles: action.payload
			};
		default:
			return state;
	}
}
