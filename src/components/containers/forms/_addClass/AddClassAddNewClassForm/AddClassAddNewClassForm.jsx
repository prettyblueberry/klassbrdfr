import * as React from "react";
import { withTranslation } from 'react-i18next';
import {Button, TextInput2, CurrentYear} from "../../../../presentational";
import { withRouter } from 'react-router-dom';
import {FormAPI} from "../../_system/FormAPI";
import PropTypes from 'prop-types';
import "./AddClassAddNewClassForm.scss";

class AddClassAddNewClassFormComponent extends React.Component {
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
				internName: this.props.initFormValue.internName || "",
				principalTeacher: this.props.initFormValue.principalTeacher || "",
				studentNumber: this.props.initFormValue.studentNumber || "",
				internID: this.props.initFormValue.internID || ""
			},
			formRules: {
				internName: [
					{
						type: "not_empty",
						errorText:	this.$t("name required")
					},
				],
				principalTeacher: [
					{
						type: "not_empty",
						errorText:	this.$t("principal teacher required")
					},
				],
				studentNumber: [
					{
						type: "not_empty",
						errorText:	this.$t("student number required")
					},
				],
				internID: []
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
	onChangeInternName = (value, submit = false) => {
		this.form.updateValueForm('internName', value);
		if(submit) {
			this.onSubmit();
		}
	}
	onChangePrincipalTeacher = (value, submit = false) => {
		this.form.updateValueForm('principalTeacher', value);
		if(submit) {
			this.onSubmit();
		}
	}
	onChangeStudentNumber = (value, submit = false) => {
		this.form.updateValueForm('studentNumber', value);
		if(submit) {
			this.onSubmit();
		}
	}
	onChangeInternID = (value, submit = false) => {
		this.form.updateValueForm('internID', value);
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
			<div className="add-new-class-form">
				<CurrentYear style={{marginTop: "42px", marginBottom: "79px"}} title={this.$t("SCHOOL YEAR")}/>
				<div className="add-new-class-form__h2">{this.$t('Create a new class').toUpperCase()}</div>
				<div className="add-new-class-form__h3" dangerouslySetInnerHTML={{__html: this.$t("Enter your <b>class information</b>")}}></div>
				<div className="add-new-class-form__h4">{this.$t("Enter the information of your first class.")}</div>
				<form className="add-new-class-form__form">
					{this.form.renderFormError()}
					<TextInput2
							onChange={this.onChangeInternName}
							value={this.form.getValueInputForm('internName')}
							type="text"
							label={this.$t("Name (Room 203, 1st Grade A...)")}
							required = {true}
						/>
					<TextInput2
							onChange={this.onChangePrincipalTeacher}
							value={this.form.getValueInputForm('principalTeacher')}
							type="text"
							label={this.$t("Principal teacher")}
							required = {true}
						/>
					<TextInput2
							onChange={this.onChangeStudentNumber}
							value={this.form.getValueInputForm('studentNumber')}
							type="number"
							label={this.$t("Number of Students")}
							required = {true}
						/>
					<TextInput2
							onChange={this.onChangeInternID}
							value={this.form.getValueInputForm('internID')}
							type="text"
							label={this.$t("Internal ID if you are using a class management system")}
							optional = {true}
						/>
					<div className="add-new-class-form__buttons">
						<a onClick={this.gotoDashboard} className="add-new-class-form__cancel">{this.$t('Cancel')}</a>
						<Button onClick={this.onSubmit} iconType="arrow-white" iconSide="right" typeDesign="primary" name={this.$t("Next")}/>
					</div>
				</form>

			</div>);
	}
}
AddClassAddNewClassFormComponent.propTypes = {
	initFormValue: PropTypes.object,
	callbackSubmit: PropTypes.func.isRequired,
	callbackClearError: PropTypes.func.isRequired,
	callbackOnBack: PropTypes.func.isRequired,
	errorText: PropTypes.string,
	year: PropTypes.number.isRequired,
}

export const AddClassAddNewClassForm = withRouter(withTranslation()(AddClassAddNewClassFormComponent));
