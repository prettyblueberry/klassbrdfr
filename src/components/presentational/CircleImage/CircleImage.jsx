import * as React from "react";
import { withTranslation } from 'react-i18next';
import {PopupMenu} from "@klassroom/klassroom-react-lib";
import PropTypes from 'prop-types';
import {KRUtils, KRFile} from "@klassroom/klassroom-sdk-js";
import fileDialog from 'file-dialog';
import classnames from "classnames";
import "./CircleImage.scss";

class CircleImageComponent extends React.Component {
	static $t;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
		this.state = {

		}
	}
	componentDidMount() {

	}
	componentWillUnmount() {

	}

	getPhotoUrl() {
		if(this.props.photo) {
			if(typeof this.props.photo === "string"){
				return this.props.photo;
			}else(this.props.photo instanceof KRFile)
				return this.props.photo.dataUrl;
		}
		return null;
	}

	render() {
		if(!this.getPhotoUrl()) {
			return (
				<div style={this.props.style || {}} className="circleimage-component photo-component--empty">
					<img src="/public/images/make-photo.svg" className="circleimage-component__photo-img" />
				</div>
			)
		} else {
			return (
				<div style={this.props.style || {}} className="circleimage-component">
					<div className="circleimage-component__photo">
						<div style={{backgroundImage: `url(${this.getPhotoUrl()})`}} className="circleimage-component__photo-img" />
					</div>
				</div>
			)
		}
	}
}

CircleImageComponent.propTypes = {
	callbackChangePhoto: PropTypes.func,
	photo: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.object
	]),
	style: PropTypes.object,
}
export const CircleImage = withTranslation()(CircleImageComponent)
