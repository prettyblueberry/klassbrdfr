import * as React from "react";
import { withTranslation } from 'react-i18next';
import {AuthLayout} from "../../layouts";
import {ChangePasswordForm} from "../../forms";
import "./ChangePasswordActivity.scss";
import {KRClient} from "@klassroom/klassroom-sdk-js";

export class ChangePasswordActivityComponent extends React.Component {
	static translate;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
		this.state = {
			errorText: ''
		}
	}
	clearErrorForm = () => {
		this.setState({
			errorText: ""
		});
	}
	onSubmit = (data) => {
		showLoader();
		KRClient.getInstance().user.setPassword(data.password)
			.then(() => window.location = "/"
		).catch((err) =>{
			this.setState({
				errorText: err.message
			});
		})
		.finally(hideLoader());
	}
	renderHeaders() {
		return (
			<>
				<h2 dangerouslySetInnerHTML={{ __html:this.$t("Create a password")}}/>
				<h3>{this.$t("You currently have a temporary password. Please choose a new password.")}</h3>
			</>
		)
	}
	renderForm() {
		return (
			<ChangePasswordForm
				errorText = {this.state.errorText}
				callbackSubmit = {this.onSubmit}
				callbackClearError = {this.clearErrorForm}
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
export const ChangePasswordActivity = withTranslation()(ChangePasswordActivityComponent)
