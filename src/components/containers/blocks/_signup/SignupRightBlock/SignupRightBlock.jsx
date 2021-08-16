import * as React from "react";
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import {
	SignUpPersonalInfoForm,
	SignUpContactInfoForm,
	SignUpPasswordForm,
	SignUpSuccessForm,
	SignUpVerificationCodeForm
} from "../../../forms";
import {withRouter} from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import "./SignupRightBlock.scss";
import {KRUser} from '@klassroom/klassroom-sdk-js';


class SignupRightBlockComponent extends React.Component {
	static $t;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
		this.state = {
			errorText: ""
		};
	}
	clearError = () => {
		this.setState({
			errorText: ""
		});
	}
	onSubmitPersonalInfoForm = (personalInfoData) => {
		this.props.callbackChangeData(personalInfoData, 'personalInfoData');
	}
	onSubmitContactInfoForm = (contactInfoData) => {

		const formattedPhone = parsePhoneNumberFromString(contactInfoData.phoneInput.phone, contactInfoData.phoneInput.countryData.iso2.toUpperCase());
		if(formattedPhone){
			const login = formattedPhone.number.substring(1);
			contactInfoData.login = login;
			KRUser.checkPhone(login)
				.then((phone_exists) => {
					if(!phone_exists){
						hideLoader();

						kbApp.modalAPI.confirm(
								<>
									<p>{this.$t("Is this your correct number?")}</p>
									<p>{formattedPhone.formatInternational()}</p>
								</>

							,(val) => {
								if(val){
									KRUser.verifyPhone(login)
										.then((data) => {
													this.props.callbackChangeData(contactInfoData, 'contactInfoData')
										}).catch( (err) => {
												alert(err.message);
										})
										.finally(()=>hideLoader());
								}
						}
					 );



					} else {
						this.setState({errorText:this.$t("This phone number already exists. Please go to {{link}} section",
						{link: `<a href="/forgot-password" class="link-white">${this.$t("forgot password")}<a/>`})});
					}
				}
			).catch((err) =>{
				this.setState({
					errorText: err.message
				});
			})
		}else{
			this.setState({errorText:this.$t("invalid number")});
		}

	}
	onSubmitCodeForm = (codeData) => {

		showLoader();
	KRUser.validatePhone(codeData.login, codeData.code)
		.then(() => {
				this.props.callbackChangeData(codeData, 'codeData');
		})
		.catch((err) =>{
			this.setState({errorText:err.message});
		})
		.finally(()=>hideLoader());



	}
	onSubmitPasswordForm = (passwordData) => {
		this.props.callbackChangeData(passwordData, 'passwordData');




	}
	onSubmitSuccessForm = (successData) => {
		this.props.callbackChangeData(successData, 'successData');
	}
	getDataByStep(typeStep) {
		return this.props.userData[typeStep] ? this.props.userData[typeStep] : {};
	}
	render() {
		SignUpPasswordForm
		switch(this.props.step) {
			case 1:
			return (<SignUpPersonalInfoForm
				errorText = {this.state.errorText}
				callbackSubmit = {this.onSubmitPersonalInfoForm}
				callbackClearError = {this.clearError}
				initFormValue={this.getDataByStep('personalInfoData')}
			/>)
			case 2:
			return (<SignUpContactInfoForm
				errorText = {this.state.errorText}
				callbackSubmit = {this.onSubmitContactInfoForm}
				callbackClearError = {this.clearError}
				callbackOnBack={this.props.callbackOnBack}
				initFormValue={this.getDataByStep('contactInfoData')}
			/>)
			case 3:
			return (<SignUpVerificationCodeForm
				errorText = {this.state.errorText}
				callbackSubmit = {this.onSubmitCodeForm}
				callbackClearError = {this.clearError}
				callbackOnBack={this.props.callbackOnBack}
				initFormValue={this.getDataByStep('codeData')}
				contactInfoData={this.getDataByStep('contactInfoData')}
			/>)
			case 4:
			return (<SignUpPasswordForm
				errorText = {this.state.errorText}
				callbackSubmit = {this.onSubmitPasswordForm}
				callbackClearError = {this.clearError}
				callbackOnBack={this.props.callbackOnBack}
			/>)
			case 5:
			return (
				<SignUpSuccessForm
					callbackSubmit = {this.onSubmitSuccessForm}
					userData={this.props.userData}
				/>
			)
		}
	}
}
SignupRightBlockComponent.propTypes = {
	callbackOnBack: PropTypes.func.isRequired,
	callbackChangeData: PropTypes.func.isRequired,
	userData: PropTypes.object,
	step: PropTypes.number.isRequired,
}
const TranslatedComponent = withTranslation()(SignupRightBlockComponent);
export const SignupRightBlock = withRouter(props => <TranslatedComponent {...props}/>)
