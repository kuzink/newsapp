import React, {Component} from 'react';

class ProgressBar extends Component {
	render() {
		const {percentage} = this.props;
		return (
			<div className="progress h-auto rounded">
				<div className="progress-bar progress-bar-striped bg-primary" style={{width: `${percentage}%`}}>
					<p className="my-0">{percentage}%</p>
				</div>
			</div>
		);
	}
}

export default ProgressBar;