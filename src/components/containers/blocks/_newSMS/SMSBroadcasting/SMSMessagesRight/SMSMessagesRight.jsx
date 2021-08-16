import * as React from "react";
import { withTranslation } from 'react-i18next';
import {RoundIconMiddle} from "../../../../../presentational";
import classnames from "classnames";
import PropTypes from 'prop-types';
import "./SMSMessagesRight.scss";

class SMSMessagesRightComponent extends React.Component {
	static translate;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
	}
	renderCheck() {
		if(this.props.checked) {
			return <div className="sms-messages-right__checked">
				<div className="icon klassicon-check"></div>
			</div>
		}
		return null;
	}
	getClassRoot() {
		let classes = {
			"sms-messages-right": true,
		}
		if(this.props.checked) {
			classes["sms-messages-right-checked"] = true;
		}
		return classnames(classes);
	}
	render() {
		return (
			<div onClick={this.props.onClick} className={this.getClassRoot()}>

				<div className="sms-messages-right__icon">
					<RoundIconMiddle color="butterscotch" icon="sms-campaign"/>
				</div>

				<div className="sms-messages-right__text">
					<div className="sms-messages-right__h1" dangerouslySetInnerHTML={{__html: "SMS Message"}}></div>
					<div className="sms-messages-right__h2" dangerouslySetInnerHTML={{__html: this.$t("{{count}} members selected", {count: this.props.count})}}></div>
				</div>

				<div className="sms-messages-right__right">
					<div className="sms-messages-right__count">{this.props.count}</div>
					<div className="sms-messages-right__h3">{this.$t("SMS required")}</div>
				</div>

			</div>
		);
	}
}
SMSMessagesRightComponent.propTypes = {
	count: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	])
}
export const SMSMessagesRight = withTranslation()(SMSMessagesRightComponent)