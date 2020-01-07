import React, {Component} from 'react';
import {
	getPost,
	createPost,
	updatePost,
	deletePostImage,
	updateImages,
	updateVideo,
	deletePostVideo
} from "../../actions/postsActions";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import classnames from "classnames";
import Preloader from "../utils/Preloader";
import Modal from "../utils/Modal";
import Video from "../utils/Video";
import ProgressBar from "../utils/ProgressBar";
import { BASE_URL } from "../../actions/types";

class PostUpdate extends Component {

	state = {
		id: "",
		title: "",
		text: "",
		errors: {},
		imagesFiles: [],
		videoFiles: [],
		images: [],
		video: null,
		showImagesModal: false,
		showVideoModal: false,
		loading: false,
		uploadProgress: 0,
		userId: null
	};

	componentDidMount() {
		const {id} = this.props.match.params;
		this.props.getPost(id, this.props.history);
	}

	componentWillReceiveProps(nextProps) {
		const {id, title, text, images, video, userId} = nextProps.post;
		const {uploadProgress} = nextProps;
		const {user, currentPermissions} = this.props.security;
		if (userId && userId !== Number(user.id) && !currentPermissions.includes("ROLE_POST_EDIT"))
			this.props.history.push(`/error`);
		this.setState({errors: nextProps.errors, id, title, text, images, video, uploadProgress, userId});
	}

	onChange(e) {
		this.setState({[e.target.name]: e.target.value});
	}

	onSubmit(e) {
		e.preventDefault();
		const updatedPost = {
			title: this.state.title,
			text: this.state.text
		};
		this.props.updatePost(this.state.id, updatedPost, this.props.history);
	}

	imagesSelectHandle = event => {
		if (Array.from(event.target.files).length > 0) {
			this.setState({
				imagesFiles: Array.from(event.target.files),
				showImagesModal: true
			});
		}
	};

	videoSelectHandle = event => {
		if (Array.from(event.target.files).length > 0) {
			this.setState({
				videoFiles: Array.from(event.target.files),
				showVideoModal: true
			});
		}
	};

	imagesModalHandle = () => {
		this.setState({imagesFiles: [], showImagesModal: !this.state.showImagesModal});
	};

	videoModalHandle = () => {
		this.setState({videoFiles: [], showVideoModal: !this.state.showVideoModal});
	};

	imagesUploadHandle = () => {
		this.setState({loading: true});
		const fd = new FormData();
		this.state.imagesFiles.map(file => (fd.append('images', file)));
		this.props.updateImages(this.state.id, fd, this.props.history).then(() => {
			this.setState({loading: false})
		});
		this.imagesModalHandle();
	};

	videoUploadHandle = () => {
		this.setState({loading: true});
		const fd = new FormData();
		this.state.videoFiles.map(file => (fd.append('video', file)));
		this.props.updateVideo(this.state.id, fd, this.props.history).then(() => {
			this.setState({loading: false})
		});
		this.videoModalHandle();
	};

	deleteImageHandle = id => {
		this.props.deletePostImage(id);
	};

	deleteVideoHandle = id => {
		this.props.deletePostVideo(id);
	};

	render() {
		const {errors, images, imagesFiles, showImagesModal, video, videoFiles, showVideoModal, loading, uploadProgress, userId} = this.state;
		const {user, currentPermissions} = this.props.security;
		const uploadVideoButtonDisabled = video
			? (video.userId !== Number(user.id) && !currentPermissions.includes("ROLE_VIDEO_DELETE"))
			: (userId !== Number(user.id) && !currentPermissions.includes("ROLE_VIDEO_EDIT"));
		const uploadImagesButtonDisabled = userId !== Number(user.id) && !currentPermissions.includes("ROLE_IMAGE_EDIT");

		return (
			<main>
				<div className="container-fluid custom-div-height">

					<Modal showModal={showImagesModal}
					       title={`Selected images (${imagesFiles.length})`}
					       text={imagesFiles.map((file, index) => (<p key={index}>{file.name}</p>))}
					       closeAction={this.imagesModalHandle}
					       submitAction={this.imagesUploadHandle}/>

					<Modal showModal={showVideoModal}
					       title={`Selected video`}
					       text={videoFiles.map((file, index) => (<p key={index}>{file.name}</p>))}
					       closeAction={this.videoModalHandle}
					       submitAction={this.videoUploadHandle}/>

					<Preloader loading={loading}/>

					<div className="container custom-div-height pb-5">
						<div className="row">
							<div className="col-12">
								<h1 className="text-center font-weight-light my-4">Update Post</h1>
								<hr className="mb-4"/>
							</div>
							<div className="col-9 mx-auto mb-5">
								<div className="card card-body p-5">
									<input type="text" className={classnames("form-control form-control-lg", {"is-invalid": errors.title})}
									       placeholder="Post title" name="title" value={this.state.title || ""}
									       onChange={this.onChange.bind(this)}/>
									{errors.title && (<div className="invalid-feedback">{errors.title}</div>)}

	                <textarea className={classnames("form-control form-control-lg pb-2 pt-4", {"is-invalid": errors.text})}
	                          placeholder="Post text" name="text" value={this.state.text || ""}
	                          onChange={this.onChange.bind(this)}/>
									{errors.text && (<div className="invalid-feedback">{errors.text}</div>)}

									<input className="d-none" type="file" accept="video/mp4" onChange={this.videoSelectHandle}
									       ref={videoInput => this.videoInput = videoInput}/>
									<div className="mt-3">
										<button type="button" className="btn btn-secondary text-muted mt-4" disabled={uploadVideoButtonDisabled}
										        onClick={() => this.videoInput.click()}>Upload Video</button>
										{uploadProgress ? <div className="mt-4"><ProgressBar percentage={uploadProgress}/></div> : null}
									</div>

									{video &&
										<div className="pb-3">
											<div className="card mt-4">
												<div className="card-header">
													{video.fileName}
													<button type="button" className="close text-danger"
													        disabled={video.userId !== Number(user.id) && !currentPermissions.includes("ROLE_VIDEO_DELETE")}
													        onClick={this.deleteVideoHandle.bind(this, video.id)}>&times;</button>
												</div>
												<Video url={`${BASE_URL}/videos/${video.uuid}`}/>
											</div>
										</div>
									}

									<input className="d-none" type="file" multiple accept="image/jpeg,image/png"
									       onChange={this.imagesSelectHandle} ref={imagesInput => this.imagesInput = imagesInput}/>
									<div className="mt-2">
										<button type="button" className="btn btn-secondary text-muted mt-3" disabled={uploadImagesButtonDisabled}
										        onClick={() => this.imagesInput.click()}>Upload Images</button>
									</div>

									{images && images.length > 0 &&
										<div>
											<div className="container mt-4">
												<div className="row">
													{images.map((image, index) => (
														<div key={index} className="col-md-4 pb-3 px-1">
															<div className="card">
																<div className="card-header">
																	{image.fileName}
																	<button type="button" className="close text-danger"
																	        disabled={image.userId !== Number(user.id) && !currentPermissions.includes("ROLE_IMAGE_DELETE")}
																	        onClick={this.deleteImageHandle.bind(this, image.id)}>
																		&times;
																	</button>
																</div>
																<img className="card-img" src={`data:image/jpeg;base64,${image.thumbnail}`} alt=""/>
															</div>
														</div>
													))}
												</div>
											</div>
											<hr/>
										</div>
									}

									<div className="mt-2">
										<button className="btn btn-primary mt-3" onClick={this.onSubmit.bind(this)}>Update post</button>
									</div>
								</div>
							</div>
						</div>
					</div>


				</div>
			</main>
		);
	}
}

PostUpdate.propTypes = {
	getPost: PropTypes.func.isRequired,
	createPost: PropTypes.func.isRequired,
	updatePost: PropTypes.func.isRequired,
	updateImages: PropTypes.func.isRequired,
	deletePostImage: PropTypes.func.isRequired,
	updateVideo: PropTypes.func.isRequired,
	deletePostVideo: PropTypes.func.isRequired,
	post: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	post: state.posts.post,
	uploadProgress: state.posts.uploadVideoProgress,
	errors: state.errors,
	security: state.security,
});

export default connect(
	mapStateToProps,
	{getPost, createPost, updatePost, updateImages, deletePostImage, updateVideo, deletePostVideo}
)(PostUpdate);