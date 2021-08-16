import * as React from "react";
import { withTranslation } from 'react-i18next';
import {
	Button,
	TextInput2,
	CountryPhoneInput,
	PhotoSelector,
	Radios,
	HeaderPage,
	Select,
	HrLabeled,
} from "presentational";
import {FormAPI} from "forms";
import * as CountryList from "country-list";
import PropTypes from 'prop-types';
import * as moment from 'moment';
import {KRUtils, KRClient, KBEvent} from "@klassroom/klassroom-sdk-js";
import "./SchoolInformation.scss";
import {ModalManager} from "containers/modals"

class SchoolInformationComponent extends React.Component {
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

				schoolName: this.props.initFormValue.schoolName || KRClient.getInstance().organization.name,
				schoolPosition: this.props.initFormValue.schoolPosition || KRClient.getInstance().organization.member.position,
				schoolType: this.props.initFormValue.schoolType || (KRClient.getInstance().organization.is_public ? "public" : "private") ,

				studentsNumber: this.props.initFormValue.studentsNumber || KRClient.getInstance().organization.students_count,
				classesNumber: this.props.initFormValue.classesNumber || KRClient.getInstance().organization.classes_count,
				startMonth: this.props.initFormValue.startMonth || KRClient.getInstance().organization.start_month,

				schoolContact: this.props.initFormValue.schoolContact || KRClient.getInstance().organization.contact_name,
				schoolPhone: this.props.initFormValue.schoolPhone || KRClient.getInstance().organization.contact_phone,
				schoolEmail: this.props.initFormValue.schoolEmail || KRClient.getInstance().organization.contact_email,

				country: this.props.initFormValue.country || KRClient.getInstance().organization.countryID,
				address: this.props.initFormValue.address || KRClient.getInstance().organization.street,
				zipcode: this.props.initFormValue.zipcode || KRClient.getInstance().organization.zipcode,
				city: this.props.initFormValue.city || KRClient.getInstance().organization.city,
				academy: "",
				state: "",

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
				],


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
				],

				country: [
					{
						type: "not_empty",
						errorText:	this.$t("Country required")
					},
				],
				address: [
					{
						type: "not_empty",
						errorText:	this.$t("Address required")
					},
				],
				zipcode: [
					{
						type: "not_empty",
						errorText:	this.$t("Zip Code required")
					},
				],
				city: [
					{
						type: "not_empty",
						errorText:	this.$t("City required")
					},
				],

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

		this.handleEvent = (ev, opts)=>{
				switch(ev){

						case KBEvent.organization_updated:
							this.forceUpdate();
							break;

				}
		}
		KRClient.getInstance().addListener(this,this.handleEvent);
	}

	componentWillUnmount(){
		KRClient.getInstance().removeListener(this);
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
					this.props.callbackSubmit(data);
				}
			}
		)
	}
	onChangeInput = (value, submit = false, inputName) => {
		this.form.updateValueForm(inputName, value);
		if(submit) {
			this.onSubmit();
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
	getCountyItems() {
		const countries = [];
		KRUtils.each(CountryList.getData(), function(key,val){
			countries.push(

				{
					value: val.code,
					title: val.name
				}
			)
		});

		return countries;
	}
	getOptionsType() {
		return this.state.optionsType;
	}

	render() {
		return (
			<div className="school-information-form__container">
				<HeaderPage className="school-information-form__header" icon="school-informations" text={this.$t("School Information")}/>
				<div className="school-information-form">
					<form onSubmit={this.onSubmit}>
						{this.form.renderFormError()}

							<div className="school-information-form__photo-container">

								<PhotoSelector
									callbackChangePhoto = {(photo) => {

										if(!photo){
											showLoader(this.$t("Removing school cover..."));
											KRClient.getInstance().organization.removeCover()
											.then(() => {
											})
											.catch((err) => {
														ModalManager.getInstance().alert(this.$t("Error"), err.message);
											})
											.finally(()=>hideLoader());
										}else{
											showLoader(this.$t("Uploading school cover..."));
											KRClient.getInstance().organization.setCover(photo)
											.then(() => {
											})
											.catch((err) => {
														ModalManager.getInstance().alert(this.$t("Error"), err.message);
											})
											.finally(()=>hideLoader());
										}

									}


									}
									photo={KRClient.getInstance().organization.thumb_image_url}
								/>
							</div>

							<HrLabeled label={this.$t("School Name")}/>

							<TextInput2
								onChange={(value, submit) => this.onChangeInput(value, submit, 'schoolName')}
								value={this.form.getValueInputForm('schoolName')}
								type="text"
								label={this.$t("School name")}
							/>
							<TextInput2
								onChange={(value, submit) => this.onChangeInput(value, submit, 'schoolPosition')}
								value={this.form.getValueInputForm('schoolPosition')}
								type="text"
								label={this.$t("Your position")}
							/>
							<Radios
								isInline={true}
								options={this.getOptionsType()}
								selectedOption={this.form.getValueInputForm('schoolType')}
								label={this.$t("Structure type")}
								onChange={(value, submit) => this.onChangeInput(value, submit, 'schoolType')}
							/>

						<HrLabeled label={this.$t("Classes Information")}/>
						<TextInput2
							onChange={(value, submit) => this.onChangeInput(value, submit, 'studentsNumber')}
							value={this.form.getValueInputForm('studentsNumber')}
							type="number"
							label={this.$t("Number of students")}
						/>

						<TextInput2
							onChange={(value, submit) => this.onChangeInput(value, submit, 'classesNumber')}
							value={this.form.getValueInputForm('classesNumber')}
							type="number"
							label={this.$t("Number of classes")}
						/>

						<Select
							value={this.form.getValueInputForm('startMonth')}
							onChange={(value, submit) => this.onChangeInput(value, submit, 'startMonth')}
							label={this.$t("Start month")}
							items={this.getMonthItems()}
						/>

						<HrLabeled label={this.$t("Contact Information")}/>

						<TextInput2
							onChange={(value, submit) => this.onChangeInput(value, submit, 'schoolContact')}
							value={this.form.getValueInputForm('schoolContact')}
							type="text"
							label={this.$t("School contact name")}
						/>

						<TextInput2
							onChange={(value, submit) => this.onChangeInput(value, submit, 'schoolPhone')}
							value={this.form.getValueInputForm('schoolPhone')}
							type="number"
							label={this.$t("School phone")}
						/>

						<TextInput2
							onChange={(value, submit) => this.onChangeInput(value, submit, 'schoolEmail')}
							value={this.form.getValueInputForm('schoolEmail')}
							type="text"
							label={this.$t("School email")}
						/>

						<HrLabeled label={this.$t("School Address")}/>

						<Select
							value={this.form.getValueInputForm('country')}
							onChange={(value, submit) => this.onChangeInput(value, submit, 'country')}
							label={this.$t("Country")}
							items={this.getCountyItems()}
						/>

						<TextInput2
							onChange={(value, submit) => this.onChangeInput(value, submit, 'address')}
							value={this.form.getValueInputForm('address')}
							type="text"
							label={this.$t("Address")}
						/>

						<TextInput2
							onChange={(value, submit) => this.onChangeInput(value, submit, 'city')}
							value={this.form.getValueInputForm('city')}
							label={this.$t("City")}
						/>
						<TextInput2
							onChange={(value, submit) => this.onChangeInput(value, submit, 'zipcode')}
							value={this.form.getValueInputForm('zipcode')}
							label={this.$t("Zip Code")}
						/>
						<hr/>



						<div className="school-information-form__buttons">
							<Button onClick={this.onSubmit} typeDesign="primary" name={this.$t("Save all changes")}/>
						</div>

					</form>
				</div>
			</div>
		);
	}
}
SchoolInformationComponent.propTypes = {
	callbackSubmit: PropTypes.func.isRequired,
	callbackClearError: PropTypes.func.isRequired,
	errorText: PropTypes.string,
}
export const SchoolInformation = withTranslation()(SchoolInformationComponent)
