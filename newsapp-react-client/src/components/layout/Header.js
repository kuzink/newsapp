import React, {Component} from 'react';
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logout } from "../../actions/authActions";
import defaultAvatar from "../../images/avatars/defaultAvatar.png";
import { getCurrentUserAvatar, getCurrentUserProfile } from "../../actions/currentUserActions";
import {getCurrentPermissions} from "../../actions/rolesActions";
import {getPosts} from "../../actions/postsActions";

class Header extends Component {

	state = {
		displayMenu: false,
		displayProfileMenu: false,
		search: ""
	};

	showDropdownMenu = (event) =>  {
		event.preventDefault();
		this.setState({ displayMenu: true }, () => {
			document.addEventListener('click', this.hideDropdownMenu);
		})
	};

	hideDropdownMenu = () => {
		this.setState({ displayMenu: false }, () => {
			document.removeEventListener('click', this.hideDropdownMenu);
		})
	};

	showProfileMenu = (event) =>  {
		event.preventDefault();
		this.setState({ displayProfileMenu: true }, () => {
			document.addEventListener('click', this.hideProfileMenu);
		})
	};

	hideProfileMenu = () => {
		this.setState({ displayProfileMenu: false }, () => {
			document.removeEventListener('click', this.hideProfileMenu);
		})
	};

	logout() {
		this.props.logout();
		window.location.href = "/";
	}

	componentDidMount() {
		//if user was authenticated at the moment of first render or after reload of the page
		if (Object.keys(this.props.security.user).length !== 0) {
			const currentUserId = this.props.security.user.id;
			this.callActions(currentUserId)
		}
	}

	componentWillReceiveProps(nextProps) {
		//request fired immediately after login:
		if (Object.keys(nextProps.security.user).length !== 0 && nextProps.security.user !== this.props.security.user){
			const currentUserId = nextProps.security.user.id;
			this.callActions(currentUserId)
		}
	}

	callActions = (userId) => {
		this.props.getCurrentUserAvatar(userId);
		this.props.getCurrentUserProfile(userId);
		this.props.getCurrentPermissions();
	};

	onChange(e) {
		this.setState({[e.target.name]: e.target.value});
	}

	onSearchClick = () => {
		this.props.getPosts(undefined, undefined, this.state.search);
	};

	handle(e) {
		return (e.key === 'Enter') ? this.onSearchClick() : false;
	}

	render() {
		const {search} = this.state;
		const {validToken, user, currentPermissions} = this.props.security;
		const settingsVisible = currentPermissions.some(el => (el === 'ROLE_ROLE_READ') || (el === 'ROLE_USER_PROFILE_READ'));
		const {currentUserAvatar, currentUserProfile} = this.props.currentUser;
		const avatarSrc = currentUserAvatar ? `data:image/jpeg;base64,${currentUserAvatar}` : defaultAvatar;
		const userIsAuthenticated = (
			<ul className="navbar-nav ml-auto">
				<li className="nav-item dropdown">
					<button className="nav-link custom-avatar-button" onClick={this.showProfileMenu}>
						<span className="font-weight-light">{currentUserProfile.firstName}</span>
						<img className="custom-avatar" src={avatarSrc} alt="avatar"/>
						<i className="fa fa-angle-down custom-arrow-down"/>
						<div className="custom-mask"/>
					</button>
					{this.state.displayProfileMenu ? (
						<div className="dropdown-menu dropdown-menu-right show">
							<span className="d-block pt-2 pb-1 px-4 font-weight-bold text-muted custom-font-size">
								{currentUserProfile.firstName}&nbsp;{currentUserProfile.lastName}
							</span>
							<span className="d-block pb-2 px-4 text-muted">{user.username}</span>
							<div className="dropdown-divider"/>
							<Link className="dropdown-item text-muted" to={`/profiles/${user.id}`}>
								<i className="fas fa-user mr-3"/>My profile
							</Link>
							<span className="dropdown-item text-muted custom-cursor-pointer" onClick={this.logout.bind(this)}>
								<i className="fas fa-sign-out-alt mr-3"/>Logout
							</span>
						</div>) : (null)}
				</li>
			</ul>
		);
		const userIsNotAuthenticated = (
			<ul className="navbar-nav ml-auto">
				<li className="nav-item">
					<Link className="nav-link" to="/register">Register</Link>
				</li>
				<li className="nav-item">
					<Link className="nav-link pr-0" to="/login">Login</Link>
				</li>
			</ul>
		);

		return (
			<nav className="navbar fixed-top navbar-expand navbar-dark bg-primary ">
				<div className="container font-weight-light">
					<Link to="/" className="navbar-brand">Post App</Link>
					<div className="collapse navbar-collapse">
						<ul className="navbar-nav ">
							<li className="nav-item">
								<Link to="/posts" className="nav-link">Postboard</Link>
							</li>
							{(validToken && user) &&
							<li className="nav-item">
								<Link to="/posts/create" className="nav-link">New post</Link>
							</li>
							}
							{(validToken && user && settingsVisible) &&
							<li className="nav-item dropdown">
								<Link className="nav-link " to="/" onClick={this.showDropdownMenu}>Settings<i className="pl-1 fa fa-angle-down"/></Link>
								{this.state.displayMenu ? (
									<div className="dropdown-menu show">
										{currentPermissions.includes('ROLE_ROLE_READ') &&
											<Link className="dropdown-item text-muted" to="/roles">Roles</Link>
										}
										{currentPermissions.includes('ROLE_USER_PROFILE_READ') &&
											<Link className="dropdown-item text-muted" to="/users">Users</Link>
										}
									</div>): (null)}
							</li>
							}
							<li className="nav-item">
								<input type="text"
								       className="form-control custom-search-in-header mx-2"
								       placeholder="Search"
								       name="search" value={search}
								       onChange={this.onChange.bind(this)}
								       onKeyDown={this.handle.bind(this)}/>
							</li>
						</ul>
						{validToken && user ? userIsAuthenticated : userIsNotAuthenticated}
					</div>
				</div>
			</nav>
		);
	}
}

Header.propTypes = {
	logout: PropTypes.func.isRequired,
	getCurrentUserAvatar: PropTypes.func.isRequired,
	getCurrentUserProfile: PropTypes.func.isRequired,
	getCurrentPermissions: PropTypes.func.isRequired,
	getPosts: PropTypes.func.isRequired,
	security: PropTypes.object.isRequired,
	currentUser: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	security: state.security,
	currentUser: state.currentUser
});

export default connect(
	mapStateToProps,
	{ logout, getCurrentUserAvatar, getCurrentUserProfile, getCurrentPermissions, getPosts}
)(Header);
