import * as React from "react";
import { withTranslation } from 'react-i18next';
import {Button, TextInput2, CountryPhoneInput} from "../../../../presentational";
import {FormAPI} from "../../_system/FormAPI";
import PropTypes from 'prop-types';
import "./SignUpContactInfoForm.scss";

class SignUpContactInfoFormComponent extends React.Component {
	static $t;
	static i18n;
	form;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
		this.form = new FormAPI(this);
		this.formSettings = {
			formValidation: null,
			formValue: {
				phoneInput: this.props.initFormValue.phoneInput || {
					phone: "",
					valid: false,
					countryData: null
				},
				email: this.props.initFormValue.email || ""
			},
			formRules: {
				phoneInput: [
					{
						type: "function",
						validationProperties: {
							func: (value) => {
								return value.countryData ;
							}
						},
						errorText: "phone required"
					},
				],
				email: [
					{
						type: "not_empty",
						errorText:	this.$t("email required")
					},
					{
						type: "email",
						errorText:	this.$t("email format wrong")
					}
				],
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
					this.form.resetValidation();
					this.props.callbackSubmit(data);
				}
			}
		)
	}
	onChangePhone = (value, submit = false) => {
		this.form.updateValueForm('phoneInput', value);
		if(submit) {
			this.onSubmit();
		}
	}
	onChangeEmail = (value, submit = false) => {
		this.form.updateValueForm('email', value);
		if(submit) {
			this.onSubmit();
		}
	}

	render() {
		return (
			<>
				<img
						src="/public/images/icon-back-grey.svg"
						className="icon-back"
						onClick={this.props.callbackOnBack}
				/>

				<form className="signup-contact-info-form">
						<div className="header1">{this.$t('Create my account').toUpperCase()}</div>
						<div className={`header2 step-1}`}>
							<span className="text">{this.$t('Enter your contact information')}</span>
						</div>
						{this.form.renderFormError()}

						<div className="country-phone-input__gray">
							<CountryPhoneInput
								defaultCountry="us"
								onChange={this.onChangePhone}
								label={this.$t("Phone number")}
								value={this.form.getValueInputForm('phoneInput')}
							/>
						</div>

						<TextInput2
								onChange={this.onChangeEmail}
								value={this.form.getValueInputForm('email')}
								type="text"
								label={this.$t("Email")}
						/>

						<div className="form-button-right">
							<Button onClick={this.onSubmit} typeDesign="primary" name={this.$t("Next")}/>
						</div>
				</form>
			</>
		);
	}
}
SignUpContactInfoFormComponent.propTypes = {
	callbackSubmit: PropTypes.func.isRequired,
	callbackClearError: PropTypes.func.isRequired,
	callbackOnBack: PropTypes.func.isRequired,
	errorText: PropTypes.string,
	initFormValue: PropTypes.object,
}
export const SignUpContactInfoForm = withTranslation()(SignUpContactInfoFormComponent)
