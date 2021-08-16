import * as React from "react";
import { withTranslation } from 'react-i18next';
import {
  Link
} from 'react-router-dom';
import {
	HeaderText,
	HeaderTextMiddle,
	HeaderTextSmall,
} from "presentational"
import PropTypes from 'prop-types';
import "./SMSCreditsBalanceBlock.scss";

class SMSCreditsBalanceBlockComponent extends React.Component {
	static translate;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
	}
	render() {
		return (
			<div className="sms-credits-balance-block">
				<HeaderText style={{marginBottom: "30px", "fontSize": "18px", 'textAlign': "left"}} textJSX={this.$t("SMS credits balance")}/>
				<div className="sms-credits-balance-block__credits">
					<div className="sms-credits-balance-block__credits-left">
						<div className="sms-credits-balance-block__balance">
							<div className="sms-credits-balance-block__h1">{this.$t("My SMS credits")}</div>
							<div className="sms-credits-balance-block__count">536</div>
							<div className="icon klassicon-sms-credits"></div>
						</div>
					</div>
					<div className="sms-credits-balance-block__credits-right">
						<HeaderTextMiddle style={{textAlign: "left",}} textJSX={this.$t("You need more <blue>SMS Credits</blue>?")}/>
						<HeaderTextSmall style={{fontSize: "13px", textAlign: "left"}} textJSX={this.$t("Recharge your account quickly with our credit packages!")}/>
						<Link to="/buy-sms-credits" className="sms-credits-balance-block__link">{this.$t("Buy SMS credits")}</Link>
					</div>
				</div>
			</div>
		);
	}
}
SMSCreditsBalanceBlockComponent.propTypes = {

}
export const SMSCreditsBalanceBlock = withTranslation()(SMSCreditsBalanceBlockComponent)