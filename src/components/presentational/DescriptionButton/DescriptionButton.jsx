import * as React from "react";
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import "./DescriptionButton.scss";

export class DescriptionButtonComponent extends React.Component {
	static translate;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
	}
	getStyleRoot() {
		return this.props.style || {}
	}
	onClick = () => {
		if(typeof this.props.onClick == "function"){
			this.props.onClick();
		}
	}
	getRightIcon() {
		return <div className="description-button__back klassicon-back"></div>
	}
	render() {
		return (
			<div onClick={this.onClick} style={this.getStyleRoot()} className="description-button">
				<div className="description-button__left-icon">{this.props.leftIconJSX || null}</div>
				<div className="description-button__center">
					<div className="description-button__text1" dangerouslySetInnerHTML={{__html: this.props.text1JSX || null}}></div>
					<div className="description-button__text2" dangerouslySetInnerHTML={{__html: this.props.text2JSX || null}}></div>
				</div>
				<div className="description-button__right-icon">{this.props.rightIconJSX || this.getRightIcon()}</div>
			</div>
		);
	}
}
DescriptionButtonComponent.propTypes = {
	leftIconJSX: PropTypes.node,
	text1JSX: PropTypes.node,
	text2JSX: PropTypes.node,
	rightIconJSX: PropTypes.node,
	style: PropTypes.object,
	onClick: PropTypes.func,
}
export const DescriptionButton = withTranslation()(DescriptionButtonComponent)