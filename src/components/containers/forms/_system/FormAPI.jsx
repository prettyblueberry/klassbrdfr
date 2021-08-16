import * as Validators from "./validators";
import {AlertForm} from "../../../presentational";
import React from 'react';
export class FormAPI {
  form = null;
  constructor(form) {
    this.form = form;
  }
  getValidationRuleResult(rule, valueInput, nameInput) {
		let validateData = Validators.DefaultValidator.validate();
		// loop all validators
		Object.keys(Validators).some(validatorClassName => {
			const validator = Validators[validatorClassName];
			if(rule.type === validator.nameValidator){
				validateData = validator.validate(valueInput, rule);
				return true;
			}
			return false;
		});
		return {
			nameInput,
			validateData,
			valid: validateData.valid
    };
	}
	getValidationsInput(nameInput, valueInput) {
		const rulesOfInput = this.getFormSettings().formRules[nameInput] || [];
		return rulesOfInput.map(rule => {
			return this.getValidationRuleResult(rule, valueInput, nameInput);
		});
	}
	inputIsValid(nameInput, valueInput) {
		const validations = this.getValidationsInput(nameInput, valueInput);
		let isValid = false;
		if(Array.isArray(validations)){
			validations.some((validation) => {
				isValid = true;
				if(!validation.valid){
					isValid = false;
					return true;
				}
				return false;
			});
		}
		return isValid;
	}
	getFirstErrorTextForm() {
		const formSettings = this.getFormSettings();
		if(formSettings.formValidation &&
			formSettings.formValidation.firstErrorValidation &&
			formSettings.formValidation.firstErrorValidation.validateData &&
			formSettings.formValidation.firstErrorValidation.validateData.errorText){
				return this.form.$t(
					// translate error text
					formSettings.formValidation.firstErrorValidation.validateData.errorText,
					// use key values from validationProperties
					formSettings.formValidation.firstErrorValidation.validateData.params
				);
			}
		return null;
	}
	getFormValidation(updateValidation = true, callbackChange) {
		const data = this.getValueForm();
		let formValidData = {
			valid: true,
			firstErrorValidation: null,
			inputsValidations: []
		};
		for(const key in data) {
			if(data.hasOwnProperty(key)){
				const validationsInput = this.getValidationsInput(key, data[key]);
				formValidData.inputsValidations.push(validationsInput);
				if(formValidData.valid) {
					validationsInput.some(validationInput => {
						if(!validationInput.validateData.valid) {
							formValidData.firstErrorValidation = validationInput;
							formValidData.valid = false;
							return true;
						}
						return false;
					});
				}
			}
		}
		// If set false, returned only data of validation.
		if(updateValidation) {
			this.updateFormValidationData(formValidData, callbackChange);
		}
		return formValidData;
	}
	getFormSettings() {
		return this.form.formSettings;
	}
	setFormSettings(formSettings) {
		this.form.formSettings = formSettings;
	}
	onChangeFormValueHook(newFormValue) {
		if(typeof this.form.onChangeFormValue == "function"){
			this.form.onChangeFormValue(newFormValue);
		}
	}
	updateViewForm() {
		this.form.forceUpdate();
	}
	updateFormValidationData(formValidation, callback = () => {}, updateView) {
		this.getFormSettings().formValidation = formValidation;
		if(typeof callback == "function") {
			callback(formValidation);
		}
		if(updateView === true || updateView !== false) {
			this.updateViewForm();
		}
	}
	resetFormValidation() {
		this.getFormSettings().formValidation = null;
		this.updateViewForm();
	}
	updateValueForm(nameInput, valueInput, validateForm = false, updateView) {
		let formValue = Object.assign({}, this.getFormSettings().formValue);
		formValue[nameInput] = valueInput;
		this.getFormSettings().formValue = formValue;
		if(validateForm) {
			const formValidation = this.getFormValidation(false);
			this.updateFormValidationData(formValidation, false, false);
		}

		if(updateView === true || typeof updateView === 'undefined') {
			this.updateViewForm();
		}
		this.onChangeFormValueHook(formValue);
	}
	/**
	 * inputs: [
	 * 	{
	 * 		nameInput: string,
	 * 		valueInput: string
	 * 	}
	 * ]
	 */
	updateValuesForm(inputs, updateView) {
		let formValue = Object.assign({}, this.getFormSettings().formValue);
		inputs.forEach((input) => {
			formValue[input.nameInput] = input.valueInput;
		});
		this.getFormSettings().formValue = formValue;
		if(updateView === true || typeof updateView === 'undefined') {
			this.updateViewForm();
		}
	}
	/**
	 * methods: [
	 * 	{
	 * 		nameMethod: string,
	 * 		func: func
	 * 	}
	 * ]
	 */
	expandMethods(methods) {
		methods.forEach((method) => {
			this[method.name] = method.func;
		});
	}
	getValueForm(){
		return this.getFormSettings().formValue;
	}
	getValueInputForm(nameInput) {
		return this.getFormSettings().formValue[nameInput];
	}

  getGlobalErrors() {
		return this.form.props.errorText != "" && this.form.props.errorText;
	}

  getFormErrorText = () => {
		if(!this.getGlobalErrors()) {
			return this.getFirstErrorTextForm();
		} else {
			return this.form.props.errorText;
		}
	}

  resetValidation = () => {
		if(!this.getGlobalErrors()) {
			this.resetFormValidation();
		} else {
			if(this.form.props.callbackClearError){
        this.form.props.callbackClearError();
      }
		}
	}

  renderFormError() {
		return <AlertForm
			error={this.getFormErrorText()}
			typeAlert = "danger"
			callbackClose = {this.resetValidation}
		/>
	}
}
