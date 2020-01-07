import {GET_COMMENTS, DELETE_COMMENT, UPDATE_COMMENT} from "../actions/types";

const initialState = {
	comments: [],
	page: {}
};

export default function (state = initialState, action) {
	switch (action.type) {
		case GET_COMMENTS:
			return {
				...state,
				comments: action.payload.content,
				page: action.payload.page
			};
		case DELETE_COMMENT:
			return {
				...state,
				comments: state.comments.filter(comment => comment.id !== action.payload)
			};
		case UPDATE_COMMENT:
			state.comments.forEach(comment => { if(comment.id === action.payload.id) comment.text = action.payload.text; });
			return {
				...state,
				comments: state.comments,
			};
		default:
			return state;
	}
}