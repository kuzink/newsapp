import axios from "axios";
import {
	BASE_URL,
	GET_USER_PROFILES,
	GET_USER_AVATAR, DELETE_USER_AVATAR,
	GET_USER_PROFILE,
	GET_USER_ROLES,
	GET_ERRORS
} from "./types";

export const getProfiles = (history) => async dispatch => {
	try {
		const res = await axios.get(`${BASE_URL}/profiles`);
		dispatch({
			type: GET_USER_PROFILES,
			payload: res.data
		});
	} catch (e) {
		history.push(`/error`);
	}
};

export const searchProfiles = searchParams => async dispatch => {
	try {
		const res = await axios.post(`${BASE_URL}/profiles/search`, searchParams);
		dispatch({
			type: GET_USER_PROFILES,
			payload: res.data
		});
	} catch (e) {
		dispatch({
			type: GET_ERRORS,
			payload: e.response.data
		});
	}
};



export const getUserAvatar = userId => async dispatch => {
	const res = await axios.get(`${BASE_URL}/avatars/${userId}`);
	dispatch({
		type: GET_USER_AVATAR,
		payload: res.data
	});
};

export const uploadUserAvatar = (userId, avatar) => async dispatch => {
	try {
		avatar.append('userId', userId);
		const res = await axios.post(`${BASE_URL}/avatars`, avatar);
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

export const deleteUserAvatar = userId => async dispatch => {
	await axios.delete(`${BASE_URL}/avatars/${userId}`);
	dispatch({
		type: DELETE_USER_AVATAR,
		payload: null
	});
};



export const getUserProfile = (userId, history) => async dispatch => {
	try {
		const res = await axios.get(`${BASE_URL}/profiles/${userId}`);
		dispatch({
			type: GET_USER_PROFILE,
			payload: res.data
		});
	} catch (e) {
		history.push(`/error`);
	}
};

export const updateUserProfile = (userId, updatedProfile) => async dispatch => {
	try {
		const res = await axios.patch(`${BASE_URL}/profiles/${userId}`, updatedProfile);
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



export const getUserRoles = userId => async dispatch => {
	try {
		const res = await axios.get(`${BASE_URL}/users/${userId}/roles`);
		dispatch({
			type: GET_USER_ROLES,
			payload: res.data
		});
	} catch (e) {
		dispatch({
			type: GET_ERRORS,
			payload: e.response.data
		});
	}
};

export const setRolesToUser = (userId, roleIds) => async dispatch => {
	try {
		const res = await axios.patch(`${BASE_URL}/users/${userId}/roles?roleIds=${roleIds}`);
		dispatch({
			type: GET_USER_ROLES,
			payload: res.data
		});
	} catch (e) {
		dispatch({
			type: GET_ERRORS,
			payload: e.response.data
		});
	}
};














