import * as React from "react";
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import {
	Button,
	HeaderTextSmall,
	HeaderText,
	BackButton,
	RoundIconSmall,
	FileInput,
} from "../../../../presentational";
import {deepClone} from "../../../../../lib/Utils.js";
import {FormAPI} from "../../_system/FormAPI";
import classnames from "classnames";
import "./CSV_Step1Form.scss";

class CSV_Step1FormComponent extends React.Component {
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
				csv_file: null,
			},
			formRules: {
				csv_file: [
					{
						type: "not_empty",
						errorText: this.$t("csv required")
					},
				]
			}
		});
		this.steps = this.props.stepsAPI;
		this.modal = this.props.modalAPI;
	}
	componentDidMount() {
		const CSV_Step1Data = this.steps.getStepData("CSV_Step1");
		if(CSV_Step1Data && CSV_Step1Data.data) {
			this.form.updateValuesForm([
				{
					nameInput: "csv_file",
					valueInput: CSV_Step1Data.data.csv_file || "",
				},
			]);
		}
		this.modal.enableBackButton(this.onBack);
	}
	onChangeFormValue = (formValue) => {
		// data of step updated here
		this.steps.updateStepData(formValue, this);
	}
	onChangeCSVFile = (value, submit = false) => {
		this.form.updateValueForm("csv_file", value);
		if(submit) {
			this.onSubmit();
		}
	}
	nextStep = () => {
		this.steps.addStep('CSV_Step2');
	}
	onBack = () => {
		this.steps.goBack();
	}
	checkDisabledButton() {
		return !this.form.getFormValidation(false).valid;
	}
	renderStatus() {
		if(!this.form.getFormValidation(false).valid) {
			return (<div className="csv_step-1-form__status-text">
				<div className="csv_step-1-form__status__h1">⚠️ {this.$t("For optimal matching, please check that your CSV file has the following columns")}</div>
				<div className="csv_step-1-form__status__h2" dangerouslySetInnerHTML={{__html: this.$t("First name, Last name, Mobile phone, Email and Internal class ID (optional)")}}></div>
			</div>)
		}
		return (<div className="csv_step-1-form__status-text--success">
			<div className="icon klassicon-check"></div> {this.$t("Your CSV file has been successfully uploaded")}
		</div>)
	}
	renderIconChecker() {
		const isValid = this.form.getFormValidation(false).valid;
		if(isValid){
			return <RoundIconSmall className="csv_step-1-form-check--valid" color="green" icon="check"/>
		}
		return <RoundIconSmall className="csv_step-1-form-check" color="white" icon="check"/>
	}
	render() {
		return (
		<div className="csv_step-1-form">
			<div className="csv_step-1-form__container">
				<div className="csv_step-1-form__status">
					<HeaderTextSmall className="csv_step-1-form__h2" textJSX={this.$t("STEP 1")}/>
					{this.renderIconChecker('from', this.form.getValueInputForm('from'))}
				</div>
				<HeaderText className="csv_step-1-form__h3" textJSX={this.$t("Import from CSV file")}/>
				<HeaderTextSmall className="csv_step-1-form__h4" textJSX={this.$t("Browse your computer and add your CSV file to import all your parents.")}/>
				<FileInput
					label={this.$t("Your file")}
					value={this.form.getValueInputForm('csv_file')}
					onChange={(value) => this.onChangeCSVFile(value, false)}
					required={true}
					description={this.$t("Acceptable file type: CSV files with ; or , delimited")}
					mimes={[
						"text/csv"
					]}
				/>
				{this.renderStatus()}
			</div>
			<Button
				disabled={this.checkDisabledButton()}
				className="csv_step-1-form__submit"
				onClick={this.nextStep}
				typeDesign="primary"
				name={this.$t("Continue matching")}
			/>
		</div>)
	}
}

CSV_Step1FormComponent.propTypes = {
	stepsAPI: PropTypes.object.isRequired,
}
export const CSV_Step1Form = withTranslation()(CSV_Step1FormComponent)
