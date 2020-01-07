import React, {Component} from 'react';

class Modal extends Component {

	close = () => {
		this.props.closeAction()
	};

	submit = () => {
		this.props.submitAction()
	};

	render() {
		const {showModal, title, text} = this.props;
		return (
			<div className={`modal overflow-auto ${showModal === true ? 'd-block' : ''}`}>
				<div className="custom-modal-wrapper"/>
				<div className="modal-dialog modal-dialog-centered">
					<div className="modal-content">
						<div className="modal-header">
							<h4 className="modal-title font-weight-normal">{title}</h4>
							<button className="close" onClick={this.close}><span aria-hidden="true">&times;</span></button>
						</div>
						<div className="modal-body pb-0 custom-modal font-weight-normal custom-letter-spacing">{text}</div>
						<div className="modal-footer">
							<button className="btn btn-secondary" onClick={this.close}>Close</button>
							<button className="btn btn-primary" onClick={this.submit}>Submit</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Modal;