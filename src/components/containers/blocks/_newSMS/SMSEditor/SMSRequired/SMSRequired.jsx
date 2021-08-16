import * as React from "react";
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import "./SMSRequired.scss";

class SMSRequiredComponent extends React.Component {
	static translate;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
	}
	getValue() {
		return this.props.requiredCredits || "-"
	}
	render() {
		return (
			<div className="sms-required">
				<div className="sms-required__label">{this.$t("SMS required for this campaign")}</div>
				<div className="sms-required__value">{this.getValue()}</div>
			</div>
		);
	}
}
SMSRequiredComponent.propTypes = {
	requiredCredits: PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.string,
	])
}
export const SMSRequired = withTranslation()(SMSRequiredComponent)