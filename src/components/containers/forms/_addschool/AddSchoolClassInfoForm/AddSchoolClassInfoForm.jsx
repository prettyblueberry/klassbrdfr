import * as React from "react";
import { withTranslation } from 'react-i18next';
import {Button, TextInput2, Select} from "../../../../presentational";
import {FormAPI} from "../../_system/FormAPI";
import PropTypes from 'prop-types';
import "./AddSchoolClassInfoForm.scss";
import * as moment from 'moment';


class AddSchoolClassInfoFormComponent extends React.Component {
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
				studentsNumber: this.props.initFormValue.studentsNumber || "",
				classesNumber: this.props.initFormValue.classesNumber || "",
				startMonth: this.props.initFormValue.startMonth || "",
			},
			formRules: {
				studentsNumber: [
					{
						type: "not_empty",
						errorText:	this.$t("Students number required")
					},
				],
				classesNumber: [
					{
						type: "not_empty",
						errorText:	this.$t("Classes number required")
					},
				],
				startMonth: [
					{
						type: "not_empty",
						errorText:	this.$t("Start month required")
					},
				],
			}
		}
	}
	getMonthItems() {

		const months = [];
		for(var i=1;i<=12;i++){
			months.push({
				value: i,
				title: moment(i,"M").locale(this.i18n.language).format("MMMM")


			})
		}

		return months;
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
	onChangeStudentsNumber = (value, submit = false) => {
		this.form.updateValueForm('studentsNumber', value);
		if(submit) {
			this.onSubmit();
		}
	}
	onChangeClassesNumber = (value, submit = false) => {
		this.form.updateValueForm('classesNumber', value);
		if(submit) {
			this.onSubmit();
		}
	}
	onChangeStartMonth = (value, submit = false) => {
		this.form.updateValueForm('startMonth', value);
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
							<span className="text" dangerouslySetInnerHTML={{__html: this.$t('Your <b>classes information</b>')}}></span>
						</div>
						<div className="create-password-header3">
							{this.$t('Fill in the various information concerning your classes.')}
						</div>
						{this.form.renderFormError()}

						<TextInput2
								onChange={this.onChangeStudentsNumber}
								value={this.form.getValueInputForm('studentsNumber')}
								type="number"
								label={this.$t("Number of students")}
							/>

						<TextInput2
								onChange={this.onChangeClassesNumber}
								value={this.form.getValueInputForm('classesNumber')}
								type="number"
								label={this.$t("Number of classes")}
						/>

						<Select
							value={this.form.getValueInputForm('startMonth')}
							onChange={this.onChangeStartMonth}
							label={this.$t("Start month")}
							items={this.getMonthItems()}
						/>

						<div className="form-button-right">
							<Button onClick={this.onSubmit} typeDesign="primary" name={this.$t("Next")}/>
						</div>
				</form>
			</>
		);
	}
}
AddSchoolClassInfoFormComponent.propTypes = {
	initFormValue: PropTypes.object,
	callbackSubmit: PropTypes.func.isRequired,
	callbackClearError: PropTypes.func.isRequired,
	callbackOnBack: PropTypes.func.isRequired,
	errorText: PropTypes.string
}
export const AddSchoolClassInfoForm = withTranslation()(AddSchoolClassInfoFormComponent)
