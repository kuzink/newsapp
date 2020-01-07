import axios from "axios";
import {
	BASE_URL,
	GET_ERRORS,
	GET_COMMENTS,
	DELETE_COMMENT,
	UPDATE_COMMENT
} from "./types";

export const getComments = (post_id, size = 5, page = 0) => async dispatch => {
	try {
		const res = await axios.get(`${BASE_URL}/comments/post/${post_id}?size=${size}&page=${page}`);
		dispatch({
			type: GET_COMMENTS,
			payload: res.data
		});
	} catch (e) {
		dispatch({
			type: GET_ERRORS,
			payload: e.response.data
		});
	}
};

export const createComment = (post_id, comment) => async dispatch => {
	try {
		await axios.post(`${BASE_URL}/comments/${post_id}`, comment);
		dispatch({
			type: GET_ERRORS,
			payload: {}
		});
		dispatch(getComments(post_id));
	} catch (e) {
		dispatch({
			type: GET_ERRORS,
			payload: e.response.data
		});
	}
};

export const updateComment = (post_id, comment_id, comment) => async dispatch => {
	try {
		const res = await axios.patch(`${BASE_URL}/comments/${comment_id}`, comment);
		dispatch({
			type: UPDATE_COMMENT,
			payload: res.data
		});
	} catch (e) {
		dispatch({
			type: GET_ERRORS,
			payload: e.response.data
		});
	}
};

export const deleteComment = (post_id, comment_id) => async dispatch => {
	await axios.delete(`${BASE_URL}/comments/${comment_id}`);
	dispatch({
		type: DELETE_COMMENT,
		payload: comment_id
	});
	dispatch(getComments(post_id));
};