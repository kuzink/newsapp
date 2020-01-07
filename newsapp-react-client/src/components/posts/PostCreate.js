import React, {Component} from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {createPost} from "../../actions/postsActions";
import classnames from "classnames";

class PostCreate extends Component {

	state = {
		title: "",
		text: "",
		errors: {},
		files: []
	};

	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({errors: nextProps.errors});
		}
	}

	onChange(e) {
		this.setState({[e.target.name]: e.target.value});
	}

	onSubmit(e) {
		e.preventDefault();
		const fd = new FormData();
		this.state.files.map(file => (fd.append('images', file)));
		const post = {
			title: this.state.title,
			text: this.state.text
		};
		this.props.createPost(post, this.props.history, fd);
	}

	fileSelectHandle = event => {
		if (Array.from(event.target.files).length > 0) {
			this.setState({files: Array.from(event.target.files)});
		}
	};

	render() {
		const {errors, files} = this.state;
		return (
			<main>
				<div className="container custom-div-height pb-5">
					<div className="row">
						<div className="col-12">
							<h1 className="text-center font-weight-light my-4">Create Post</h1>
							<hr className="mb-4"/>
						</div>
						<div className="col-9 mx-auto mb-5">
							<div className="card card-body p-5">
								<input type="text"
								       className={classnames("form-control form-control-lg ", {"is-invalid": errors.title})}
								       placeholder="Post title"
								       name="title"
								       value={this.state.title}
								       onChange={this.onChange.bind(this)}/>
								{errors.title && (<div className="invalid-feedback">{errors.title}</div>)}

                <textarea rows="1"
                          className={classnames("form-control form-control-lg pb-2 pt-4", {"is-invalid": errors.text})}
                          placeholder="Post text"
                          name="text"
                          value={this.state.text}
                          onChange={this.onChange.bind(this)}/>
								{errors.text && (<div className="invalid-feedback">{errors.text}</div>)}

								<input className="d-none"
								       type="file"
								       multiple
								       accept="image/jpeg,image/png"
								       onChange={this.fileSelectHandle}
								       ref={fileInput => this.fileInput = fileInput}/>
								<div className="mt-3 mb-2">
									<button className="btn btn-secondary text-muted mt-4" onClick={() => this.fileInput.click()}>Upload Images</button>
									{files.map((file, index) => (<p className="pl-3 pt-3 mb-0" key={index}>{file.name}</p>))}
								</div>

								<div>
									<button className="btn btn-primary mt-3" onClick={this.onSubmit.bind(this)}>Create post</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>
		);
	}
}

PostCreate.propTypes = {
	createPost: PropTypes.func.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	errors: state.errors
});

export default connect(mapStateToProps, {createPost})(PostCreate);