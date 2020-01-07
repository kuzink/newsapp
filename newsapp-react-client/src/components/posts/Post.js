import React, {Component} from 'react';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {deletePost} from "../../actions/postsActions";
import Modal from "../utils/Modal";
import ImageSlider from "../utils/ImageSlider";

class Post extends Component {

	state = {
		showModal: false
	};

	modalHandle = () => {
		this.setState({showModal: !this.state.showModal});
	};

	deletePostHandle = id => {
		this.props.deletePost(id);
	};

	render() {
		const {post} = this.props;
		const {showModal} = this.state;
		const {validToken, user, currentPermissions} = this.props.security;
		const updateButtonVisible = post.userId === Number(user.id) ? true : currentPermissions.includes("ROLE_POST_EDIT");
		const deleteButtonVisible = post.userId === Number(user.id) ? true : currentPermissions.includes("ROLE_POST_DELETE");

		return (
			<div className="col-md-4 mb-5">
				<Modal showModal={showModal}
				       title="Warning"
				       text={<p>Are you sure? This will delete post and all the data related to it.</p>}
				       closeAction={this.modalHandle}
				       submitAction={this.deletePostHandle.bind(this, post.id)}/>

				<div className="card custom-card-hover">
					{/*<Link to={`/posts/${post.id}/view`}><ImageSlider images={post.images}/></Link>*/}
					<ImageSlider images={post.images}/>
					<div className="card-body">
						<h4 className="card-title mb-3 ">{post.title}</h4>
						{/*<hr/>*/}
						<p className="card-text text-justify mb-0 custom-font-size ">{post.text.slice(0, 96).replace(/.$/, '...')}</p>
						<div className=" mt-2">
							<Link className="btn btn-primary mr-2 mt-2 py-2 custom-min-width" to={`/posts/${post.id}/view`}>View</Link>
							{(validToken && user && updateButtonVisible) &&
								<Link className="btn btn-info mr-2 mt-2 py-2 custom-min-width" to={`/posts/${post.id}/update`}>Update</Link>
							}
							{(validToken && user && deleteButtonVisible) &&
								<button className="btn btn-danger mt-2 py-2 custom-min-width" onClick={this.modalHandle}>Delete</button>
							}
						</div>
					</div>
					<div className="card-footer text-muted">
						<i className="fas fa-user mr-2"/>{post.userFullName}{/*<strong>{post.userFullName}</strong>*/}
						<span className="ml-3">
							<i className="far fa-calendar-alt mr-2"/>{post.createdAt.slice(0, 10)}
						</span>
						<span className="float-right">
							<i className="far fa-comments mr-2"/>{post.commentsCount}
						</span>
					</div>
				</div>

			</div>
		);
	}
}

Post.propTypes = {
	deletePost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	security: state.security,
});

export default connect(mapStateToProps, {deletePost})(Post);
