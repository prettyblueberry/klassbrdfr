import * as React from "react";
import { withTranslation } from 'react-i18next';
import {Button, TextInput2 } from "../../../presentational";
import {FormAPI} from "../_system/FormAPI";
import PropTypes from 'prop-types';
import "./EditClassRoom.scss";

class EditClassRoomComponent extends React.Component {
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
				internName: this.props.classroom.name,
				principalTeacher: this.props.classroom.teacher,
				studentNumber: this.props.classroom.students_count,
				internID: this.props.classroom.externalID
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
	onCancel = (event) => {
		event.preventDefault();
		if(typeof this.props.callbackCancel == 'function'){
			this.props.callbackCancel();
		}
	}
	render() {
		return (
			<form className="edit-class__form">
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
					<div className="edit-class__form__buttons">
						<a onClick={this.onCancel} className="edit-class__form__cancel">{this.$t('Cancel')}</a>
						<Button onClick={this.onSubmit} typeDesign="primary" name={this.$t("Save")}/>
					</div>
				</form>
		);
	}
}
EditClassRoomComponent.propTypes = {
	initFormValue: PropTypes.object,
	callbackSubmit: PropTypes.func,
	callbackCancel: PropTypes.func,
	callbackClearError: PropTypes.func,
	errorText: PropTypes.string,
}
export const EditClassRoom = withTranslation()(EditClassRoomComponent)
