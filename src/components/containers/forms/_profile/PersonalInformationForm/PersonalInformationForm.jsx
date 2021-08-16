import * as React from "react";
import { withTranslation } from 'react-i18next';
import {
	Button,
	TextInput2,
	CountryPhoneInput,
	HeaderPage,
	Select,
} from "presentational";
import {FormAPI} from "forms";
import PropTypes from 'prop-types';
import "./PersonalInformationForm.scss";
import {KRClient, KRUtils} from "@klassroom/klassroom-sdk-js";

class PersonalInformationFormComponent extends React.Component {
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
				firstName: this.props.initFormValue.firstName || KRClient.getInstance().user.first_name,
				lastName: this.props.initFormValue.lastName || KRClient.getInstance().user.last_name,
				email: this.props.initFormValue.email || KRClient.getInstance().user.email,
				phoneInput: this.props.initFormValue.phoneInput || {
					phone: KRUtils.formatPhone(KRClient.getInstance().user.phone),
					valid: false,
					countryData: null,
				},

			},
			formRules: {
				firstName: [
					{
						type: "not_empty",
						errorText:	this.$t("first name required")
					}
				],
				lastName: [
					{
						type: "not_empty",
						errorText:	this.$t("last name required")
					}
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
				/*phoneInput: [
					{
						type: "function",
						validationProperties: {
							func: (value) => {
								return value.countryData ;
							}
						},
						errorText: "phone required"
					},
				],*/


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
	onChangeInput = (value, submit = false, inputName) => {
		this.form.updateValueForm(inputName, value);
		if(submit) {
			this.onSubmit();
		}
	}

	render() {
		return (
			<div className="personal-information-form__container">
				<HeaderPage className="personal-information-form__header" icon="personal-informations" text={this.$t("Personal Information")}/>
				<div className="personal-information-form">
					<form onSubmit={this.onSubmit}>
						{this.form.renderFormError()}
						<TextInput2
							onChange={(value, submit) => this.onChangeInput(value, submit, 'firstName')}
							value={this.form.getValueInputForm('firstName')}
							type="text"
							label={this.$t("First name")}
						/>
						<TextInput2
							onChange={(value, submit) => this.onChangeInput(value, submit, 'lastName')}
							value={this.form.getValueInputForm('lastName')}
							type="text"
							label={this.$t("Last name")}
						/>
						<TextInput2
							onChange={(value, submit) => this.onChangeInput(value, submit, 'email')}
							value={this.form.getValueInputForm('email')}
							type="text"
							label={this.$t("Email")}
						/>
						{/*
						<CountryPhoneInput
							defaultCountry={KRClient.getInstance().user.country.toLowerCase()}
							onChange={(value, submit) => this.onChangeInput(value, submit, 'phoneInput')}
							label={this.$t("Phone number")}
							value={this.form.getValueInputForm('phoneInput')}
							theme="gray"
						/>
						*/}

						<div className="personal-information-form__buttons">
							<Button onClick={this.onSubmit} typeDesign="primary" name={this.$t("Save all changes")}/>
						</div>

					</form>
				</div>
			</div>
		);
	}
}
PersonalInformationFormComponent.propTypes = {
	callbackSubmit: PropTypes.func.isRequired,
	callbackClearError: PropTypes.func.isRequired,
	errorText: PropTypes.string,
}
export const PersonalInformationForm = withTranslation()(PersonalInformationFormComponent)
