import React, {Component} from 'react';

class Video extends Component {
	render() {
		const {url} = this.props;
		return (
			<video className="d-block" controls loop key={url}>
				<source src={url}/>
			</video>
		);
	}
}

export default Video;