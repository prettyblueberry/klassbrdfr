import * as React from "react";
import { withTranslation } from 'react-i18next';
import {
  Link
} from 'react-router-dom';
import {
	HeaderText,
	HeaderTextSmall,
} from "presentational";
import PropTypes from 'prop-types';
import "./NewSMSAdvertising.scss";

class NewSMSAdvertisingComponent extends React.Component {
	static translate;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
	}
	render() {
		return (
		<div className="new-sms-advertising">
				<div className="icon klassicon-close"></div>
				<div className="new-sms-advertising__left">
					<div className="icon klassicon-sms-credits-2"></div>
				</div>
				<div className="new-sms-advertising__center">
					<HeaderText className="new-sms-advertising__h1" textJSX={this.$t("You need more <blue>SMS Credits</blue>?")}/>
					<HeaderTextSmall className="new-sms-advertising__h2" textJSX={this.$t("Recharge your account quickly with our credit packs!")}/>
					<Link to="/sms-credits" className="new-sms-advertising__h3">{this.$t("Manage SMS credits")}</Link>
				</div>
				<div className="new-sms-advertising__right">
					<img className="new-sms-advertising__book" src="/public/pages/listClasses/books-icon.svg"/>
				</div>
		</div>
		);
	}
}
NewSMSAdvertisingComponent.propTypes = {

}
export const NewSMSAdvertising = withTranslation()(NewSMSAdvertisingComponent)