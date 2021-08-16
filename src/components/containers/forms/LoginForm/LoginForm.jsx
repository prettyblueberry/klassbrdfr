import * as React from "react";
import { withTranslation } from 'react-i18next';
import {Button, TextInput, CountryPhoneInput} from "presentational";
import {FormAPI} from "../_system/FormAPI";
import PropTypes from 'prop-types';
import "./LoginForm.scss";

class LoginFormComponent extends React.Component {
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
				phoneInput: {
					phone: "",
					valid: false,
					countryData: null
				},
				password: ""
			},
			formRules: {
				phoneInput: [
					{
						type: "function",
						validationProperties: {
							func: (value) => {
								return value.phone !== "" && value.phone;
							}
						},
						errorText: "phone required"
					}
				],
				password: [
					{
						type: "not_empty",
						errorText: this.$t("password required")
					},
					{
						type: "min_length",
						validationProperties: {
							min: 8
						},
						errorText: this.$t("password must be {{min}} characters minimum", {min: 8})
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
	onChangePassword = (value, submit = false) => {
		this.form.updateValueForm('password', value);
		if(submit) {
			this.onSubmit();
		}
	}

	render() {
		return (
			<form onSubmit={this.onSubmit}>
					{this.form.renderFormError()}
					<fieldset>
							<CountryPhoneInput
								defaultCountry="us"
								onChange={this.onChangePhone}
								label={this.$t("Your Klassroom phone number")}
								value={this.form.getValueInputForm('phoneInput')}
								isSignin={true}
							/>
							<TextInput
								onChange={this.onChangePassword}
								value={this.form.getValueInputForm('password')}
								type="password"
								label={this.$t("Password")}
								placeholder={this.$t("Password")}
								link="/forgot-password"
								linkName={this.$t("Create a new password")}
							/>
							<div className="space"></div>
							<div className="clearfix">
								<Button onClick={this.onSubmit} typeDesign="primary" name={this.$t("Log In")}/>
							</div>
							<div className="hide-desktop mobile-message">
								<p>{this.$t("You don't have a Klassroom account yet?")} <a href="/signup">{this.$t("Create an account")}</a></p>
							</div>
					</fieldset>
			</form>
		);
	}
}
LoginFormComponent.propTypes = {
	callbackSubmit: PropTypes.func.isRequired,
	callbackClearError: PropTypes.func.isRequired,
	errorText: PropTypes.string,
}
export const LoginForm = withTranslation()(LoginFormComponent)
