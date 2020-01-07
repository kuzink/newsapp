import React, {Component} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./store";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootswatch/dist/materia/bootstrap.css';
import Header from "./components/layout/Header";
import Posts from "./components/pages/Posts";
import PostCreate from "./components/posts/PostCreate";
import PostView from "./components/posts/PostView";
import PostUpdate from "./components/posts/PostUpdate";
import CommentCreate from "./components/comments/CommentCreate";
import Landing from "./components/pages/Landing";
import Roles from "./components/pages/Roles";
import Users from "./components/pages/Users";
import UserProfile from "./components/pages/UserProfile";
import Page404 from "./components/pages/Page404";
import Footer from "./components/layout/Footer";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import jwt_decode from "jwt-decode";
import setJWTToken from "./securityutils/setJWTToken";
import {SET_CURRENT_USER} from "./actions/types";
import {logout} from "./actions/authActions";
import SecuredRoute from "./securityutils/SecureRoute";

/*(function checkTokenExpired() {*/
	const jwtToken = localStorage.jwtToken;
	if (jwtToken) {
		setJWTToken(jwtToken);
		const decoded_jwtToken = jwt_decode(jwtToken);
		store.dispatch({
			type: SET_CURRENT_USER,
			payload: decoded_jwtToken
		});
		const currentTime = Date.now() / 1000;
		if (decoded_jwtToken.exp < currentTime) {
			store.dispatch(logout());
			window.location.href = "/";
		}
	}
/*	setTimeout(checkTokenExpired, 60000);
})();*/

class App extends Component {
	render() {
		/*let requiredPermissions = [1,2,3];
		let currentPermissions = [2,3,4,1];
		console.log(requiredPermissions.every(v => currentPermissions.includes(v)));*/
		return (
			<Provider store={store}>
				<Router>
					<div className="App">
						<Header/>
						<Switch>
							<Route exact path="/" component={Landing}/>
							<Route exact path="/register" component={Register}/>
							<Route exact path="/login" component={Login}/>
							<Route exact path="/posts" component={Posts}/>
							<Route exact path="/posts/:id/view" component={PostView}/>

							<SecuredRoute exact path="/posts/create" component={PostCreate}/>
							<SecuredRoute exact path="/posts/:id/update" component={PostUpdate}/>
							<SecuredRoute exact path="/posts/:id/comments/create" component={CommentCreate}/>
							<SecuredRoute exact path="/profiles/:id" component={UserProfile}/>
							{/*<SecuredRoute exact path="/roles" component={Roles} requiredPermissions={['ROLE_ROLE_READ']}/>*/}
							<SecuredRoute exact path="/roles" component={Roles}/>
							<SecuredRoute exact path="/users" component={Users}/>

							<Route exact path="/error" component={Page404}/>
							<Route component={Page404}/>
						</Switch>
						<Footer/>
					</div>
				</Router>
			</Provider>
		);
	}
}

export default App;
