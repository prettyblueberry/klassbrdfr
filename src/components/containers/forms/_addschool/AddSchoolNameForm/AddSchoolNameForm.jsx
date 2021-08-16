import * as React from "react";
import { withTranslation } from 'react-i18next';
import {Button, TextInput2, Radios} from "../../../../presentational";
import {FormAPI} from "../../_system/FormAPI";
import PropTypes from 'prop-types';
import "./AddSchoolNameForm.scss";

class AddSchoolNameFormComponent extends React.Component {
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
				schoolName: this.props.initFormValue.schoolName || "",
				schoolPosition: this.props.initFormValue.schoolPosition || "",
				schoolType: this.props.initFormValue.schoolType || "public",
			},
			formRules: {
				schoolName: [
					{
						type: "not_empty",
						errorText:	this.$t("School Name required")
					},
				],
				schoolPosition: [
					{
						type: "not_empty",
						errorText:	this.$t("Position required")
					},
				],
				schoolType: [
					{
						type: "not_empty",
						errorText:	this.$t("School type required")
					},
				]
			}
		}
		this.state = {
			optionsType: [
				{
					name: this.$t('public'),
					value: "public"
				},
				{
					name: this.$t('private'),
					value: "private"
				},
			],
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
	onChangeSchoolName = (value, submit = false) => {
		this.form.updateValueForm('schoolName', value);
		if(submit) {
			this.onSubmit();
		}
	}
	onChangePosition = (value, submit = false) => {
		this.form.updateValueForm('schoolPosition', value);
		if(submit) {
			this.onSubmit();
		}
	}
	onChangeSchoolType = (value, submit = false) => {
		this.form.updateValueForm('schoolType', value);
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
				<form className="create-account-form">
						<div className="header1">{this.$t('ADD YOUR SCHOOL')}</div>
						<div className={`header2 step-1}`} style={{height: "auto"}}>
							<span className="text" dangerouslySetInnerHTML={{__html: this.$t('What the <b>name of your school?</b>')}}></span>
						</div>
						<div className="create-password-header3">
							{this.$t('Enter the full name of your school and indicate the type of school.')}
						</div>
						{this.form.renderFormError()}

						<TextInput2
								onChange={this.onChangeSchoolName}
								value={this.form.getValueInputForm('schoolName')}
								type="text"
								label={this.$t("School name")}
						/>
						<TextInput2
								onChange={this.onChangePosition}
								value={this.form.getValueInputForm('schoolPosition')}
								type="text"
								label={this.$t("Your position")}
							/>
						<Radios
							isInline={true}
							options={this.getOptionsType()}
							selectedOption={this.form.getValueInputForm('schoolType')}
							label={this.$t("Structure type")}
							onChange={this.onChangeSchoolType}
						/>
						<div className="form-button-right">
							<Button onClick={this.onSubmit} typeDesign="primary" name={this.$t("Next")}/>
						</div>
				</form>
			</>
		);
	}
}
AddSchoolNameFormComponent.propTypes = {
	initFormValue: PropTypes.object,
	callbackSubmit: PropTypes.func.isRequired,
	callbackClearError: PropTypes.func.isRequired,
	errorText: PropTypes.string
}
export const AddSchoolNameForm = withTranslation()(AddSchoolNameFormComponent)
