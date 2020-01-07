import {DELETE_ROLE, GET_ALL_PERMISSIONS, GET_ALL_ROLES} from "../actions/types";

const initialState = {
	permissions: [],
	roles: []
};

export default function (state = initialState, action) {
	switch (action.type) {
		case GET_ALL_PERMISSIONS:
			return {
				...state,
				permissions: action.payload
			};
		case GET_ALL_ROLES:
			return {
				...state,
				roles: action.payload
			};
		case DELETE_ROLE:
			return {
				...state,
				roles: state.roles.filter(role => role.id !== Number(action.payload))
			};
		default:
			return state;
	}
}
