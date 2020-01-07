import React, {Component} from 'react';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {getPosts} from "../../actions/postsActions";
import Pagination from "../utils/Pagination";
import Preloader from "../utils/Preloader";
import Post from "../posts/Post";

class Posts extends Component {

	state = {
		loading: true
	};

	componentDidMount() {
		this.props.getPosts();
		this.setState({ loading: false})
	}

	render() {
		window.scrollTo(0, 0);
		const {posts, page} = this.props.posts;
		const {loading, search} = this.state;

		return (
			<main>
				<div className="container custom-div-height ">

					<Preloader loading={loading}/>

					<div className="row">
						<div className="col-12">
							<h1 className="text-center font-weight-light my-4">Posts</h1>
							<hr className="mb-4 pb-2"/>
						</div>
					</div>

					<div className="row">
						{posts.map(post => (<Post key={post.id} post={post}/>))}
					</div>

					<div className="row">
						<div className="col-12 pb-5 text-center">
							<Pagination page={page} getItems={this.props.getPosts} search={search}/>
						</div>
					</div>

				</div>
			</main>
		);
	}
}

Posts.propTypes = {
	posts: PropTypes.object.isRequired,
	getPosts: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	posts: state.posts,
	security: state.security,
});

export default connect(mapStateToProps, {getPosts})(Posts);