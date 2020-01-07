import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import classnames from "classnames";
import {createComment} from "../../actions/commentActions";
import defaultAvatar from "../../images/avatars/defaultAvatar.png";

class CommentCreate extends Component {

	state = {
		text: "",
		errors: {},
		nameValid: false,
	};

	componentWillReceiveProps(nextProps) {
		this.setState({errors: nextProps.errors});
		if (JSON.stringify(nextProps.errors) === "{}")
			this.setState({text: ""});
	}

	onChange(e) {
		const name = e.target.name;
		const value = e.target.value;
		this.setState({[name]: value}, () => {
			this.validateField(name, value)
		});
	}

	validateField = (name, value) => {
		let nameValid = this.state.nameValid;
		switch (name) {
			case "text":
				nameValid = value;
				break;
			default:
				break;
		}
		this.setState({nameValid: nameValid});
	};

	onSubmit(e) {
		e.preventDefault();
		const comment = {
			text: this.state.text
		};
		this.props.createComment(this.props.id, comment);
		this.setState({nameValid: false});
	}

	render() {
		const {errors} = this.state;
		const {currentUserAvatar, currentUserProfile} = this.props.currentUser;
		const avatarSrc = currentUserAvatar ? `data:image/jpeg;base64,${currentUserAvatar}` : defaultAvatar;
		return (
			<div className="col-9 mx-auto mb-5">
				<div className="card">
					<h2 className="my-4 ml-5 pt-3">Leave a comment:</h2>
					<hr className="my-0 mb-4 pb-2"/>
					<div className="mx-5 pb-5 pt-3 d-flex">
						<img className="custom-avatar-comment mr-5" src={avatarSrc} alt=""/>
						<div className="media-body">
							<h5 className="d-inline-block mt-1 mb-2">{currentUserProfile.firstName} {currentUserProfile.lastName}</h5>
							<form onSubmit={this.onSubmit.bind(this)}>
								<div className="d-flex">
									<textarea className={classnames("form-control custom-addcomment-textarea", {"is-invalid": errors.text})}
									          placeholder="Enter comment"
									          name="text"
									          value={this.state.text}
									          onChange={this.onChange.bind(this)}/>
									{errors.text && (<div className="invalid-feedback">{errors.text}</div>)}
									<button type="submit" className="btn btn-primary w-25 ml-4" disabled={!this.state.nameValid}>Submit</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

CommentCreate.propTypes = {
	createComment: PropTypes.func.isRequired,
	errors: PropTypes.object.isRequired,
	currentUser: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	errors: state.errors,
	currentUser: state.currentUser
});

export default connect(mapStateToProps, {createComment})(CommentCreate);
