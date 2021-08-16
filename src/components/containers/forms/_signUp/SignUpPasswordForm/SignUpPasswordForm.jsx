import * as React from "react";
import { withTranslation } from 'react-i18next';
import {Button, TextInput2} from "../../../../presentational";
import {FormAPI} from "../../_system/FormAPI";
import PropTypes from 'prop-types';
import "./SignUpPasswordForm.scss";

class SignUpPasswordFormComponent extends React.Component {
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
				password_repeated: ""
			},
			formRules: {
				password: [
          {
						type: "not_empty",
						errorText: this.$t("password required")
					},
					{
						type: "function",
						 validationProperties: {
							 func: (value) => {
								 const passwordRegex = /^[a-zA-Z0-9]{8,30}$/;
								 return value.match(passwordRegex);
							 }
						 },
						 errorText: this.$t("password should be min {{min}} characters and max {{max}} characters or numbers.", {min: 8, max: 30})
					},
				],
				password_repeated: [
					{
						type: "not_empty",
						errorText:	this.$t("repeat password")
					},
					{
						type: "function",
						 validationProperties: {
							 func: (value) => {
								 return this.form.getValueInputForm('password') === value;
							 }
						 },
						 errorText: "password should equal to its confirmation."
					 },
				],
			}
		}
		this.state = {
			visiblePassword: false,
		}
	}
	toggleVisiblePassword = () => {
		this.setState({
			visiblePassword: !this.state.visiblePassword
		});
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
			<>
				<img
					src="/public/images/icon-back-grey.svg"
					className="icon-back"
					onClick={this.props.callbackOnBack}
				/>

				<form className="create-account-form">
						<div className="header1">{this.$t('Create my account').toUpperCase()}</div>
						<div className={`header2 step-1}`} style={{height: "auto"}}>
							<span className="text">{this.$t('Create your password')}</span>
						</div>
						<div className="create-password-header3">
							{this.$t('Create your personal password to secure your account.')}
						</div>
						{this.form.renderFormError()}

						<div className="signup_password-form__password-wrapper">
							<TextInput2
								onChange={this.onChangePassword}
								value={this.form.getValueInputForm('password')}
								type={this.state.visiblePassword ? "text" : "password"}
								label={this.$t("Password")}
							/>
							<img
								src={`/public/images/${
									!this.state.visiblePassword ? 'icon-hide.png' : 'icon-show.png'
								}`}
								className="icon-show"
								onClick={this.toggleVisiblePassword}
							/>
						</div>

						<TextInput2
								onChange={this.onChangeRepeatedPassword}
								value={this.form.getValueInputForm('password_repeated')}
								type={this.state.visiblePassword ? "text" : "password"}
								label={this.$t("Confirm your password")}
						/>

						<div className="form-button-right">
							<Button onClick={this.onSubmit} typeDesign="primary" name={this.$t("Next")}/>
						</div>
				</form>
			</>
		);
	}
}
SignUpPasswordFormComponent.propTypes = {
	callbackSubmit: PropTypes.func.isRequired,
	callbackClearError: PropTypes.func.isRequired,
	callbackOnBack: PropTypes.func.isRequired,
	errorText: PropTypes.string,
}
export const SignUpPasswordForm = withTranslation()(SignUpPasswordFormComponent)
