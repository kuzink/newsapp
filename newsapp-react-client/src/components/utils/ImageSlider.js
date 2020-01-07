import React, {Component} from 'react';
import Slider from "react-slick";
import DefaultImage from "../../images/defaultImage.png";

class ImageSlider extends Component {

	play = () => this.slider.slickPlay();

	pause= () => this.slider.slickPause();

	render() {
		const {images} = this.props;
		const settings = {
			dots: true,
			speed: 300,
			draggable: false,
			arrows: false,
			fade: true,
			autoplaySpeed: 800
		};

		return (
			<div>
				{images.length === 0
					? <img src={DefaultImage} className="card-img-top" alt=""/>
					: /*<div onMouseOver={this.play} onMouseOut={this.pause}>*/
						<div>
							<Slider ref={slider => (this.slider = slider)} {...settings}>
								{images.map((image, index) =>
									<img key={index} className="card-img-top" src={`data:image/jpeg;base64,${image.thumbnail}`} alt=""/>
								)}
							</Slider>
						</div>
				}
			</div>
		);
	}
}

export default ImageSlider;