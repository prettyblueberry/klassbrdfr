import * as React from "react";
import { withTranslation } from 'react-i18next';
import {queryStringToObject} from "utils";
import PropTypes from 'prop-types';
import "./UserInsideClass.scss";
import {RelativeUser } from "presentational";

class UserInsideClassComponent extends React.Component {
	static translate;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
	}
	

	getValueTypeFromURL = () => {
		let type = queryStringToObject().type || "members";
		return decodeURI(type);
	}

	render() {
		return (
			<div className="user-inside-class-item">
			 	{this.props.member && <RelativeUser member={this.props.member} simple={this.props.simple} disableCheckbox={true} size={45}/>}
			</div>
		);
	}
}
UserInsideClassComponent.propTypes = {

}
export const UserInsideClass = withTranslation()(UserInsideClassComponent)
