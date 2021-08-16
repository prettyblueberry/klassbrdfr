import * as React from "react";
import { withTranslation } from 'react-i18next';
import {Button, HeaderTextSmall, HeaderText, RoundIconMiddle} from "presentational";
import {withRouter} from 'react-router-dom';
import PackagesCredits from "../PackagesCredits";
import {FormAPI} from "forms";
import PropTypes from 'prop-types';
import "./BillingSuccessful.scss";

class BillingSuccessfulComponent extends React.Component {
	static $t;
	static i18n;
	form;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
		this.steps = this.props.stepsAPI;
		this.form = new FormAPI(this);
		this.formSettings = {
			formValidation: null,
			formValue: {
			},
			formRules: {}
		}
		this.packages = new PackagesCredits(this.$t).getPackages();
		this.selectedPackage = null;
		const ChoosePackageData = this.steps.getStepData("ChoosePackage");
		if(ChoosePackageData && ChoosePackageData.data) {
			this.selectedPackage = this.packages[ChoosePackageData.data.package];
		}
	}
	goToProfile = () => {
		this.props.history.push("/sms-credits");
	}
	getUser(){
		return "Julien";
	}
	getCredits(){
		if(this.selectedPackage && this.selectedPackage.credits){
			return this.selectedPackage.credits;
		}
		return ""
	}
	getPrevBalance(){
		return 1000;
	}
	getAddedCredits(){
		return "+"+1000;
	}
	getAllBalance(){
		return 1500;
	}
	render() {
		return (
			<div className="billing-successful">
				<RoundIconMiddle style={{width: "80px", height: "80px", fontSize: "37px"}} icon="check" color="green"/>
				<HeaderTextSmall className="billing-successful__message-body__h1" style={{marginTop: "20px"}} textJSX={this.$t("CONGRATULATIONS")}/>
				<HeaderText className="billing-successful__message-body__h2" style={{marginBottom: "10px"}} textJSX={this.$t("Your account has been <purple>credited</purple>!")}/>
				<HeaderTextSmall className="billing-successful__message-body__h3" style={{width: "490px", marginBottom: "30px"}} textJSX={this.$t("Congratulations {{user}}! Your order is completed and your account has been credited of +{{credits}} credits. Enjoy it!", {user: this.getUser(), credits: this.getCredits()})}/>

				<div className="billing-successful__detail">

					<div className="billing-successful__detail-left">
						<div className="billing-successful__label">{this.$t('Your recharge')}</div>
						<div className="billing-successful__small-label">{this.$t('Prev. balance : {{prevbalance}} credits', {prevbalance: this.getPrevBalance()})}</div>

						<div className="billing-successful__detail-left-block">
							<HeaderText className="billing-successful__detail-credits" style={{}} textJSX={this.getAddedCredits()}/>
							<HeaderTextSmall className="billing-successful__detail-h1" style={{}} textJSX={this.$t('Credits').toUpperCase()}/>

							<div className="billing-successful__decoration-1"></div>
							<div className="billing-successful__decoration-2"></div>
							<div className="billing-successful__decoration-3"></div>
							<div className="billing-successful__decoration-4"></div>
							<div className="billing-successful__decoration-5"></div>
							<div className="billing-successful__decoration-6"></div>
							<div className="billing-successful__decoration-7"></div>
							<div className="billing-successful__decoration-8"></div>
							<div className="billing-successful__decoration-9"></div>
							<div className="billing-successful__decoration-10"></div>
							<div className="billing-successful__decoration-11"></div>
							<div className="billing-successful__decoration-12"></div>

						</div>

					</div>

					<div className="billing-successful__detail-center">
						<div className="icon klassicon-back"></div>
					</div>

					<div className="billing-successful__detail-right">
						<div className="billing-successful__label">{this.$t('My SMS Credits')}</div>
						<div className="billing-successful__small-label">{this.$t('Actual balance')}</div>

						<div className="billing-successful__detail-right-block">
							<div className="icon klassicon-sms-credits-2"></div>
							<HeaderText className="billing-successful__detail-credits" style={{}} textJSX={this.getAllBalance()}/>
							<HeaderTextSmall className="billing-successful__detail-h2" style={{}} textJSX={this.$t('Credits').toUpperCase()}/>
							<div className="billing-successful__decoration-1"></div>
							<div className="billing-successful__decoration-2"></div>
							<div className="billing-successful__decoration-3"></div>
							<div className="billing-successful__decoration-4"></div>
							<div className="billing-successful__decoration-5"></div>
							<div className="billing-successful__decoration-6"></div>
							<div className="billing-successful__decoration-7"></div>
							<div className="billing-successful__decoration-8"></div>
							<div className="billing-successful__decoration-9"></div>
							<div className="billing-successful__decoration-10"></div>
							<div className="billing-successful__decoration-11"></div>
							<div className="billing-successful__decoration-12"></div>
						</div>
					</div>
				</div>
				<Button onClick={this.goToProfile} typeDesign="primary" name={this.$t("Go to my account")}/>
			</div>
		);
	}
}
BillingSuccessfulComponent.propTypes = {
	stepsAPI: PropTypes.object.isRequired,
}

const TranslatedComponent = withTranslation()(BillingSuccessfulComponent);
export const BillingSuccessful = withRouter(props => <TranslatedComponent {...props}/>)
