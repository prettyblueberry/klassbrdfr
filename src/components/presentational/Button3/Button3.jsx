import * as React from "react";
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import classnames from "classnames";
import "./Button3.scss";

class Button3Component extends React.Component {
	static translate;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
	}
	onClick = () => {
		this.props.onClick();
	}
	getClassIcon(side) {
		let classes = {
			"icon": true,
		}
		switch(this.props.iconType) {
			case "arrow-blue":
			case "arrow-white":
			classes['klassicon-back'] = true;
			classes['flip-x'] = true;
			break;
			case "without-icon":
			case "primary-without-icon":
			case "only-text":
			break;
			case "my-school-btn":
			classes['klassicon-my-school'] = true;
			break;
			case "conversation-icon":
			classes['klassicon-conversations'] = true;
			break;
			case "attendance":
			classes['klassicon-attendance'] = true;
			break;
			case "delay-icon":
			classes['klassicon-empty'] = true;
			break;
			case "write-message-white":
			classes['klassicon-write-message'] = true;
			break;
			case "add-white":
			classes['klassicon-add'] = true;
			break;
			default:
			classes['klassicon-back'] = true;
			break;
		}
		classes[`icon__${side}`] = true;
		return classnames(classes);
	}
	render() {
		return (
			<div style={this.props.style || {}} className="button3" onClick={this.onClick}>
				<span>{this.props.title}</span>
				<div className={this.getClassIcon()}></div>
			</div>
		);
	}
}
Button3Component.propTypes = {
	iconType: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired
}
export const Button3 = withTranslation()(Button3Component)