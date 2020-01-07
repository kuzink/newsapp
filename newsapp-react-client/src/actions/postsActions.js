import axios from "axios";
import {
	BASE_URL,
	GET_ERRORS,
	GET_POSTS,
	GET_POST,
	DELETE_POST,
	DELETE_POST_IMAGE,
	DELETE_POST_VIDEO,
	UPLOAD_VIDEO_PROGRESS
} from "./types";

export const getPosts = (size = 9, page = 0, search) => async dispatch => {
	if (!search) search = "";
	const res = await axios.get(`${BASE_URL}/posts?size=${size}&page=${page}&search=${search}`);
	dispatch({
		type: GET_POSTS,
		payload: res.data
	});
	dispatch({
		type: GET_POST,
		payload: {}
	});
	dispatch({
		type: GET_ERRORS,
		payload: {}
	});
};

export const getPost = (id, history) => async dispatch => {
	try {
		const res = await axios.get(`${BASE_URL}/posts/${id}`);
		dispatch({
			type: GET_POST,
			payload: res.data
		});
	} catch (e) {
		history.push(`/error`);
	}
};

export const createPost = (post, history, fd) => async dispatch => {
	try {
		const res = await axios.post(`${BASE_URL}/posts`, post);
		dispatch({
			type: GET_ERRORS,
			payload: {}
		});
		dispatch(createImages(res.data.id, fd, history))
	} catch (e) {
		dispatch({
			type: GET_ERRORS,
			payload: e.response.data
		});
	}
};

export const updatePost = (id, updatedPost, history) => async dispatch => {
	try {
		await axios.patch(`${BASE_URL}/posts/${id}`, updatedPost);
		dispatch({
			type: GET_ERRORS,
			payload: {}
		});
		history.push(`/posts`);
	} catch (e) {
		dispatch({
			type: GET_ERRORS,
			payload: e.response.data
		});
	}
};

export const deletePost = id => async dispatch => {
	await axios.delete(`${BASE_URL}/posts/${id}`);
	dispatch({
		type: DELETE_POST,
		payload: id
	});
	dispatch(getPosts());
};



export const createImages = (ownerId, images, history) => async dispatch => {
	try {
		images.append('ownerId', ownerId);
		await axios.post(`${BASE_URL}/images`, images);
		dispatch({
			type: GET_ERRORS,
			payload: {}
		});
		history.push(`/posts`);
	} catch (e) {
		dispatch({
			type: GET_ERRORS,
			payload: e.response.data
		});
	}
};

export const updateImages = (ownerId, images, history) => async dispatch => {
	try {
		images.append('ownerId', ownerId);
		await axios.post(`${BASE_URL}/images`, images);
		dispatch({
			type: GET_ERRORS,
			payload: {}
		});
		dispatch(getPost(ownerId, history));
	} catch (e) {
		dispatch({
			type: GET_ERRORS,
			payload: e.response.data
		});
	}
};

export const deletePostImage = (imageId) => async dispatch => {
	try {
		await axios.delete(`${BASE_URL}/images/${imageId}`);
		dispatch({
			type: DELETE_POST_IMAGE,
			payload: imageId
		});
	} catch (e) {
		dispatch({
			type: GET_ERRORS,
			payload: e.response.data
		});
	}
};

// video actions

export const updateVideo = (ownerId, video, history) => async dispatch => {
	try {
		video.append('ownerId', ownerId);
		await axios.post(`${BASE_URL}/videos`, video, {
			onUploadProgress: progressEvent => {
				dispatch({
					type: UPLOAD_VIDEO_PROGRESS,
					payload: Math.round(progressEvent.loaded / progressEvent.total * 100)
				});
			}
		});
		dispatch({
			type: GET_ERRORS,
			payload: {}
		});
		dispatch({
			type: UPLOAD_VIDEO_PROGRESS,
			payload: 0
		});
		dispatch(getPost(ownerId, history));
	} catch (e) {
		dispatch({
			type: GET_ERRORS,
			payload: e.response.data
		});
	}
};

export const deletePostVideo = (videoId) => async dispatch => {
	try {
		await axios.delete(`${BASE_URL}/videos/${videoId}`);
		dispatch({
			type: DELETE_POST_VIDEO,
			payload: videoId
		});
	} catch (e) {
		dispatch({
			type: GET_ERRORS,
			payload: e.response.data
		});
	}
};