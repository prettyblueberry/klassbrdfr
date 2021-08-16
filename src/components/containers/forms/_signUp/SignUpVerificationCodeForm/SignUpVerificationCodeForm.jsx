import * as React from "react";
import { withTranslation } from 'react-i18next';
import {Button, TextInput2} from "../../../../presentational";
import {FormAPI} from "../../_system/FormAPI";
import PropTypes from 'prop-types';
import "./SignUpVerificationCodeForm.scss";
import { parsePhoneNumberFromString } from 'libphonenumber-js';


class SignUpVerificationCodeFormComponent extends React.Component {
	static $t;
	static i18n;
	form;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
		this.form = new FormAPI(this);
		this.contactInfoData = this.props.contactInfoData;
		this.formSettings = {
			formValidation: null,
			formValue: {
				code: this.props.initFormValue.code || "",
			},
			formRules: {
				code: [
					{
						type: "not_empty",
						errorText:	this.$t("code required")
					}
				]
			}
		}
	}
	onSubmit = (event) => {
		if(event && event.preventDefault) {
			event.preventDefault();
		}
		this.form.getFormValidation(
			true,
			(formValidData) => {
				if(formValidData.valid && typeof this.props.callbackSubmit == "function") {
					const data = this.form.getValueForm();
					data.login = this.contactInfoData.login;
					this.form.resetValidation();
					this.props.callbackSubmit(data);
				}
			}
		)
	}
	onChangeCode = (value, submit = false) => {
		this.form.updateValueForm('code', value);
		if(submit) {
			this.onSubmit();
		}
	}




	getFormatterPhone() {

    const formattedPhone = parsePhoneNumberFromString(this.props.contactInfoData.phoneInput.phone, this.props.contactInfoData.phoneInput.countryData.iso2.toUpperCase());

    return formattedPhone.formatInternational();

	}

	render() {
		return (
			<>
			<img
					src="/public/images/icon-back-grey.svg"
					className="icon-back"
					onClick={this.props.callbackOnBack}
			/>
				<form className="create-account-form">
						<div className="header1">{this.$t('Verification Code').toUpperCase()}</div>
						<div className={`header2 step-1}`} style={{height: "auto"}}>
							<span className="text">{this.$t('Verification Code')}</span>
						</div>
						<div className="create-password-header3">
							{this.$t("We sent you a security code to {{phone}}", {phone: this.getFormatterPhone()})}
						</div>
						{this.form.renderFormError()}



						<TextInput2
								onChange={this.onChangeCode}
								value={this.form.getValueInputForm('code')}
								type="number"
								label={this.$t("Verification Code")}
							/>



						<div className="form-button-right">
							<Button onClick={this.onSubmit} typeDesign="primary" name={this.$t("Next")}/>
						</div>
				</form>
			</>
		);
	}
}
SignUpVerificationCodeFormComponent.propTypes = {
	callbackSubmit: PropTypes.func.isRequired,
	callbackClearError: PropTypes.func.isRequired,
	errorText: PropTypes.string,
	initFormValue: PropTypes.object,
	contactInfoData: PropTypes.object,
}
export const SignUpVerificationCodeForm = withTranslation()(SignUpVerificationCodeFormComponent)
