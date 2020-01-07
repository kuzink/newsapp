import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import classnames from "classnames";
import {login} from "../../actions/authActions";

class Login extends Component {

	state = {
		username: "",
		password: "",
		errors: {
			username: "",
			password: ""
		},
		usernameValid: false,
		passwordValid: false,
		formValid: false
	};

	componentDidMount() {
		if (this.props.security.validToken)
			this.props.history.push("/");
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.security.validToken)
			this.props.history.push("/");

		if (Object.keys(nextProps.errors).length !== 0)
			this.setState({errors: {username: "Invalid username", password: "Invalid username"}});
	}

	onSubmit(e) {
		e.preventDefault();
		const LoginRequest = {
			username: this.state.username,
			password: this.state.password
		};
		this.props.login(LoginRequest);
	}

	onChange(e) {
		const name = e.target.name;
		const value = e.target.value;
		this.setState({[name]: value}, () => {this.validateField(name, value)});
	}

	validateField = (name, value) => {
		let errors = this.state.errors;
		let usernameValid = this.state.usernameValid;
		let passwordValid = this.state.passwordValid;
		switch (name) {
			case "username":
				if (!value) {
					errors.username = "Username is required";
					usernameValid = false;
				} else if (!value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
					errors.username = "Username needs to be an email";
					usernameValid = false;
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
				} else {
					errors.password = "";
					passwordValid = true;
				}
				break;
			default:
				break;
		}
		this.setState({
			errors: errors,
			usernameValid: usernameValid,
			passwordValid: passwordValid
		}, this.validateForm);
	};

	validateForm() {
		this.setState({formValid: this.state.usernameValid && this.state.passwordValid});
	}

	render() {
		const {errors} = this.state;
		return (
			<div className="container">
				<div className="row">

					<div className="col-md-5 mx-auto my-5 p-5 bg-light rounded shadow">
						<h1 className="text-center font-weight-light mb-4">Login</h1>
						<form onSubmit={this.onSubmit.bind(this)}>
							<div className="form-group">
								<input type="text"
								       className={classnames("form-control form-control-lg", {"is-invalid": errors.username})}
								       placeholder="Username"
								       name="username"
								       value={this.state.username}
								       onChange={this.onChange.bind(this)}/>
								{errors.username && (<div className="invalid-feedback">{errors.username}</div>)}
							</div>
							<div className="form-group">
								<input type="password"
								       className={classnames("form-control form-control-lg", {"is-invalid": errors.password})}
								       placeholder="Password"
								       name="password"
								       value={this.state.password}
								       onChange={this.onChange.bind(this)}/>
								{errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
							</div>
							<button type="submit" className="btn btn-success btn-block mt-5" disabled={!this.state.formValid}>Submit</button>
						</form>
					</div>

				</div>
			</div>
		);
	}
}

Login.propTypes = {
	login: PropTypes.func.isRequired,
	errors: PropTypes.object.isRequired,
	security: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	security: state.security,
	errors: state.errors
});

export default connect(
	mapStateToProps,
	{login}
)(Login);

