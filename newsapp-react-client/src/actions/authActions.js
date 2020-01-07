import axios from "axios";
import {
	BASE_URL,
	GET_ERRORS,
	SET_CURRENT_USER,
	GET_USERNAME_AVAILABILITY
} from "./types";
import setJWTToken from "../securityutils/setJWTToken";
import jwt_decode from "jwt-decode";

export const register = (newUser, history) => async dispatch => {
	try {
		await axios.post(`${BASE_URL}/auth/register`, newUser);
		history.push("/login");
		dispatch({
			type: GET_ERRORS,
			payload: {}
		});
	} catch (err) {
		dispatch({
			type: GET_ERRORS,
			payload: err.response.data
		});
	}
};

export const login = LoginRequest => async dispatch => {
	try {
		const res = await axios.post(`${BASE_URL}/auth/login`, LoginRequest);
		const { token } = res.data;
		localStorage.setItem("jwtToken", token);
		setJWTToken(token);
		const decoded = jwt_decode(token);
		dispatch({
			type: SET_CURRENT_USER,
			payload: decoded
		});
	} catch (err) {
		dispatch({
			type: GET_ERRORS,
			payload: err.response.data
		});
	}
};

export const logout = () => dispatch => {
	localStorage.removeItem("jwtToken");
	setJWTToken(false);
	dispatch({
		type: SET_CURRENT_USER,
		payload: {}
	});
};

export const isUsernameAvailable = (username) => async dispatch => {
	try {
		const res = await axios.get(`${BASE_URL}/auth/isUsernameAvailable?username=${username}`);
		dispatch({
			type: GET_USERNAME_AVAILABILITY,
			payload: res.data
		});
	} catch (err) {
		dispatch({
			type: GET_ERRORS,
			payload: err.response.data
		});
	}
};