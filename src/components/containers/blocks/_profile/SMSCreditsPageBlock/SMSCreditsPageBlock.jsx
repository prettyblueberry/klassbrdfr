import * as React from "react";
import { withTranslation } from 'react-i18next';
import {
	HeaderPage
} from "presentational";
import {
	SMSCreditsBalanceBlock,
	RechargeOptionsBlock,
	SMSRechargeHistory,
} from "../../";
import PropTypes from 'prop-types';
import "./SMSCreditsPageBlock.scss";

class SMSCreditsPageBlockComponent extends React.Component {
	static translate;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
	}
	render() {
		return (
			<div className="sms-credits-page-block">
				<HeaderPage className="sms-credits-page-block__header" icon="sms-credits" text={this.$t("SMS Credits")}/>
				<SMSCreditsBalanceBlock/>
				<RechargeOptionsBlock/>
				<SMSRechargeHistory/>
			</div>
		)
	}
}
SMSCreditsPageBlockComponent.propTypes = {

}
export const SMSCreditsPageBlock = withTranslation()(SMSCreditsPageBlockComponent)