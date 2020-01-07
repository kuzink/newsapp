import React, {Component} from 'react';

class Preloader extends Component {
	render() {
		const {loading} = this.props;
		return (
			<div>
				{loading &&
					<div className="custom-preloader">
						<div className="spinner-border text-primary">
							<span className="sr-only">Loading...</span>
						</div>
					</div>
				}
			</div>

		);
	}
}

export default Preloader;