import React, {Component} from 'react';
import {Link} from "react-router-dom";

class Page404 extends Component {
	render() {
		return (
			<div className="container">
				<div className="row">
					<div className="col-md-6 mx-auto my-5 p-5 bg-light rounded shadow text-center">
						<h1 className="text-center font-weight-light">Not found</h1>
						<p className="display-2 my-0 text-muted">404</p>
						<h4 className="font-weight-light">This page does not exist or is temporarily unavailable.</h4>
						<Link className="btn btn-lg bg-primary text-light mt-4" to="/">Back to home page</Link>
					</div>
				</div>
			</div>
		);
	}
}

export default Page404;