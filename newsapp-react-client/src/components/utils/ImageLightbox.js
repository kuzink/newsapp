import React, {Component} from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { BASE_URL } from "../../actions/types";

class ImageLightbox extends Component {

	state = {
		photoIndex: 0,
		isOpen: false,
	};

	render() {
		const {photoIndex, isOpen} = this.state;
		const {images} = this.props;

		return (
			<div>
				<div className="container">
					<div className="row">
						{images.map((image, index) => (
							<div key={index} className="col-4 pb-2 px-1">
								<img className="card-img custom-cursor-pointer"
								     src={`data:image/jpeg;base64,${image.thumbnail}`}
								     alt=""
								     onClick={() => this.setState({isOpen: true, photoIndex: index})}/>
							</div>
						))}
					</div>
				</div>

				{isOpen && (
					<Lightbox
						mainSrc={`${BASE_URL}/images/${images[photoIndex].uuid}`}
						nextSrc={`${BASE_URL}/images/${images[(photoIndex + 1) % images.length].uuid}`}
						prevSrc={`${BASE_URL}/images/${images[(photoIndex + images.length - 1) % images.length].uuid}`}
						onCloseRequest={() => this.setState({isOpen: false})}
						onMovePrevRequest={() =>
							this.setState({
								photoIndex: (photoIndex + images.length - 1) % images.length,
							})
						}
						onMoveNextRequest={() =>
							this.setState({
								photoIndex: (photoIndex + 1) % images.length,
							})
						}
					/>
				)}

			</div>
		);
	}
}

export default ImageLightbox;