import * as React from "react";
import { withTranslation } from 'react-i18next';
import {
	HeaderText,
	SelectSmall,
} from "presentational";
import {RechargeHistoryList} from "lists";
import PropTypes from 'prop-types';
import "./SMSRechargeHistory.scss";

class SMSRechargeHistoryComponent extends React.Component {
	static translate;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
		this.options = {
			show: "all_time"
		}
	}
	getOptions() {
		return [
			{
				title: this.$t("All time"),
				value: "all_time",
			},
		]
	}
	onChangeValue = (option, value) => {
		this.options[option] = value;
		this.forceUpdate();
	}
	render() {
		return (
			<div className="sms-recharge-history">
				<div className="sms-recharge-history__header">
					<HeaderText style={{marginBottom: "30px", "fontSize": "18px", 'textAlign': "left"}} textJSX={this.$t("SMS recharge history")}/>
					<SelectSmall
							style={{width: "190px"}}
							value={this.options.show}
							onChange={(value) => this.onChangeValue("show", value)}
							label={this.$t("Show")}
							items={this.getOptions()}
					/>
				</div>
				<RechargeHistoryList/>
			</div>
		);
	}
}
SMSRechargeHistoryComponent.propTypes = {

}
export const SMSRechargeHistory = withTranslation()(SMSRechargeHistoryComponent)