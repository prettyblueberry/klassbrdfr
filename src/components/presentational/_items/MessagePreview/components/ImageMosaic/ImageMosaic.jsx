import * as React from "react";
import { withTranslation } from 'react-i18next';
import {uniqueId} from "utils";
import PropTypes from 'prop-types';
import "./ImageMosaic.scss";

class ImageMosaicComponent extends React.Component {
	static translate;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
		this.idComponent = uniqueId();
	}
	componentWillUnmount(){

	}

	renderFourImages = () => {
		if(this.props.attachments.length >= 4){
			const images = this.props.attachments;
			return (<div className="image-mosaic-four">

				<div className="image-mosaic-four__left">
					<div className="image-mosaic-four__grid image-mosaic-four__grid-1">
						{images[0].thumb_url && <div className="image-mosaic-three__img" style={{backgroundImage: "url("+images[0].thumb_url+")"}}/>}
						{!images[0].thumb_url && <div className="icon klassicon-image"></div>}
					</div>
				</div>

				<div className="image-mosaic-four__right">

					<div className="image-mosaic-four__grid image-mosaic-four__grid-2">
						{images[1].thumb_url && <div className="image-mosaic-three__img" style={{backgroundImage: "url("+images[1].thumb_url+")"}}/>}
						{!images[1].thumb_url && <div className="icon klassicon-image"></div>}
					</div>
					<div className="image-mosaic-four__grid image-mosaic-four__grid-3">
						{images[2].thumb_url && <div className="image-mosaic-three__img" style={{backgroundImage: "url("+images[2].thumb_url+")"}}/>}
						{!images[2].thumb_url && <div className="icon klassicon-image"></div>}
					</div>
					<div className="image-mosaic-four__grid image-mosaic-four__grid-4">
						{images[3].thumb_url && <div className="image-mosaic-three__img" style={{backgroundImage: "url("+images[3].thumb_url+")"}}/>}
						{!images[3].thumb_url && <div className="icon klassicon-image"></div>}
						{this.props.attachments.length > 4 && <div className="image-mosaic-four__more">+{this.props.attachments.length - 4}</div>}
					</div>

				</div>

			</div>)
		}
		return null;
	}
	renderThreeImages = () => {
		if(this.props.attachments.length == 3){
			const images = this.props.attachments;
			return (<div className="image-mosaic-three">

				<div className="image-mosaic-three__grid image-mosaic-three__left">
					{images[0].thumb_url && <div className="image-mosaic-three__img" style={{backgroundImage: "url("+images[0].thumb_url+")"}}/>}
					{!images[0].thumb_url && <div className="icon klassicon-image"></div>}
				</div>

				<div className="image-mosaic-three__right">
					<div className="image-mosaic-four__grid image-mosaic-three__grid-2">
						{images[1].thumb_url && <div className="image-mosaic-three__img" style={{backgroundImage: "url("+images[1].thumb_url+")"}}/>}
						{!images[1].thumb_url && <div className="icon klassicon-image"></div>}
					</div>
					<div className="image-mosaic-four__grid image-mosaic-three__grid-3">
						{images[2].thumb_url && <div className="image-mosaic-three__img" style={{backgroundImage: "url("+images[2].thumb_url+")"}}/>}
						{!images[2].thumb_url && <div className="icon klassicon-image"></div>}
					</div>
				</div>

			</div>)
		}
		return null;
	}
	renderTwoImages = () => {
		if(this.props.attachments.length == 2){
			const images = this.props.attachments;
			return (<div className="image-mosaic-two">
				<div className="image-mosaic-four__grid image-mosaic-two__grid-1">
					{images[0].thumb_url && <div className="image-mosaic-three__img" style={{backgroundImage: "url("+images[0].thumb_url+")"}}/>}
					{!images[0].thumb_url && <div className="icon klassicon-image"></div>}
				</div>
				<div className="image-mosaic-four__grid image-mosaic-two__grid-2">
					{images[1].thumb_url && <div className="image-mosaic-three__img" style={{backgroundImage: "url("+images[1].thumb_url+")"}}/>}
					{!images[1].thumb_url && <div className="icon klassicon-image"></div>}
				</div>
			</div>)
		}
		return null;
	}
	renderOneImage = () => {
		if(this.props.attachments.length == 1){
			const image = this.props.attachments[0];
			return (
				<div className="image-mosaic-four__grid image-mosaic-one">
					{image.thumb_url && <div className="image-mosaic-three__img" style={{backgroundImage: "url("+image.thumb_url+")"}}/>}
					{!image.thumb_url && <div className="icon klassicon-image"></div>}
				</div>
			)
		}
		return null;
	}
	render() {
		if(this.props.attachments.length == 0){
			return null;
		}
		let renderer = this.renderOneImage;
		if(this.props.attachments.length == 2){
			renderer= this.renderTwoImages;
		}
		if(this.props.attachments.length == 3){
			renderer= this.renderThreeImages;
		}
		if(this.props.attachments.length >= 4){
			renderer= this.renderFourImages;
		}
		return (
			<div className="image-mosaic">
				{renderer()}
			</div>
		);
	}
}
ImageMosaicComponent.propTypes = {
	attachments: PropTypes.array.isRequired,
}
export const ImageMosaic = withTranslation()(ImageMosaicComponent)
