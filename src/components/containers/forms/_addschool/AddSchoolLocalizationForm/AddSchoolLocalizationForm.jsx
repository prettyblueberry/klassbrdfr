import * as React from "react";
import { withTranslation } from 'react-i18next';
import {Button, TextInput2, Select} from "../../../../presentational";
import {FormAPI} from "../../_system/FormAPI";
import {AddSchoolService} from "./../../../../../services";
import PropTypes from 'prop-types';
import "./AddSchoolLocalizationForm.scss";
import * as CountryList from "country-list";
import {KRUtils} from "@klassroom/klassroom-sdk-js";

class AddSchoolLocalizationFormComponent extends React.Component {
	static $t;
	static i18n;
	form;
	academies = [];
	states = [];
	constructor(props) {
		super(props);



		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
		this.form = new FormAPI(this);
		this.formSettings = {
			formValidation: null,
			formValue: {
				country: this.props.initFormValue.country || this.getDefaultCountry(),
				address: this.props.initFormValue.address || "",
				zipcode: this.props.initFormValue.zipcode || "",
				city: this.props.initFormValue.city || "",
				academy: "",
				state: "",
			},
			formRules: {
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
	}

	getDefaultCountry(){
		if(!KRUtils.getCookie("klassroom_country")){
			return "";
		}else{
			return KRUtils.getCookie("klassroom_country").toUpperCase();
		}



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
	getStateItems() {
		return this.states;
	}
	getAcademyItems() {
		return this.academies;
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
	onChangeCountry = (value, submit = false) => {
		let countLoadedData = 0;
	 this.form.updateValueForm('country', value);
		if(submit) {
			this.onSubmit();
		}
	}
	onChangeAddress = (value, submit = false) => {
		this.form.updateValueForm('address', value);
		if(submit) {
			this.onSubmit();
		}
	}
	onChangeCity = (value, submit = false) => {
		this.form.updateValueForm('city', value);
		if(submit) {
			this.onSubmit();
		}
	}
	onChangeZipCode = (value, submit = false) => {
		this.form.updateValueForm('zipcode', value);
		if(submit) {
			this.onSubmit();
		}
	}
	onChangeAcademy = (value, submit = false) => {
		this.form.updateValueForm('academy', value);
		if(submit) {
			this.onSubmit();
		}
	}
	onChangeState = (value, submit = false) => {
		this.form.updateValueForm('state', value);
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
							<span className="text" dangerouslySetInnerHTML={{__html: this.$t('Where is your school <b>located</b>?')}}></span>
						</div>
						<div className="create-password-header3">
							{this.$t('Fill in the various information concerning the location of your establishment.')}
						</div>
						{this.form.renderFormError()}

						<Select
							value={this.form.getValueInputForm('country')}
							onChange={this.onChangeCountry}
							label={this.$t("Country")}
							items={this.getCountyItems()}
						/>

						<TextInput2
							onChange={this.onChangeAddress}
							value={this.form.getValueInputForm('address')}
							type="text"
							label={this.$t("Address")}
						/>

						<TextInput2
							onChange={this.onChangeCity}
							value={this.form.getValueInputForm('city')}
							label={this.$t("City")}
						/>
						<TextInput2
							onChange={this.onChangeZipCode}
							value={this.form.getValueInputForm('zipcode')}
							label={this.$t("Zip Code")}
						/>

						<div className="form-button-right">
							<Button onClick={this.onSubmit} typeDesign="primary" name={this.$t("Next")}/>
						</div>
				</form>
			</>
		);
	}
}
AddSchoolLocalizationFormComponent.propTypes = {
	initFormValue: PropTypes.object,
	callbackSubmit: PropTypes.func.isRequired,
	callbackClearError: PropTypes.func.isRequired,
	callbackOnBack: PropTypes.func.isRequired,
	errorText: PropTypes.string
}
const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {}
}

export const AddSchoolLocalizationForm = withTranslation()(AddSchoolLocalizationFormComponent);
