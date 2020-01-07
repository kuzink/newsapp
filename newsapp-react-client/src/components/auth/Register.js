import React, {Component} from "react";
import {register, isUsernameAvailable} from "../../actions/authActions";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import classnames from "classnames";

class Register extends Component {

	state = {
		firstName: "",
		lastName: "",
		username: "",
		password: "",
		confirmPassword: "",
		errors: {
			firstName: "",
			lastName: "",
			username: "",
			password: "",
			confirmPassword: ""
		},
		firstNameValid: false,
		lastNameValid: false,
		usernameValid: false,
		passwordValid: false,
		confirmPasswordValid: false,
		formValid: false,
		usernameAvailable: true
	};

	componentDidMount() {
		if (this.props.security.validToken)
			this.props.history.push("/");
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.errors)
			this.setState({errors: nextProps.errors});

		if (nextProps.security)
			this.setState({usernameAvailable: nextProps.security.isUsernameAvailable,});
	}

	onSubmit(e) {
		e.preventDefault();
		const newUser = {
			firstName: this.state.firstName,
			lastName: this.state.lastName,
			username: this.state.username,
			password: this.state.password,
			confirmPassword: this.state.confirmPassword
		};
		this.props.register(newUser, this.props.history);
	}

	onChange(e) {
		const name = e.target.name;
		const value = e.target.value;
		this.setState({[name]: value}, () => {this.validateField(name, value)});
	}

	//validation functions
	validateField = (name, value) => {
		let errors = this.state.errors;
		let firstNameValid = this.state.firstNameValid;
		let lastNameValid = this.state.lastNameValid;
		let usernameValid = this.state.usernameValid;
		let passwordValid = this.state.passwordValid;
		let confirmPasswordValid = this.state.confirmPasswordValid;
		let usernameAvailable = this.state.usernameAvailable;
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
			case "username":
				if (!value) {
					errors.username = "Username is required";
					usernameValid = false;
					usernameAvailable = true;
				} else if (!value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
					errors.username = "Username needs to be an email";
					usernameValid = false;
					usernameAvailable = true;
				} else {
					errors.username = "";
					usernameValid = true;
				}
				break;
			case "password":
				if (!value) {
					errors.password = "Password is required";
					passwordValid = false;
				} else if (value.length < 6) {
					errors.password = "Password must be at least 6 characters";
					passwordValid = false;
				} else if (!(value === this.state.confirmPassword)) {
					errors.confirmPassword = "Password must match";
					errors.password = "";
					passwordValid = true;
					confirmPasswordValid = false;
				} else {
					errors.password = "";
					passwordValid = true;
					errors.confirmPassword = "";
					confirmPasswordValid = true;
				}
				break;
			case "confirmPassword":
				if (!value) {
					errors.confirmPassword = "ConfirmPassword is required";
					confirmPasswordValid = false;
				} else if (!(value === this.state.password)) {
					errors.confirmPassword = "Password must match";
					confirmPasswordValid = false;
				} else {
					errors.confirmPassword = "";
					confirmPasswordValid = true;
				}
				break;
			default:
				break;
		}
		this.setState({
			errors: errors,
			firstNameValid: firstNameValid,
			lastNameValid: lastNameValid,
			usernameValid: usernameValid,
			passwordValid: passwordValid,
			confirmPasswordValid: confirmPasswordValid,
			usernameAvailable: usernameAvailable
		}, this.validateForm);
	};

	validateForm() {
		this.setState({
			formValid: this.state.firstNameValid &&
								 this.state.lastNameValid &&
								 this.state.usernameValid &&
			           this.state.passwordValid &&
								 this.state.confirmPasswordValid});
	}

	validateUsernameAvailability() {
		if (this.state.usernameValid)
			this.props.isUsernameAvailable(this.state.username);
	}

	render() {
		const {errors, firstNameValid, lastNameValid, usernameValid, passwordValid, confirmPasswordValid, usernameAvailable, username} = this.state;
		return (
			<div className="container">
				<div className="row">
					<div className="col-md-5 mx-auto my-5 p-5 bg-light rounded shadow">

						<h1 className="text-center font-weight-light mb-2">Register</h1>
						<h3 className="text-center font-weight-light mb-2">Create your Account</h3>
						<form onSubmit={this.onSubmit.bind(this)}>
							<div className="form-group">
								<input type="text"
								       className={classnames("form-control form-control-lg", {"is-invalid": errors.firstName}, {"is-valid": firstNameValid})}
								       placeholder="First name"
								       name="firstName"
								       value={this.state.firstName}
								       onChange={this.onChange.bind(this)}/>
								{errors.firstName && (<div className="invalid-feedback">{errors.firstName}</div>)}
							</div>
							<div className="form-group">
								<input type="text"
								       className={classnames("form-control form-control-lg", {"is-invalid": errors.lastName}, {"is-valid": lastNameValid})}
								       placeholder="Last name"
								       name="lastName"
								       value={this.state.lastName}
								       onChange={this.onChange.bind(this)}/>
								{errors.lastName && (<div className="invalid-feedback">{errors.lastName}</div>)}
							</div>
							<div className="form-group">
								<input type="text"
								       className={classnames("form-control form-control-lg", {"is-invalid": errors.username || !usernameAvailable}, {"is-valid": usernameValid && usernameAvailable})}
								       placeholder="Username"
								       name="username"
								       value={this.state.username}
								       onBlur={this.validateUsernameAvailability.bind(this)}
								       onChange={this.onChange.bind(this)}/>
								{errors.username && (<div className="invalid-feedback">{errors.username}</div>)}
								{!usernameAvailable && (<div className="invalid-feedback">Username '{username}' already exists</div>)}
							</div>
							<div className="form-group">
								<input type="password"
								       className={classnames("form-control form-control-lg", {"is-invalid": errors.password}, {"is-valid": passwordValid})}
								       placeholder="Password"
								       name="password"
								       value={this.state.password}
								       onChange={this.onChange.bind(this)}/>
								{errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
							</div>
							<div className="form-group">
								<input type="password"
								       className={classnames("form-control form-control-lg", {"is-invalid": errors.confirmPassword}, {"is-valid": confirmPasswordValid})}
								       placeholder="Confirm Password"
								       name="confirmPassword"
								       value={this.state.confirmPassword}
								       onChange={this.onChange.bind(this)}/>
								{errors.confirmPassword && (<div className="invalid-feedback">{errors.confirmPassword}</div>)}
							</div>
							<button type="submit" className="btn btn-primary btn-block mt-5" disabled={!this.state.formValid || !usernameAvailable}>Submit</button>
						</form>

					</div>
				</div>
			</div>
		);
	}
}

Register.propTypes = {
	register: PropTypes.func.isRequired,
	isUsernameAvailable: PropTypes.func.isRequired,
	errors: PropTypes.object.isRequired,
	security: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	security: state.security,
	errors: state.errors
});

export default connect(
	mapStateToProps,
	{register, isUsernameAvailable}
)(Register);