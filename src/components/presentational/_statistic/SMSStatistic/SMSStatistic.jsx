import * as React from "react";
import { withTranslation } from 'react-i18next';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import "./SMSStatistic.scss";

class SMSStatisticComponent extends React.Component {
	static translate;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
	}
	getStatistic(){
		return this.props.statistic;
	}
	buySMS = () => {
		this.props.history.push("/buy-sms-credits");
	}
	render() {
		if(!this.getStatistic()){
			return null;
		}
		return (
			<div className="sms-statistic">
				<div className="sms-statistic__left">
					<div className="sms-statistic__label">{this.$t("My SMS credits")}</div>
					<div className="sms-statistic__credits">{this.props.credits}</div>

					<button onClick={this.buySMS} className="sms-statistic__buy"><div className="icon klassicon-sms-credits-2"></div> {this.$t("Buy sms credits")}</button>
				</div>

				<div className="sms-statistic__right">
					<div className="sms-statistic__right-1">
						{this.$t("SMS Message")}
					</div>

					<div className="sms-statistic__right-2">

						<div className="sms-statistic__right-all">
							{this.getStatistic().smsMessages}
						</div>

						<div className="sms-statistic__right-statistic">

							<div className="sms-statistic__sent-block">
								<div className="sms-statistic__sent-count">{this.getStatistic().smsSent}</div>
								<div className="sms-statistic__sent-label">{this.$t("SMS Sent")}</div>
							</div>

							<div className="sms-statistic__opened-block">
								<div className="sms-statistic__opened-count">{this.getStatistic().smsOpened} <span>{this.getStatistic().smsOpenedOf}%</span></div>
								<div className="sms-statistic__opened-label">{this.$t("SMS Opened")}</div>
							</div>

						</div>
						

					</div>


				</div>
			</div>
		);
	}
}
SMSStatisticComponent.propTypes = {
	statistic: PropTypes.object,
	credits: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

const TranslatedComponent = withTranslation()(SMSStatisticComponent);
export const SMSStatistic = withRouter(props => <TranslatedComponent {...props}/>)