import React, {Component} from "react";

import {updateComment, deleteComment} from "../../actions/commentActions";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import defaultAvatar from "../../images/avatars/defaultAvatar.png";

class Comment extends Component {

	state = {
		showModal: false,
		text: "",
		nameValid: true,
	};

	componentDidMount() {
		this.setState({text: this.props.comment.text});
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

	updateCommentModalHandle = () => {
		this.setState({showModal: !this.state.showModal, text: this.props.comment.text});
	};

	updateComment = () => {
		const updatedComment = {
			text: this.state.text
		};
		this.props.updateComment(this.props.post_id, this.props.comment.id, updatedComment);
		this.setState({showModal: !this.state.showModal});
	};

	onDeleteClick = (post_id, comment_id) => this.props.deleteComment(post_id, comment_id);

	render() {
		const {showModal} = this.state;
		const {comment, post_id} = this.props;
		const {validToken, user, currentPermissions} = this.props.security;
		const updateButtonVisible = comment.userId === Number(user.id) || currentPermissions.includes("ROLE_COMMENT_EDIT");
		const deleteButtonVisible = comment.userId === Number(user.id) || currentPermissions.includes("ROLE_COMMENT_DELETE");

		return (
			<div>

				{/*Modal for update comment (with one input)*/}
				<div className={`modal overflow-auto ${showModal === true ? 'd-block' : ''}`}>
					<div className="custom-modal-wrapper"/>
					<div className="modal-dialog modal-dialog-centered">
						<div className="modal-content">
							<div className="modal-header">
								<h4 className="modal-title font-weight-normal">Update comment</h4>
								<button className="close" onClick={this.updateCommentModalHandle}><span aria-hidden="true">&times;</span></button>
							</div>
							<div className="modal-body custom-modal font-weight-normal">
								<input type="text"
								       className="form-control form-control-lg"
								       placeholder="Edit comment..."
								       name="text"
								       value={this.state.text}
								       onChange={this.onChange.bind(this)}
								/>
							</div>
							<div className="modal-footer">
								<button className="btn btn-secondary" onClick={this.updateCommentModalHandle}>Close</button>
								<button className="btn btn-primary" disabled={!this.state.nameValid} onClick={this.updateComment}>Submit</button>
							</div>
						</div>
					</div>
				</div>

				<div className="pr-5 pb-5 pt-3 d-flex">
					{comment.userAvatar
						? <img className="custom-avatar-comment mr-5" src={`data:image/jpeg;base64,${comment.userAvatar}`} alt=""/>
						: <img className="custom-avatar-comment mr-5" src={defaultAvatar} alt=""/>
					}
					<div className="media-body">
						<div>
							<h5 className="d-inline-block mt-1 mb-2">
								{comment.userFullName}
								<span className="ml-2 custom-color-bbb font-weight-normal custom-font-size-3">
								{comment.createdAt && comment.createdAt.slice(0, 10) + ", " + comment.createdAt.substring(11)}
							</span>
							</h5>
						</div>
						<div className="custom-font-size text-justify">{comment.text}</div>
						{(validToken && user) &&
							<div className="mt-3">
								{updateButtonVisible &&
									<button className="btn btn-sm btn-info" onClick={this.updateCommentModalHandle}>
										<i className="fas fa-pen mr-1"/>Update
									</button>
								}
								{deleteButtonVisible &&
								<button className="btn btn-sm ml-1 btn-danger" onClick={this.onDeleteClick.bind(this, post_id, comment.id)}>
									<i className="fas fa-trash mr-1"/>Delete
								</button>
								}
							</div>
						}
					</div>
				</div>

			</div>
		);
	}
}

Comment.propTypes = {
	updateComment: PropTypes.func.isRequired,
	deleteComment: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	comments: state.comments,
	security: state.security,
});

export default connect(mapStateToProps, {updateComment, deleteComment})(Comment);