import React, {Component} from 'react';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import defaultAvatar from "../../images/avatars/defaultAvatar.png";
import {getAllRoles} from "../../actions/rolesActions";
import {
	getCurrentUserAvatar, uploadCurrentUserAvatar, deleteCurrentUserAvatar,
	getCurrentUserProfile, updateCurrentUserProfile,
	getCurrentUserRoles, setRolesToCurrentUser
} from "../../actions/currentUserActions";
import {
	getUserAvatar, uploadUserAvatar, deleteUserAvatar,
	getUserProfile, updateUserProfile,
	getUserRoles, setRolesToUser
} from "../../actions/userProfileActions";
import classnames from "classnames";
import Select from 'react-select';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class UserProfile extends Component {

	state = {
		currentlyLoggedUserId: null,
		profileId: null,
		isOwnProfile: false,

		firstName: "",
		lastName: "",
		birthDate: null,
		selectedSex: null,
		country: "",
		city: "",
		aboutMe: "",

		errors: {
			firstName: "",
			lastName: ""
		},
		firstNameValid: true,
		lastNameValid: true,
		formValid: true,

		avatarFile: [],
		selectedRoles: [],

		userRoles: [],
	};

	componentDidMount() {
		const currentlyLoggedUserId = this.props.security.user.id;
		const profileId = this.props.match.params.id;
		const isOwnProfile = currentlyLoggedUserId === profileId;
		this.setState({currentlyLoggedUserId, profileId, isOwnProfile});

		this.props.getUserProfile(profileId, this.props.history);
		this.props.getUserAvatar(profileId);

		const {currentPermissions} = this.props.security;
		if (currentPermissions.includes("ROLE_ROLE_READ") && currentPermissions.includes("ROLE_USER_ROLE_EDIT")) {
			// console.log("getUserRoles, getAllRoles");
			this.props.getUserRoles(profileId);
			this.props.getAllRoles(this.props.history);
		}
	}

	componentWillReceiveProps(nextProps) {
		const profileId = this.props.match.params.id;
		const {currentPermissions} = this.props.security;
		const nextPermissions = nextProps.security.currentPermissions;
		if (nextPermissions !== currentPermissions && nextPermissions.includes("ROLE_ROLE_READ") && nextPermissions.includes("ROLE_USER_ROLE_EDIT")) {
			// console.log("getUserRoles, getAllRoles");
			this.props.getUserRoles(profileId);
			this.props.getAllRoles(this.props.history);
		}

		const {userProfile, userRoles} = nextProps.profile;
		const {errors} = nextProps;
		const {firstName, lastName, birthDate, sex, country, city, aboutMe} = userProfile;

		this.setState({
			errors,

			firstName,
			lastName,
			birthDate: birthDate ? new Date(birthDate) : null,
			selectedSex: sex ? {label: `${sex.charAt(0) + sex.slice(1).toLowerCase()}`, value: `${sex}`} : null,
			country,
			city,
			aboutMe,

			userRoles
		});
	}

	avatarSelectHandle = event => {
		if (Array.from(event.target.files).length > 0) {
			this.setState({avatarFile: Array.from(event.target.files)}, () => {
				this.avatarUploadHandle();
			});
		}
	};

	avatarUploadHandle = () => {
		const fd = new FormData();
		fd.append('avatar', this.state.avatarFile[0]);
		if (this.state.isOwnProfile)
			this.props.uploadCurrentUserAvatar(this.state.currentlyLoggedUserId, fd);
		else
			this.props.uploadUserAvatar(this.state.profileId, fd)
	};

	deleteAvatarHandle = () => {
		if (this.state.isOwnProfile)
			this.props.deleteCurrentUserAvatar(this.state.currentlyLoggedUserId);
		else
			this.props.deleteUserAvatar(this.state.profileId);
	};

	onSubmit(e) {
		e.preventDefault();
		const updatedProfile = {
			firstName: this.state.firstName,
			lastName: this.state.lastName,
			birthDate: this.state.birthDate ? this.convertDateToServerFormat(this.state.birthDate) : null,
			sex: this.state.selectedSex ? this.state.selectedSex.value : null,
			country: this.state.country,
			city: this.state.city,
			aboutMe: this.state.aboutMe
		};
		if (this.state.isOwnProfile)
			this.props.updateCurrentUserProfile(this.state.currentlyLoggedUserId, updatedProfile);
		else
			this.props.updateUserProfile(this.state.profileId, updatedProfile);
	}

	onChange(e) {
		const name = e.target.name;
		const value = e.target.value;
		this.setState({[name]: value}, () => {this.validateField(name, value)});
	}

	validateField = (name, value) => {
		let errors = this.state.errors;
		let firstNameValid = this.state.firstNameValid;
		let lastNameValid = this.state.lastNameValid;
		switch (name) {
			case "firstName":
				if (!value.match(/^(?=.{2,20}$)(([A-ZА-Я][a-zа-я]{1,19})([ -])?([A-ZА-Я]?[a-zа-я]{0,19}))[.]?$/)) {
					errors.firstName = "First name is required. First letter must be capital. Size must be between 2 and 20";
					firstNameValid = false;
				} else {
					errors.firstName = "";
					firstNameValid = true;
				}
				break;
			case "lastName":
				if (!value.match(/^(?=.{2,20}$)(([A-ZА-Я][a-zа-я]{1,19})([ -])?([A-ZА-Я]?[a-zа-я]{0,19}))[.]?$/)) {
					errors.lastName = "Last name is required. First letter must be capital. Size must be between 2 and 20";
					lastNameValid = false;
				} else {
					errors.lastName = "";
					lastNameValid = true;
				}
				break;
			default:
				break;
		}
		this.setState({
			errors: errors,
			firstNameValid: firstNameValid,
			lastNameValid: lastNameValid
		}, this.validateForm);
	};

	validateForm() {
		this.setState({formValid: this.state.firstNameValid && this.state.lastNameValid});
	}

	handleSelectRolesChange = selectedRoles => {
		this.setState({selectedRoles});
	};

	handleSelectSexChange = selectedSex => {
		this.setState({selectedSex: selectedSex});
	};

	setRolesToUser = () => {
		const {selectedRoles} = this.state;
		if (this.state.isOwnProfile)
			this.props.setRolesToCurrentUser(this.state.currentlyLoggedUserId, selectedRoles.map(x => x.value));
		else
			this.props.setRolesToUser(this.state.profileId, selectedRoles.map(x => x.value));
		this.setState({selectedRoles: []});
	};

	handleBirthDateChange = date => {
		this.setState({birthDate: date});
	};

	convertDateToServerFormat = date => {
		let d = new Date(date),
			month = '' + (d.getMonth() + 1),
			day = '' + d.getDate(),
			year = d.getFullYear();
		if (month.length < 2) month = '0' + month;
		if (day.length < 2) day = '0' + day;
		return [year, month, day].join('-');
	};

	render() {
		const {errors, userRoles, selectedRoles, selectedSex, isOwnProfile} = this.state;
		const {userAvatar} = this.props.profile;
		const {roles} = this.props.roles;
		const avatarSrc = userAvatar ? `data:image/jpeg;base64,${userAvatar}` : defaultAvatar;
		const optionsRoles = roles.map(role => ({label: `${role.name}`, value: `${role.id}`}));
		const optionsSex = [{label: `Male`, value: `MALE`}, {label: `Female`, value: `FEMALE`}];
		const {currentPermissions} = this.props.security;
		const uploadAvatarButtonDisabled = !isOwnProfile && !currentPermissions.includes("ROLE_AVATAR_EDIT");
		const deleteAvatarButtonDisabled = !isOwnProfile && !currentPermissions.includes("ROLE_AVATAR_DELETE");
		const updateProfileButtonDisabled = (!(currentPermissions.includes("ROLE_USER_PROFILE_READ")
				&& currentPermissions.includes("ROLE_USER_PROFILE_EDIT")) && !isOwnProfile) ? true : !this.state.formValid;
		const profileDetailsFieldsDisabled = (!(currentPermissions.includes("ROLE_USER_PROFILE_READ")
			&& currentPermissions.includes("ROLE_USER_PROFILE_EDIT")) && !isOwnProfile);

		return (
			<main>
				<div className="container custom-div-height pb-5">
					<div className="row">

						<div className="col-12">
							<h1 className="text-center font-weight-light my-4">User profile</h1>
							<hr className=""/>
						</div>

						<div className="col-4">
							<div className="card shadow">
								<div className="card-header bg-gradient-primary rounded-top custom-box-shadow py-3">
									<h5 className="mb-0 text-center text-light">Edit Photo</h5>
								</div>
								<div className="card-body text-center">
									<img className="mb-3 custom-avatar-profile" src={avatarSrc} alt="avatar"/>
									<p className="text-muted">Profile photo will be changed automatically</p>
									<div className="justify-content-center">
										<input className="d-none"
										       type="file"
										       accept="image/jpeg,image/png"
										       onChange={this.avatarSelectHandle} ref={avatarInput => this.avatarInput = avatarInput}/>
										<button type="button"
										        className="btn btn-info btn-sm mr-2"
										        disabled={uploadAvatarButtonDisabled}
										        onClick={() => this.avatarInput.click()}>
											Upload New Photo
										</button>
										<button type="button"
										        className="btn btn-danger btn-sm"
										        disabled={deleteAvatarButtonDisabled}
										        onClick={this.deleteAvatarHandle}>
											Delete
										</button>
									</div>
								</div>
							</div>

							{(currentPermissions.includes("ROLE_ROLE_READ") && currentPermissions.includes("ROLE_USER_ROLE_EDIT")) &&
								<div className="card shadow mt-4">
									<div className="card-header bg-gradient-primary rounded-top custom-box-shadow py-3">
										<h5 className="mb-0 text-center text-light">Edit Roles</h5>
									</div>
									<div className="card-body">
										{userRoles.length > 0 && <h5 className="font-weight-normal">Current roles:</h5>}
										{userRoles.map((role, index) => (
											<h5 key={index} className="text-muted font-weight-normal ml-3">- {role.name}</h5>
										))}
										{userRoles.length > 0 && <hr/>}
										<Select value={selectedRoles} onChange={this.handleSelectRolesChange} options={optionsRoles} isMulti={true}/>
										<div className="text-center mt-3">
											<button type="button" className="btn btn-info btn-sm" onClick={this.setRolesToUser}>Set roles</button>
										</div>
									</div>
								</div>
							}
						</div>

						<div className="col-8">
							<div className="card shadow h-100">
								<div className="card-header bg-gradient-primary rounded-top custom-box-shadow py-3">
									<h5 className="mb-0 text-center text-light">Edit Profile Details</h5>
								</div>
								<div className="card-body text-center">
									<form className="mt-3" onSubmit={this.onSubmit.bind(this)}>
										<div className="row">
											<div className="col-md-6">
												<div className="form-group text-left">
													<input type="text"
													       className={classnames("form-control form-control-lg", {"is-invalid": errors.firstName})}
													       name="firstName"
													       value={this.state.firstName || ""}
													       disabled={profileDetailsFieldsDisabled}
													       onChange={this.onChange.bind(this)}/>
													{errors.firstName && (<div className="invalid-feedback">{errors.firstName}</div>)}
													<label className="custom-color-bbb">First name</label>
												</div>
											</div>
											<div className="col-md-6">
												<div className="form-group text-left">
													<input type="text"
													       className={classnames("form-control form-control-lg", {"is-invalid": errors.lastName})}
													       name="lastName"
													       value={this.state.lastName || ""}
													       disabled={profileDetailsFieldsDisabled}
													       onChange={this.onChange.bind(this)}/>
													{errors.lastName && (<div className="invalid-feedback">{errors.lastName}</div>)}
													<label className="custom-color-bbb">Last name</label>
												</div>
											</div>
										</div>
										<div className="row">
											<div className="col-md-6">
												<div className="form-group text-left">
													<DatePicker dateFormat="dd/MM/yyyy"
													            className="custom-datepicker "
													            isClearable={!profileDetailsFieldsDisabled}
													            showYearDropdown
													            selected={this.state.birthDate}
													            onChange={this.handleBirthDateChange}
													            disabled={profileDetailsFieldsDisabled}/>
													<label className="custom-color-bbb">Date of birth</label>
												</div>
											</div>
											<div className="col-md-6">
												<div className="form-group text-left">
													<Select value={selectedSex}
													        onChange={this.handleSelectSexChange}
													        options={optionsSex}
													        placeholder=""
													        isDisabled={profileDetailsFieldsDisabled}
													        className="react-select-container custom-font-size-4"
													        classNamePrefix="react-select"/>
													<label className="custom-color-bbb">Sex</label>
												</div>
											</div>
										</div>
										<div className="row">
											<div className="col-md-6">
												<div className="form-group text-left">
													<input type="text"
													       className={classnames("form-control form-control-lg", {"is-invalid": errors.country})}
													       name="country"
													       value={this.state.country || ""}
													       disabled={profileDetailsFieldsDisabled}
													       onChange={this.onChange.bind(this)}/>
													{errors.country && (<div className="invalid-feedback">{errors.country}</div>)}
													<label className="custom-color-bbb">Country</label>
												</div>
											</div>
											<div className="col-md-6">
												<div className="form-group text-left">
													<input type="text"
													       className={classnames("form-control form-control-lg", {"is-invalid": errors.city})}
													       name="city"
													       value={this.state.city || ""}
													       disabled={profileDetailsFieldsDisabled}
													       onChange={this.onChange.bind(this)}/>
													{errors.city && (<div className="invalid-feedback">{errors.city}</div>)}
													<label className="custom-color-bbb">City</label>
												</div>
											</div>
										</div>
										<div className="row">
											<div className="col-md-12">
												<div className="form-group text-left">
												<textarea rows="1"
												          className={classnames("form-control form-control-lg", {"is-invalid": errors.aboutMe})}
												          name="aboutMe"
												          value={this.state.aboutMe || ""}
												          disabled={profileDetailsFieldsDisabled}
												          onChange={this.onChange.bind(this)}/>
													{errors.aboutMe && (<div className="invalid-feedback">{errors.aboutMe}</div>)}
													<label className="custom-color-bbb">About me</label>
												</div>
											</div>
										</div>
										<div className="row">
											<div className="col-md-12 text-center">
												<button type="submit" className="btn btn-info mt-2" disabled={updateProfileButtonDisabled}>Update profile</button>
											</div>
										</div>
									</form>
								</div>
							</div>
						</div>

					</div>
				</div>
			</main>
		);
	}
}

UserProfile.propTypes = {
	security: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
	currentUser: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired,

	getAllRoles: PropTypes.func.isRequired,

	getCurrentUserAvatar: PropTypes.func.isRequired,
	uploadCurrentUserAvatar: PropTypes.func.isRequired,
	deleteCurrentUserAvatar: PropTypes.func.isRequired,
	getCurrentUserProfile: PropTypes.func.isRequired,
	updateCurrentUserProfile: PropTypes.func.isRequired,
	getCurrentUserRoles: PropTypes.func.isRequired,
	setRolesToCurrentUser: PropTypes.func.isRequired,

	getUserAvatar: PropTypes.func.isRequired,
	uploadUserAvatar: PropTypes.func.isRequired,
	deleteUserAvatar: PropTypes.func.isRequired,
	getUserProfile: PropTypes.func.isRequired,
	updateUserProfile: PropTypes.func.isRequired,
	getUserRoles: PropTypes.func.isRequired,
	setRolesToUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	security: state.security,
	errors: state.errors,
	roles: state.roles,
	currentUser: state.currentUser,
	profile: state.profile
});

export default connect(
	mapStateToProps,
	{
		getAllRoles,

		getCurrentUserAvatar, uploadCurrentUserAvatar, deleteCurrentUserAvatar,
		getCurrentUserProfile, updateCurrentUserProfile,
		getCurrentUserRoles, setRolesToCurrentUser,

		getUserAvatar, uploadUserAvatar, deleteUserAvatar,
		getUserProfile, updateUserProfile,
		getUserRoles, setRolesToUser,
	}
)(UserProfile);
