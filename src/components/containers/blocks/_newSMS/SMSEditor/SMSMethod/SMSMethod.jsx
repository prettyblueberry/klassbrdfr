import * as React from "react";
import { withTranslation } from 'react-i18next';
import {RoundIconMiddle} from "../../../../../presentational";
import classnames from "classnames";
import PropTypes from 'prop-types';
import "./SMSMethod.scss";

class SMSMethodComponent extends React.Component {
	static translate;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
	}
	renderCheck() {
		if(this.props.checked) {
			return <div className="sms-method__checked">
				<div className="icon klassicon-check"></div>
			</div>
		}
		return null;
	}
	getClassRoot() {
		let classes = {
			"sms-method": true,
		}
		if(this.props.checked) {
			classes["sms-method-checked"] = true;
		}
		return classnames(classes);
	}
	render() {
		return (
			<div onClick={this.props.onClick} className={this.getClassRoot()}>

				<div className="sms-method__icon">
					<RoundIconMiddle color="blue" icon={this.props.icon}/>
				</div>

				<div className="sms-method__text">
					<div className="sms-method__h1" dangerouslySetInnerHTML={{__html: this.props.h1}}></div>
					<div className="sms-method__h2">{this.props.h2}</div>
				</div>

				<div className="sms-method__check">
					{this.renderCheck()}
				</div>

			</div>
		);
	}
}
SMSMethodComponent.propTypes = {
	icon: PropTypes.string.isRequired,
	h1: PropTypes.string.isRequired,
	h2: PropTypes.string.isRequired,
	checked: PropTypes.bool,
	onClick: PropTypes.func.isRequired,
}
export const SMSMethod = withTranslation()(SMSMethodComponent)