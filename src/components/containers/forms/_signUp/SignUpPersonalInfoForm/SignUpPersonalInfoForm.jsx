import * as React from "react";
import { withTranslation } from 'react-i18next';
import {Button, TextInput2} from "../../../../presentational";
import {FormAPI} from "../../_system/FormAPI";
import PropTypes from 'prop-types';
import "./SignUpPersonalInfoForm.scss";

class SignUpPersonalInfoFormComponent extends React.Component {
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
				firstName: this.props.initFormValue.firstName || "",
				lastName: this.props.initFormValue.lastName || "",

			},
			formRules: {
				firstName: [
					{
						type: "not_empty",
						errorText:	this.$t("First name required")
					}
				],
				lastName: [
					{
						type: "not_empty",
						errorText:	this.$t("Last name required")
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
	onChangeFirstName = (value, submit = false) => {
		this.form.updateValueForm('firstName', value);
		if(submit) {
			this.onSubmit();
		}
	}
	onChangeLastName = (value, submit = false) => {
		this.form.updateValueForm('lastName', value);
		if(submit) {
			this.onSubmit();
		}
	}



	render() {
		return (
			<>

				<form className="create-account-form">
						<div className="header1">{this.$t('Create my account').toUpperCase()}</div>
						<div className={`header2 step-1}`} style={{height: "auto"}}>
							<span className="text">{this.$t('Enter your personal information')}</span>
						</div>
						<div className="create-password-header3">
							{this.$t('Create your personal password to secure your account.')}
						</div>
						{this.form.renderFormError()}
						<TextInput2
								onChange={this.onChangeFirstName}
								value={this.form.getValueInputForm('firstName')}
								type="text"
								label={this.$t("First name")}
							/>
						<TextInput2
								onChange={this.onChangeLastName}
								value={this.form.getValueInputForm('lastName')}
								type="text"
								label={this.$t("Last name")}
							/>
						<div className="form-button-right">
							<Button onClick={this.onSubmit} typeDesign="primary" name={this.$t("Next")}/>
						</div>
				</form>
			</>
		);
	}
}
SignUpPersonalInfoFormComponent.propTypes = {
	callbackSubmit: PropTypes.func.isRequired,
	callbackClearError: PropTypes.func.isRequired,
	errorText: PropTypes.string,
	initFormValue: PropTypes.object,
}
export const SignUpPersonalInfoForm = withTranslation()(SignUpPersonalInfoFormComponent)
