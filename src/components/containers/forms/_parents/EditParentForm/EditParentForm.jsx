import * as React from "react";
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import {
	Button,
	HeaderTextSmall,
	HeaderText,
	TextInput2,
	RoundIconSmall,
	CountryPhoneInput
} from "presentational";
import Select from 'react-select';
import classnames from "classnames";
import {FormAPI} from "forms";
import "./EditParentForm.scss";
import {KRClient, KRUtils} from "@klassroom/klassroom-sdk-js";

class EditParentFormComponent extends React.Component {
	static $t;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
		this.form = new FormAPI(this);
		this.form.setFormSettings({
			formValidation: null,
			formValue: {
				first_name: this.props.initData.first_name || "",
				last_name: this.props.initData.last_name || "",
				email: this.props.initData.email || "",
				phoneInput: {
						phone:KRUtils.formatPhone(this.props.initData.phone) || "",
						valid:false,
						countryData: null

				},
				classrooms: this.props.initData.classrooms.map((classroomID) => {
					return {
						value: classroomID,
						label: KRClient.getInstance().classrooms[classroomID].name,
					}
				}),
			},
			formRules: {
				classrooms: [

				],
				first_name: [
					{
						type: "not_empty",
						errorText: this.$t("First name required")
					},
				],
				last_name: [
					{
						type: "not_empty",
						errorText: this.$t("Last name required")
					},
				],
				email: [

					{
						type: "email",
						errorText: this.$t("Email has wrong format")
					},
				],
				phoneInput: [

				],
			}
		});
		this.modal = this.props.modalAPI;
	}
	componentDidMount() {
		this.loadClasses();
	}
	loadClasses = () => {
		this.getClasses();
		this.forceUpdate();
	}
	getClasses = () => {
		let classes = [];

		KRUtils.each(KRClient.getInstance().classrooms,(classroomID,classroom) => {
				classes.push({
					value: classroomID,
					label: classroom.name,
				});
		});

		return classes;
	}
	// this is hook
	onChangeInput = (value, submit = false, nameInput) => {
		this.form.updateValueForm(nameInput, value);
		if(submit) {
			this.onSubmit();
		}
	}
	saveData = () => {
		var data = this.form.getValueForm();
		data.phone = data.phoneInput.countryData ? KRUtils.formatLogin(data.phoneInput.phone,data.phoneInput.countryData.iso2) : null;
		this.props.callbackSubmit(data);

	}
	checkDisabledButton () {
		return !this.form.getFormValidation(false).valid;
	}
	onChangeClasses = (selectedOption) => {
		this.form.updateValueForm('classrooms', selectedOption);
	}
	renderIconChecker() {
		const isValid = this.form.getFormValidation(false).valid;
		if(isValid){
			return <RoundIconSmall className="import-parents-manual-form-check--valid" color="green" icon="check"/>
		}
		return <RoundIconSmall className="import-parents-manual-form-check" color="white" icon="check"/>
	}
	render() {
		return (
		<div className="import-parents-manual-form">
			<div className="import-parents-manual-form__container">
				<div className="import-parents-manual-form__status">
					<HeaderTextSmall className="import-parents-manual-form__h2" textJSX={this.$t("EDIT PARENT")}/>
					{this.renderIconChecker('from', this.form.getValueInputForm('from'))}
				</div>
				<HeaderText className="import-parents-manual-form__h3" textJSX={this.$t("Parent information")}/>
				<HeaderTextSmall className="import-parents-manual-form__h4" textJSX={this.$t("Edit the information of the parent.")}/>
				<TextInput2
					autofocus={true}
					onChange={(value, submit) => this.onChangeInput(value, submit, "first_name")}
					value={this.form.getValueInputForm('first_name')}
					type="text"
					label={this.$t("First name")}
				/>
				<TextInput2
					onChange={(value, submit) => this.onChangeInput(value, submit, "last_name")}
					value={this.form.getValueInputForm('last_name')}
					type="text"
					label={this.$t("Last name")}
				/>
				<TextInput2
					onChange={(value, submit) => this.onChangeInput(value, submit, "email")}
					value={this.form.getValueInputForm('email')}
					type="text"
					label={this.$t("Email")}
				/>

				<div className="country-phone-input__gray">

				<CountryPhoneInput
					defaultCountry={KRClient.getInstance().organization.countryID.toLowerCase()}
					onChange={(value, submit) => this.onChangeInput(value, submit, "phoneInput")}
					label={this.$t("Mobile phone")}
					value={this.form.getValueInputForm('phoneInput')}
				/>
				</div>

			<Select
				value={this.form.getValueInputForm('classrooms')}
				onChange={this.onChangeClasses}
				options={this.getClasses()}
				isMulti={true}
				placeholder={this.$t("Select classes")}
			/>

			</div>
			<Button
				disabled={this.checkDisabledButton()}
				className="import-parents-manual-form__submit"
				onClick={this.saveData}
				typeDesign="primary"
				name={this.$t("Save")}
			/>
		</div>)
	}
}

EditParentFormComponent.propTypes = {
	initData: PropTypes.object.isRequired,
}
export const EditParentForm = withTranslation()(EditParentFormComponent)
