import * as React from "react";
import { withTranslation } from 'react-i18next';
import classnames from "classnames";
import PropTypes from 'prop-types';
import "./HeaderPage.scss";

class HeaderPageComponent extends React.Component {
	static translate;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
	}
	getClasses() {
		let classes = {
			"header-page__header-left": true,
		}	
		if(this.props.className){
			classes[this.props.className] = true;
		}
		return classnames(classes);
	}
	getClassIcon() {
		let classes = {
			"icon": true
		}
		if(this.props.icon){
			classes['klassicon-'+this.props.icon] = true;
		}
		return classnames(classes);
	}
	render() {
		return (
			<div className={this.getClasses()}>
				<div className={this.getClassIcon()}></div>
				<span className="header-page__header-title">{this.props.text}</span>
			</div>
		);
	}
}
HeaderPageComponent.propTypes = {
	text: PropTypes.string.isRequired,
	icon: PropTypes.string.isRequired,
	className: PropTypes.string,
}
export const HeaderPage = withTranslation()(HeaderPageComponent)