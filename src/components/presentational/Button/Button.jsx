import * as React from "react";
import { withTranslation } from 'react-i18next';
import {
  Link
} from 'react-router-dom';
import PropTypes from 'prop-types';
import classnames from "classnames";
import "./Button.scss";

class ButtonComponent extends React.Component {
	static $t;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
	}
	getClassIcon(side) {
		let classes = {
			"icon": true,
		}
		switch(this.props.iconType) {
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
			case "send":
			classes['klassicon-send'] = true;
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
			case "check":
			classes['klassicon-check'] = true;
			break;
			case "arrow-blue":
			case "arrow-white":
			default:
			classes['flip-x'] = true;
			classes['klassicon-back'] = true;
			break;
		}
		classes[`icon__${side}`] = true;
		return classnames(classes);
	}
	renderLeftIcon() {
		return this.props.iconSide == "left" ? <div className={this.getClassIcon("left")}></div> : null;
	}
	renderRightIcon() {
		return (this.props.iconSide == "right" || !this.props.iconSide) ? <div className={this.getClassIcon("right")}></div>: null;
	}

	hasIcon = () => {
		return this.props.iconType !== 'without-icon';
	}

	renderBodyButton() {
		return (
			<>
				{this.hasIcon() && this.renderLeftIcon()}
				<span className="navbar-button-text" dangerouslySetInnerHTML={{__html: this.props.name}}></span>
				{this.hasIcon() && this.renderRightIcon()}
			</>
		)
	}
	isDisabled() {
		return this.props.disabled;
	}
	getButtonClasses() {
		let className = this.props.className || "";
		className += ` btn button-component btn-${this.props.typeDesign}`;
		if(this.isDisabled()){
			className += " button-component--disabled";
		}
		return className;
	}
	onClick = (event) => {
		if(!this.isDisabled()){
			this.props.onClick(event);
		}
	}
	render() {
		// check if it link or button
		if(this.props.link) {
			if(this.props.absoluteLink) {
				return (
					<a
						target={this.props.target || ""}
						className={this.getButtonClasses()}
						style={this.props.style || {}}
						href={this.props.link}
					>
						{this.renderBodyButton()}
					</a>
				);
			} else {
				return (
					<Link
						target={this.props.target || ""}
						className={this.getButtonClasses()}
						style={this.props.style || {}}
						to={this.props.link}
					>
						{this.renderBodyButton()}
					</Link>
				);
			}
		} else {
			if(typeof this.props.onClick === 'function') {
				return (
					<button
						disabled={this.props.disabled}
						type="button"
						onClick={this.onClick}
						style={this.props.style || {}}
						className={this.getButtonClasses()}
					>
						{this.renderBodyButton()}
					</button>
				)
			} else {
				throw(`Button ${this.props.name} not have onClick callback`);
				// error!!
				return null;
			}
		}
	}
}

ButtonComponent.propTypes = {
	typeDesign: PropTypes.string.isRequired,
	iconType: PropTypes.string,
	iconSide: PropTypes.string,
	// name button
	name: PropTypes.string.isRequired,
	// This is link or button if this property don't set.
	link: PropTypes.string,
	// This is absolute link, example "http://apple.com"
	absoluteLink: PropTypes.bool,
	// This working if link property does not set.
	onClick: PropTypes.func,
	style: PropTypes.object,
	disabled: PropTypes.bool,
}
export const Button = withTranslation()(ButtonComponent)
