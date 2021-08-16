import * as React from "react";
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import {
	Button,
	HeaderTextSmall,
	HeaderText,
	RoundIconSmall,
} from "../../../../presentational";
import {ListStep2} from "../../../../containers/lists";
import {FormAPI} from "../../_system/FormAPI";
import classnames from "classnames";
import "./CSV_Step2Form.scss";

class CSV_Step2FormComponent extends React.Component {
	static $t;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
		this.form = new FormAPI(this);
		this.columnsVariants = [
			{
				value: "first_name",
				title: this.$t("First name"),
			},
			{
				value: "last_name",
				title: this.$t("Last name"),
			},
			{
				value: "phone",
				title: this.$t("Mobile Phone"),
			},
			{
				value: "email",
				title: this.$t("Email"),
			}
		];
		this.delimiters = [
			{
				value: ",",
				title: ",",
			},
			{
				value: ";",
				title: ";",
			}
		];
		this.form.setFormSettings({
			formValidation: null,
			formValue: {
				remove_header: false,
				columns: {},
				delimiter: ",",
			},
			formRules: {
				delimiter: [
					{
						type: "not_empty",
						errorText: this.$t("Delimiter required")
					},
				],
				columns: [
					{
						type: "function",
						validationProperties: {
							func: (selectedColumns) => {
								if(selectedColumns) {
									return this.columnsVariants.length === Object.keys(selectedColumns).length;
								}
								return false;
							}
						},
						errorText: this.$t("columns not filled")
					},
				]
			}
		});
		this.steps = this.props.stepsAPI;
		this.modal = this.props.modalAPI;
	}
	componentDidMount() {
		const CSV_Step2Data = this.steps.getStepData("CSV_Step2");
		if(CSV_Step2Data && CSV_Step2Data.data) {
			this.form.updateValuesForm([
				{
					nameInput: "remove_header",
					valueInput: CSV_Step2Data.data.remove_header,
				},
				{
					nameInput: "columns",
					valueInput: CSV_Step2Data.data.columns || "",
				},
				{
					nameInput: "delimiter",
					valueInput: CSV_Step2Data.data.delimiter || "",
				},
			]);
		}
	
		this.modal.enableBackButton(this.onBack);
	}
	// this is hook
	onChangeFormValue = (formValue) => {
		// data of step updated here
		this.steps.updateStepData(formValue, this);
	}
	nextStep = () => {
		this.steps.addStep('CSV_Step3');
	}
	onBack = () => {
		this.steps.goBack();
	}
	checkDisabledButton() {
		return !this.form.getFormValidation(false).valid;
	}
	renderIconChecker() {
		const isValid = this.form.getFormValidation(false).valid;
		if(isValid){
			return <RoundIconSmall className="csv_step-2-form-check--valid" color="green" icon="check"/>
		}
		return <RoundIconSmall className="csv_step-2-form-check" color="white" icon="check"/>
	}
	render() {
		return (
		<div className="csv_step-2-form">
			<div className="csv_step-2-form__container">
				<div className="csv_step-2-form__status">
					<HeaderTextSmall className="csv_step-2-form__h2" textJSX={this.$t("STEP 2")}/>
					{this.renderIconChecker('from', this.form.getValueInputForm('from'))}
				</div>
				<HeaderText className="csv_step-2-form__h3" textJSX={this.$t("<coral>Match</coral> your CSV columns")}/>
				<HeaderTextSmall className="csv_step-2-form__h4" textJSX={this.$t("Now let's match the columns in your uploaded file to Klassboard.")}/>
				<ListStep2
					columnsVariants={this.columnsVariants}
					delimiters={this.delimiters}
					formAPI={this.form}
					stepsAPI={this.steps}
				/>
			</div>
			<Button
				disabled={this.checkDisabledButton()}
				className="csv_step-2-form__submit"
				onClick={this.nextStep}
				typeDesign="primary"
				name={this.$t("Continue matching")}
			/>
		</div>)
	}
}

CSV_Step2FormComponent.propTypes = {
	stepsAPI: PropTypes.object.isRequired,
}
export const CSV_Step2Form = withTranslation()(CSV_Step2FormComponent)
