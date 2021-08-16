import * as React from "react";
import { withTranslation } from 'react-i18next';
import classnames from "classnames";
import PropTypes from 'prop-types';
import "./HeaderTextSmall.scss";
import "../colors.scss";

class HeaderTextSmallComponent extends React.Component {
	static translate;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
	}
	getClasses() {
		let classes = {
			"header-text": true,
		}	
		if(this.props.className){
			classes[this.props.className] = true;
		}
		return classnames(classes);
	}
	render() {
		const HeaderText =  React.createElement(
			'header-text-small',
			{
				style: this.props.style || {},
				class: this.getClasses(),
				dangerouslySetInnerHTML: {__html: this.props.textJSX}
			}
		)
		return HeaderText;
	}
}
HeaderTextSmallComponent.propTypes = {
	textJSX: PropTypes.node.isRequired,
	style: PropTypes.object,
	className: PropTypes.string,
}
export const HeaderTextSmall = withTranslation()(HeaderTextSmallComponent)