import * as React from "react";
import { withTranslation } from 'react-i18next';
import {PhotoSelector} from "../../../presentational";
import PropTypes from 'prop-types';
import {KRClient} from '@klassroom/klassroom-sdk-js';
import "./ClassPhoto.scss";

class ClassPhotoComponent extends React.Component {
	static translate;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
		this.addListeners();
	}
	addListeners(){
		KRClient.getInstance().addListener(this, this.handleEvent);
	}
	removeListeners(){
		KRClient.getInstance().removeListener(this);
	}
	componentWillUnmount(){
		this.removeListeners();
	}
	handleEvent = (ev, opts) => {
		switch(ev) {
			// use here events for changing photo of class
			/*	case KRClient.organization_updated:
					this.forceUpdate();
					break; */
		}
	}
	render() {
		return (
			<div className="school-photo">
			<PhotoSelector

				// we can replace like Schoolphoto component
				photo={this.props.photo}
			/>
			</div>
		);
	}
}
ClassPhotoComponent.propTypes = {
	changePhoto: PropTypes.func,
	photo: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.object
	]),
}
export const ClassPhoto = withTranslation()(ClassPhotoComponent)
