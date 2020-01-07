import {GET_POSTS, GET_POST, DELETE_POST, DELETE_POST_IMAGE, DELETE_POST_VIDEO, UPLOAD_VIDEO_PROGRESS} from "../actions/types";

const initialState = {
	posts: [],
	post: {},
	page: {},
	uploadVideoProgress: null
};

export default function (state = initialState, action) {
	switch (action.type) {
		case GET_POSTS:
			return {
				...state,
				posts: action.payload.content,
				page: action.payload.page
			};
		case GET_POST:
			return {
				...state,
				post: action.payload
			};
		case DELETE_POST:
			return {
				...state,
				posts: state.posts.filter(post => post.id !== action.payload)
			};
		case DELETE_POST_IMAGE:
			state.post.images = state.post.images.filter(image => image.id !== action.payload);
			return {
				...state,
				post: {...state.post}
			};
		case DELETE_POST_VIDEO:
			state.post.video = null;
			return {
				...state,
				post: {...state.post}
			};
		case UPLOAD_VIDEO_PROGRESS:
			return {
				...state,
				uploadVideoProgress: action.payload
			};
		default:
			return state;
	}
}
