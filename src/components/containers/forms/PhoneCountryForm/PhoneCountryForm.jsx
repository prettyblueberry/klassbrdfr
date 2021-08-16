import * as React from "react";
import { withTranslation } from 'react-i18next';

import {Button, CountryPhoneInput} from "../../../presentational";
import {
  Link
} from 'react-router-dom';
import PropTypes from 'prop-types';
import {FormAPI} from "../_system/FormAPI";
import "./PhoneCountryForm.scss";
import {KRUser} from "@klassroom/klassroom-sdk-js";

class PhoneCountryFormComponent extends React.Component {
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
			}
		}
	}
	onSubmit = (event) => {
		event.preventDefault();
		this.form.getFormValidation(
			true,
			(formValidData) => {
				if(formValidData.valid && typeof this.props.callbackSubmit == "function") {
					const data = this.form.getValueForm();
					this.props.callbackSubmit(data.phoneInput);
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
	render() {
		return (
			<>
				<h2 dangerouslySetInnerHTML={{ __html:this.$t("Create a new password")}}/>
				<h3>{this.$t("Please enter your phone number to identify you")}</h3>
				<form className="forgot-password-form" onSubmit={this.onSubmit}>
						{this.form.renderFormError()}
						<fieldset>
								<CountryPhoneInput
									defaultCountry="us"
									onChange={this.onChangePhone}
									label={this.$t("Your phone number")}
									value={this.form.getValueInputForm('phoneInput')}
                  isSignin={true}
								/>
								<div className="space"></div>
								<div className="clearfix">
									<Button onClick={this.onSubmit} typeDesign="primary" name={this.$t("Next")}/>
								</div>
								<div className="hide-desktop mobile-message">
									<p>{this.$t("You don't have a Klassroom account yet?")} <Link to="/signup">{this.$t("Create an account")}</Link></p>
								</div>
						</fieldset>
				</form>
			</>
		);
	}
}
PhoneCountryFormComponent.propTypes = {
	callbackSubmit: PropTypes.func.isRequired,
	callbackClearError: PropTypes.func.isRequired,
	errorText: PropTypes.string,
	initFormValue: PropTypes.object
}
export const PhoneCountryForm = withTranslation()(PhoneCountryFormComponent)
