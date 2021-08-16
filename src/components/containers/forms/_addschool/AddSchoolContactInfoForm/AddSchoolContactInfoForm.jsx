import * as React from "react";
import { withTranslation } from 'react-i18next';
import {Button, TextInput2, Radios} from "../../../../presentational";
import {FormAPI} from "../../_system/FormAPI";
import PropTypes from 'prop-types';
import "./AddSchoolContactInfoForm.scss";

class AddSchoolContactInfoFormComponent extends React.Component {
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
				schoolContact: this.props.initFormValue.schoolContact || "",
				schoolPhone: this.props.initFormValue.schoolPhone || "",
				schoolEmail: this.props.initFormValue.schoolEmail || "",
			},
			formRules: {
				schoolPhone: [
					{
						type: "not_empty",
						errorText:	this.$t("School phone required")
					},
				],
				schoolContact: [
					{
						type: "not_empty",
						errorText:	this.$t("Contact name required")
					},
				],
				schoolEmail: [
					{
						type: "not_empty",
						errorText:	this.$t("School email required")
					},
					{
						type: "email",
						errorText:	this.$t("email format wrong")
					}
				]
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
	onChangeSchoolPhone = (value, submit = false) => {
		this.form.updateValueForm('schoolPhone', value);
		if(submit) {
			this.onSubmit();
		}
	}

	onChangeSchoolContact = (value, submit = false) => {
		this.form.updateValueForm('schoolContact', value);
		if(submit) {
			this.onSubmit();
		}
	}

	onChangeSchoolEmail = (value, submit = false) => {
		this.form.updateValueForm('schoolEmail', value);
		if(submit) {
			this.onSubmit();
		}
	}

	getOptionsType() {
		return this.state.optionsType;
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
						<div className="header1">{this.$t('ADD YOUR SCHOOL')}</div>
						<div className={`header2 step-1}`} style={{height: "auto"}}>
							<span className="text" dangerouslySetInnerHTML={{__html: this.$t('Enter the <b>School contact information</b>')}}></span>
						</div>
						<div className="create-password-header3">
							{this.$t('Enter the contact information of your school.')}
						</div>
						{this.form.renderFormError()}

							<TextInput2
								onChange={this.onChangeSchoolContact}
								value={this.form.getValueInputForm('schoolContact')}
								type="text"
								label={this.$t("School contact name")}
							/>

							<TextInput2
								onChange={this.onChangeSchoolPhone}
								value={this.form.getValueInputForm('schoolPhone')}
								type="number"
								label={this.$t("School phone")}
							/>

							<TextInput2
								onChange={this.onChangeSchoolEmail}
								value={this.form.getValueInputForm('schoolEmail')}
								type="text"
								label={this.$t("School email")}
							/>


						<div className="form-button-right">
							<Button onClick={this.onSubmit} typeDesign="primary" name={this.$t("Next")}/>
						</div>
				</form>
			</>
		);
	}
}
AddSchoolContactInfoFormComponent.propTypes = {
	initFormValue: PropTypes.object,
	callbackSubmit: PropTypes.func.isRequired,
	callbackClearError: PropTypes.func.isRequired,
	callbackOnBack: PropTypes.func.isRequired,
	errorText: PropTypes.string
}
export const AddSchoolContactInfoForm = withTranslation()(AddSchoolContactInfoFormComponent)
