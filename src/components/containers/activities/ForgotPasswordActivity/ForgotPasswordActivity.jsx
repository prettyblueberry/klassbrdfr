import * as React from "react";
import {withTranslation} from 'react-i18next';
import {withRouter} from 'react-router-dom';
import {AuthLayout} from "../../layouts";
import {PhoneCountryForm, VerificationCodeForm} from "../../forms";
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import "./ForgotPasswordActivity.scss";
import {KRUser} from "@klassroom/klassroom-sdk-js";
import {ModalManager} from "containers/modals"
class ForgotPasswordActivityComponent extends React.Component {
	static $t;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
		this.login = null;
		this.state = {
			step: 1,
			phoneData: null,
			login: null,
			sms:false,
			resent:false,
			// This text error from server
			phoneCountryForm_ErrorText: "",
			validationCodeForm_ErrorText: ""
		}
	}
	clearErrorPhoneCountryForm = () => {
		this.setState({
			phoneCountryForm_ErrorText: ""
		});
	}
	submitPhoneCountryForm = (phoneData) => {
		const formattedPhone = parsePhoneNumberFromString(phoneData.phone, phoneData.countryData.iso2.toUpperCase());
		if(formattedPhone) {
			this.login = formattedPhone.number.substring(1);
			showLoader();
			KRUser.checkPhone(this.login)
				.then((phone_exists) => {
						if(!phone_exists){


								this.setState({phoneCountryForm_ErrorText:this.$t("This phone number doesn't exist. Please go to {{link}} section",
								{link: `<a href="/signup" class="link-white">${this.$t("sign up")}<a/>`})});

						} else {
							showLoader()
							KRUser.verifyPhone(this.login)
								.then((data) => {
										phoneData.type = data.type;
										phoneData.email = data.email;
										phoneData.login = this.login;

										this.setState({
											phoneData:phoneData,
											step : 2,
											phoneCountryForm_ErrorText: "",
										}, () => {

										});
								}).catch( (err) => {
										ModalManager.getInstance().alert(this.$t("Error"), err.message);
								})
								.finally(()=>hideLoader());
						}
				})
				.catch((err) =>{
						ModalManager.getInstance().alert(this.$t("Error"), err.message);
				})
				.finally(()=>hideLoader());
		}
	}
	submitCodeForm = (code) => {

			showLoader();
		KRUser.resetPassword(this.login, code)
			.then(() => {
					window.location = "/";
			})
			.catch((err) =>{
				this.setState({validationCodeForm_ErrorText:err.message});
			})
			.finally(()=>hideLoader());

	}
	sendSms = () => {
		// send sms
			showLoader();
		KRUser.forceVerifyPhone(this.login)
			.then(() => {
					this.setState({resent:true});
			})
			.catch((err) =>{
				this.setState({validationCodeForm_ErrorText:err.message});
			})
			.finally(()=>hideLoader());
	}
	backFirstStep = () => {
		this.setState({step: 1});
	}
	renderForm = () => {
		/*var s = this.$t("We sent you a security code to {{phone}}",{phone: ((this.state.phoneData.type == "sms")? "+"+this.state.phone.login:this.state.phone.email)});
		if((this.state.phoneData.type != "sms")){
			s += "<br/>"+this.$t("Make sure to check our email in your spam.");
		} */

		if(this.state.step == 2) {
			return <VerificationCodeForm
			  login={this.state.login}
				phoneData={this.state.phoneData}
				callbackBack={this.backFirstStep}
				callbackSubmit={this.submitCodeForm}
				callbackRepeatSendCode={this.sendSms}
				resent = {this.state.resent}
				errorText = {this.state.validationCodeForm_ErrorText}
			/>
		}
		return <PhoneCountryForm
			errorText={this.state.phoneCountryForm_ErrorText}
			initFormValue={{phoneInput: this.state.phoneData}}
			callbackSubmit={this.submitPhoneCountryForm}
			callbackClearError={this.clearErrorPhoneCountryForm}
		/>
	}
	render() {
		return (
			<AuthLayout
				contentHTML={this.renderForm()}
				headersHTML={""}
			/>
		)
	}
}
const TranslatedComponent = withTranslation()(ForgotPasswordActivityComponent);
export const ForgotPasswordActivity = withRouter(props => <TranslatedComponent {...props}/>)
