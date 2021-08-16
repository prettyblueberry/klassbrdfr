import * as React from "react";
import { withTranslation } from 'react-i18next';
import {LinkClassHeader} from "../../components";
import {
	Button,
	HeaderText,
	HeaderTextSmall,
	TextInput2,
	CountryPhoneInput,
} from "../../../../../presentational";
import { withRouter } from 'react-router-dom';
import {FormAPI} from "../../../_system/FormAPI";
import PropTypes from 'prop-types';
import "./LinkClassRequestForm.scss";
import {KRClient} from "@klassroom/klassroom-sdk-js";

class LinkClassRequestFormComponent extends React.Component {
	static $t;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
		this.form = new FormAPI(this);
		this.formSettings = {
			formValidation: null,
			formValue: {
				teacherPhone: this.props.initFormValue.phoneInput || {
					phone: "",
					valid: false,
					countryData: null
				},
				teacherEmail: this.props.initFormValue.teacherEmail || "",
				teacherName: this.props.initFormValue.teacherName || "",
			},
			formRules: {
				teacherName: [
					{
						type: "not_empty",
						errorText:	this.$t("email required")
					}
				],
				teacherPhone: [
					{
						type: "function",
						validationProperties: {
							func: (value) => {
								return value.countryData ;
							}
						},
						errorText: "phone required"
					}],

				teacherEmail: [
					{
						type: "not_empty",
						errorText:	this.$t("email required")
					},
					{
						type: "email",
						errorText:	this.$t("email is not valid")
					},
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
		this.form.updateValueForm('teacherPhone', value);
		if(submit) {
			this.onSubmit();
		}
	}
	onChangeEmail = (value, submit = false) => {
		this.form.updateValueForm('teacherEmail', value);
		if(submit) {
			this.onSubmit();
		}
	}
	onChangeName = (value, submit = false) => {
		this.form.updateValueForm('teacherName', value);
		if(submit) {
			this.onSubmit();
		}
	}
	gotoDashboard = (event) => {
		event.preventDefault();
		this.props.history.goBack();
	}
	render() {
		return (
			<form onSubmit={this.onSubmit} className="link-class-request-form">
				<LinkClassHeader {...this.props}/>
				<HeaderTextSmall style={{textAlign: "left",}} textJSX={this.$t("REQUEST FOR CLASS CREATION")}/>
				<HeaderText style={{textAlign: "left", marginBottom: "10px"}} textJSX={this.$t("Send a <purple>creation class request</purple> to teacher?")}/>
				<HeaderTextSmall style={{textAlign: "left", marginBottom: "20px"}} textJSX={this.$t("Enter the teacher's contact information to send a class creation<br> request.")}/>
				{this.form.renderFormError()}
				<TextInput2
					onChange={this.onChangeName}
					value={this.form.getValueInputForm('teacherName')}
					type="text"
					label={this.$t("Teacher name")}
				/>
				<div className="country-phone-input__gray">
					<CountryPhoneInput
						defaultCountry="us"
						onChange={this.onChangePhone}
						label={this.$t("Teacher mobile phone number")}
						value={this.form.getValueInputForm('teacherPhone')}
					/>
				</div>

				<TextInput2
					onChange={this.onChangeEmail}
					value={this.form.getValueInputForm('teacherEmail')}
					type="text"
					label={this.$t("Teacher email")}
				/>
				<div className="link-class-request-form__buttons">
					<a onClick={this.gotoDashboard} className="link-class-request-form__cancel">{this.$t('Cancel')}</a>
					<Button onClick={this.onSubmit} iconType="arrow-white" iconSide="right" typeDesign="primary" name={this.$t("Send to teacher")}/>
				</div>
			</form>);
	}
}
LinkClassRequestFormComponent.propTypes = {
	initFormValue: PropTypes.object.isRequired,
	callbackSubmit: PropTypes.func.isRequired,
	callbackClearError: PropTypes.func.isRequired,
	callbackOnBack: PropTypes.func.isRequired,
}

export const LinkClassRequestForm = withRouter(withTranslation()(LinkClassRequestFormComponent));
