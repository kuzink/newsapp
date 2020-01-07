import axios from "axios";
import {
	BASE_URL,
	GET_CURRENT_USER_AVATAR,
	DELETE_CURRENT_USER_AVATAR,
	GET_ERRORS,
	GET_CURRENT_USER_PROFILE,
	GET_CURRENT_USER_ROLES,
	GET_USER_AVATAR, DELETE_USER_AVATAR, GET_USER_PROFILE, GET_USER_ROLES
} from "./types";
import {getCurrentPermissions} from "./rolesActions";

export const getCurrentUserAvatar = userId => async dispatch => {
	const res = await axios.get(`${BASE_URL}/avatars/${userId}`);
	dispatch({
		type: GET_CURRENT_USER_AVATAR,
		payload: res.data
	});
};

export const uploadCurrentUserAvatar = (userId, avatar) => async dispatch => {
	try {
		avatar.append('userId', userId);
		const res = await axios.post(`${BASE_URL}/avatars`, avatar);
		dispatch({
			type: GET_CURRENT_USER_AVATAR,
			payload: res.data
		});
		dispatch({
			type: GET_USER_AVATAR,
			payload: res.data
		});
	} catch (e) {
		dispatch({
			type: GET_ERRORS,
			payload: e.response.data
		});
	}
};

export const deleteCurrentUserAvatar = userId => async dispatch => {
	await axios.delete(`${BASE_URL}/avatars/${userId}`);
	dispatch({
		type: DELETE_CURRENT_USER_AVATAR,
		payload: null
	});
	dispatch({
		type: DELETE_USER_AVATAR,
		payload: null
	});
};



export const getCurrentUserProfile = userId => async dispatch => {
	try {
		const res = await axios.get(`${BASE_URL}/profiles/${userId}`);
		dispatch({
			type: GET_CURRENT_USER_PROFILE,
			payload: res.data
		});
	} catch (e) {
		dispatch({
			type: GET_ERRORS,
			payload: e.response.data
		});
	}
};

export const updateCurrentUserProfile = (userId, updatedProfile) => async dispatch => {
	try {
		const res = await axios.patch(`${BASE_URL}/profiles/${userId}`, updatedProfile);
		dispatch({
			type: GET_CURRENT_USER_PROFILE,
			payload: res.data
		});
		dispatch({
			type: GET_USER_PROFILE,
			payload: res.data
		});
	} catch (e) {
		dispatch({
			type: GET_ERRORS,
			payload: e.response.data
		});
	}
};



export const getCurrentUserRoles = userId => async dispatch => {
	try {
		const res = await axios.get(`${BASE_URL}/users/${userId}/roles`);
		dispatch({
			type: GET_CURRENT_USER_ROLES,
			payload: res.data
		});
	} catch (e) {
		dispatch({
			type: GET_ERRORS,
			payload: e.response.data
		});
	}
};

export const setRolesToCurrentUser = (userId, roleIds) => async dispatch => {
	try {
		const res = await axios.patch(`${BASE_URL}/users/${userId}/roles?roleIds=${roleIds}`);
		dispatch({
			type: GET_CURRENT_USER_ROLES,
			payload: res.data
		});
		dispatch({
			type: GET_USER_ROLES,
			payload: res.data
		});
		dispatch(getCurrentPermissions());
	} catch (e) {
		dispatch({
			type: GET_ERRORS,
			payload: e.response.data
		});
	}
};
