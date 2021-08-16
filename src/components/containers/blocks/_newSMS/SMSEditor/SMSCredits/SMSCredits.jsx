import * as React from "react";
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import "./SMSCredits.scss";

class SMSCreditsComponent extends React.Component {
	static translate;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
	}
	buySMS = () => {
		this.props.history.push("/buy-sms-credits");
	}
	render() {
		return (
			<div className="sms-credits">
				<div className="sms-credits__left">
					<div className="sms-credits__label">{this.$t("My SMS credits")}</div>
					<div className="sms-credits__value">
						{this.props.currentCredits}
					</div>
				</div>
				<div className="sms-credits__right">
					<button onClick={this.buySMS} className="sms-credits__buy"><div className="icon klassicon-sms-credits-2"></div>{this.$t("Buy SMS credits")}</button>
					<div className="sms-credits__value">

					</div>
				</div>
			</div>
		);
	}
}
SMSCreditsComponent.propTypes = {
	currentCredits: PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.string,
	])
}

const TranslatedComponent = withTranslation()(SMSCreditsComponent);
export const SMSCredits = withRouter(props => <TranslatedComponent {...props}/>)
