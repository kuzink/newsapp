import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {getComments} from "../../actions/commentActions";
import {getPost} from "../../actions/postsActions";
import Pagination from "../utils/Pagination";
import Comment from "../comments/Comment";
import CommentCreate from "../comments/CommentCreate";
import Video from "../utils/Video";
import ImageLightbox from "../utils/ImageLightbox";
import DefaultImage from "../../images/defaultImage.png";
import {Link} from "react-router-dom";
import { BASE_URL } from "../../actions/types";

class PostView extends Component {

	state = {
		errors: {},
	};

	componentDidMount() {
		const {id} = this.props.match.params;
		this.props.getPost(id, this.props.history);
		this.props.getComments(id);
	}

	componentWillReceiveProps(nextProps) {
		this.setState({errors: nextProps.errors});
	}

	render() {
		const {errors} = this.state;
		const {id} = this.props.match.params;
		const {comments, page} = this.props.comments;
		const {post} = this.props.posts;
		const {validToken, user} = this.props.security;

		return (
			<main>
				<div className="container custom-div-height py-5">
					<div className="row">

						<div className="col-9 mx-auto mb-5">
							<div className="card card-body p-0">
								<div className="p-4 pt-5 px-5 custom-font-size">
									<p className="mb-1"><strong>Author:</strong> {post.userFullName}</p>
									<p className="custom-grey-text custom-font-size-6 mb-0"><i className="far fa-clock-o"/>
										{post.createdAt && post.createdAt.slice(0, 10) + " at " + post.createdAt.substring(11)}
									</p>
									<Link className="badge badge-info" to="/posts">Travel</Link>
								</div>
								<h1 className="mt-1 text-center">{post.title}</h1>
								<hr className="mb-4 pb-1 custom-border-top"/>
								{(post.images && post.images.length > 0)
									? <img src={`${BASE_URL}/images/${post.images[0].uuid}`} className="mx-5 mw-100 rounded" alt=""/>
									: <img src={DefaultImage} className="mx-5 mw-100 rounded" alt=""/>
								}
								<h5 className="mt-4 px-5 font-weight-bold">
									<i className="far fa-lg fa-newspaper mr-3"/><strong>{post.viewsCount}</strong> Views
								</h5>
								<p
									className="mx-4 px-5 mt-2 mb-4 custom-font-size-5 custom-letter-spacing text-justify ">{post.text}</p>
								{post.video &&
								<div className="mt-0">
									<hr className="mb-4"/>
									<div className="mx-5 mb-4 pb-1">
										<Video url={`${BASE_URL}/videos/${post.video.uuid}`}/>
									</div>
								</div>
								}
								{post.images && post.images.length > 0 &&
								<div className="mt-0">
									<hr className="mb-4"/>
									<div className="mx-5 mb-3 pb-1">
										<ImageLightbox images={post.images}/>
									</div>
								</div>
								}
								<hr/>
								<div className="mb-5 text-center">
									<h4 className="text-center font-weight-bold dark-grey-text mt-3 mb-3">
										<strong>Share this post:</strong>
									</h4>
									<a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"
									   className="btn custom-button-facebook mb-0"><i className="fab fa-facebook-f mr-2"/>Facebook
									</a>
									<a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
									   className="btn custom-button-twitter mb-0"><i className="fab fa-twitter mr-2"/>Twitter
									</a>
									<a href="https://plus.google.com" target="_blank" rel="noopener noreferrer"
									   className="btn custom-button-googleplus mb-0"><i className="fab fa-google-plus-g mr-2"/>Google +
									</a>
								</div>
							</div>
						</div>

						{(validToken && user) &&
							<CommentCreate id={id}/>
						}

						<div className="col-9 mx-auto">
							<div className="card">
								{errors.postNotFound
									? <div className="alert alert-danger text-center my-5">{errors.postNotFound}</div>
									: <div className="mb-5">
											<div className="row mt-4 pt-3">
												<div className="col-6">
													<h2 className="ml-5 mb-4 py-2">Comments <span className="custom-font-size-2">({page.totalElements})</span></h2>
												</div>
												<div className="col-6">
													<div className="mr-5 text-right">
														<Pagination page={page} getItems={this.props.getComments} id={id}/>
													</div>
												</div>
											</div>
											<hr className="my-0 mb-4 pb-2"/>
											<div className="mx-5">
												{comments.map(comment => (<Comment key={comment.id} comment={comment} post_id={id}/>))}
											</div>
										</div>
								}
							</div>
						</div>

					</div>
				</div>
			</main>
		);
	}
}

PostView.propTypes = {
	posts: PropTypes.object.isRequired,
	getPost: PropTypes.func.isRequired,
	comments: PropTypes.object.isRequired,
	getComments: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	posts: state.posts,
	comments: state.comments,
	errors: state.errors,
	security: state.security,
});

export default connect(mapStateToProps, {getComments, getPost})(PostView);
