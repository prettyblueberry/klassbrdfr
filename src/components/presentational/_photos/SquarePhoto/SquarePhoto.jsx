import * as React from "react";
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import "./SquarePhoto.scss";
import {KRClient, KRFile, KRUtils} from "@klassroom/klassroom-sdk-js";

class SquarePhotoComponent extends React.Component {
	static translate;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
		this.filesRef = React.createRef();
	}

	onChange = () => {
		let file = this.filesRef.current.files[0];
		let reader  = new FileReader();
		reader.onloadend = () => {
			KRUtils.processImage(reader.result, file.type, 1280,(dataUrl) => {

					this.props.onChange(KRFile.dataURItoFile(dataUrl,file.name));

			});
		};
		reader.onerror = (error) => {
		};
		reader.readAsDataURL(file);
	}

	emitChangeFile = () => {
		this.filesRef.current.click();
	}
	renderImage() {
		return <img src={this.props.src instanceof KRFile ? this.props.src.dataUrl : this.props.src}/>
	}
	render() {
		return (
			<div className="square-photo">
				<input onChange={this.onChange} accept="image/*" ref={this.filesRef} type='file' className="editor-message__file-input"/>
				<div className="square-photo__shadow"></div>
				<div onClick={this.emitChangeFile} className="icon klassicon-camera"></div>
				{this.renderImage()}
			</div>
		);
	}
}
SquarePhotoComponent.propTypes = {
	src: PropTypes.any,
	onChange: PropTypes.func.isRequired,
}
export const SquarePhoto = withTranslation()(SquarePhotoComponent)
