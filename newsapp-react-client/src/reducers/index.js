import {combineReducers} from "redux";
import errorReducer from "./errorReducer";
import postsReducer from "./postsReducer";
import commentsReducer from "./commentsReducer";
import authReducer from "./authReducer";
import currentUserReducer from "./currentUserReducer";
import userProfileReducer from "./userProfileReducer";
import rolesReducer from "./rolesReducer";

export default combineReducers({
	errors: errorReducer,
	posts: postsReducer,
	comments: commentsReducer,
	security: authReducer,
	currentUser: currentUserReducer,
	profile: userProfileReducer,
	roles: rolesReducer
});



