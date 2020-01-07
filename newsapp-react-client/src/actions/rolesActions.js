import axios from "axios";
import {
	BASE_URL,
	GET_CURRENT_PERMISSIONS,
	GET_ALL_PERMISSIONS,
	GET_ALL_ROLES,
	DELETE_ROLE,
	GET_ERRORS
} from "./types";

export const getAllRoles = (history) => async dispatch => {
	try {
		const res = await axios.get(`${BASE_URL}/roles`);
		dispatch({
			type: GET_ALL_ROLES,
			payload: res.data
		});
	} catch (e) {
		history.push(`/error`);
	}
};

export const getAllPermissions = (history) => async dispatch => {
	try {
		const res = await axios.get(`${BASE_URL}/roles/permissions`);
		dispatch({
			type: GET_ALL_PERMISSIONS,
			payload: res.data
		});
	} catch (e) {
		history.push(`/error`);
	}
};

export const getCurrentPermissions = () => async dispatch => {
	const res = await axios.get(`${BASE_URL}/roles/currentPermissions`);
	dispatch({
		type: GET_CURRENT_PERMISSIONS,
		payload: res.data
	});
};

export const createRole = (role) => async dispatch => {
	try {
		await axios.post(`${BASE_URL}/roles`, role);
		dispatch({
			type: GET_ERRORS,
			payload: {}
		});
		dispatch(getAllRoles());
	} catch (e) {
		dispatch({
			type: GET_ERRORS,
			payload: e.response.data
		});
	}
};

export const deleteRole = (id) => async dispatch => {
	try {
		await axios.delete(`${BASE_URL}/roles/${id}`);
		dispatch({
			type: DELETE_ROLE,
			payload: id
		});
		dispatch(getCurrentPermissions());
	} catch (e) {
		dispatch({
			type: GET_ERRORS,
			payload: e.response.data
		});
	}
};

export const updateRole = (id, updatedRole) => async dispatch => {
	try {
		await axios.patch(`${BASE_URL}/roles/${id}`, updatedRole);
		dispatch({
			type: GET_ERRORS,
			payload: {}
		});
		dispatch(getAllRoles());
		dispatch(getCurrentPermissions());
	} catch (e) {
		dispatch({
			type: GET_ERRORS,
			payload: e.response.data
		});
	}
};
