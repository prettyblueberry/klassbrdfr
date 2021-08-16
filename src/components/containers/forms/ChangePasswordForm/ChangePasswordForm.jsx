import * as React from "react";
import { withTranslation } from 'react-i18next';
import {Button, TextInput, CountryPhoneInput} from "../../../presentational";
import {
  Link
} from 'react-router-dom';
import PropTypes from 'prop-types';
import {FormAPI} from "../_system/FormAPI";
import "./ChangePasswordForm.scss";

class ChangePasswordFormComponent extends React.Component {
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
				password: "",
				password_repeated: "",
			},
			formRules: {
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
				password_repeated: [
					{
						type: "not_empty",
						errorText:	this.$t("Repeat password")
					},
					{
					 type: "function",
						validationProperties: {
							func: (value) => {
								return this.form.getValueInputForm('password') === value;
							}
						},
						errorText: "the passwords are not the same"
					},
				],
			}
		};


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
					if(data.password != data.password_repeated){
						alert(this.$t("passwords are not matching"));
					}else{
						this.props.callbackSubmit(data);
					}

				}
			}
		)
	}
	onChangePassword = (value, submit = false) => {
		this.form.updateValueForm('password', value);
		if(submit) {
			this.onSubmit();
		}
	}
	onChangeRepeatedPassword = (value, submit = false) => {
		this.form.updateValueForm('password_repeated', value);
		if(submit) {
			this.onSubmit();
		}
	}



	render() {
		return (
			<form onSubmit={this.onSubmit}>
					{this.form.renderFormError()}
					<fieldset>
							<TextInput
								onChange={this.onChangePassword}
								value={this.form.getValueInputForm('password')}
								type="password"
								label={this.$t("New Password")}
								placeholder={this.$t("New Password")}
							/>
							<div className="space"></div>
							<TextInput
								onChange={this.onChangeRepeatedPassword}
								value={this.form.getValueInputForm('password_repeated')}
								type="password"
								label={this.$t("Repeat password")}
								placeholder={this.$t("Repeat password")}
							/>
							<div className="space"></div>
							<div className="clearfix">
								<Button onClick={this.onSubmit} typeDesign="primary" name={this.$t("Submit")}/>
							</div>
							<div className="hide-desktop mobile-message">
								<p>{this.$t("You don't have a Klassroom account yet?")} <Link to="/signup">{this.$t("Create an account")}</Link></p>
							</div>
					</fieldset>
			</form>
		);
	}
}
ChangePasswordFormComponent.propTypes = {
	callbackSubmit: PropTypes.func,
	callbackClearError: PropTypes.func.isRequired,
	errorText: PropTypes.string
}
export const ChangePasswordForm = withTranslation()(ChangePasswordFormComponent)
