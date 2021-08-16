import * as React from "react";
import { withTranslation } from 'react-i18next';
import {AuthLayout} from "../../layouts";
import {LoginForm} from "../../forms";
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import {KRClient} from "@klassroom/klassroom-sdk-js";
import "./LoginActivity.scss";

export class LoginActivityComponent extends React.Component {
	static $t;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
		this.state = {
			errorText: ''
		}
	}
	clearErrorLoginForm = () => {
		this.setState({
			errorText: ""
		});
	}
	onSubmit = (data) => {
		if(data.phoneInput.countryData) {
			const formattedPhone = parsePhoneNumberFromString(data.phoneInput.phone, data.phoneInput.countryData.iso2.toUpperCase());
			if(formattedPhone){
				const login = formattedPhone.number.substring(1);
				KRClient.getInstance().login(login, data.password)
					.then(() => window.location = "/"
				).catch((err) =>{
					this.setState({
						errorText: err.message
					});
				})
			}
		}
	}
	renderHeaders() {
		return (
			<>
				<h1>{this.$t("WELCOME")}</h1>
				<h2 dangerouslySetInnerHTML={{ __html:this.$t("Log in to your personal space")}}/>
				<h3>{this.$t("Access your Klassboard personal space")}</h3>
			</>
		)
	}
	// This method rendering form component to HTML result.
	renderForm() {
		return (
			<LoginForm
				errorText = {this.state.errorText}
				callbackSubmit = {this.onSubmit}
				callbackClearError = {this.clearErrorLoginForm}
			/>
		)
	}
	render() {
		return (
			<AuthLayout
				contentHTML={this.renderForm()}
				headersHTML={this.renderHeaders()}
			/>
		);
	}
}
export const LoginActivity = withTranslation()(LoginActivityComponent)
