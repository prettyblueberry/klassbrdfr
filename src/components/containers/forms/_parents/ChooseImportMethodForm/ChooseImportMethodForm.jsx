import * as React from "react";
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import {
	HeaderTextSmall,
	HeaderText,
	BackButton,
	DescriptionButton,
	RoundIconMiddle,
	Separator,
} from "../../../../presentational";
import {FormAPI} from "../../_system/FormAPI";
import classnames from "classnames";
import "./ChooseImportMethodForm.scss";
import {KRClient} from "@klassroom/klassroom-sdk-js";

class ChooseImportMethodFormComponent extends React.Component {
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
				class: "",
			},
			formRules: {
				class: [
					{
						type: "not_empty",
						errorText: this.$t("subject required")
					},
				],
			}
		});
		this.steps = this.props.stepsAPI;
		this.chooseClassData = this.steps.getStepData("ChooseClassStep").data;
		this.modal = this.props.modalAPI;
	}
	componentDidMount() {
		this.modal.enableBackButton(this.onBack);
	}
	onChangeClass = (value, submit = false) => {
		this.form.updateValueForm('class', value);
		if(submit) {
			this.onSubmit();
		}
	}
	renderCountMembers(countMembers, _className) {
		return (
		<div className="import-parents-choose-class-form__count-members">
			<div className="import-parents-choose-class-form__count-members__h1">{_className}</div>
			{countMembers} {this.$t("members")}
		</div>
		)
	}
	getClasses = () => {
		return [
			{
				value: "CP1",
				title: this.renderCountMembers(30, "CP1"),
			},
			{
				value: "CP2",
				title: this.renderCountMembers(26, "CP2"),
			},
			{
				value: "CP3",
				title: this.renderCountMembers(10, "CP3"),
			},
			{
				value: "CP4",
				title: this.renderCountMembers(15, "CP4"),
			},
			{
				value: "CP5",
				title: this.renderCountMembers(16, "CP5"),
			},
		]
	}
	nextStep = () => {
		this.steps.addStep('ChooseImportMethod');
	}
	checkDisabledButton () {
		const enabled = this.form.getValueInputForm('class') && this.form.getValueInputForm('class') != "";
		return !enabled;
	}
	onBack = () => {
		this.steps.goBack();
	}
	selectCSVMethod = () => {
		this.steps.addStep('CSV_Step1');
	}
	selectManualMethod = () => {
		this.steps.addStep('ManualImport');
	}
	render() {
		return (
		<div className="choose-import-method-form">
			<HeaderTextSmall style={{marginTop: "50px", fontSize: "13px"}} textJSX={this.$t("ADD PARENTS TO {{name}}",{name:KRClient.getInstance().classrooms[this.chooseClassData.class].name})}/>
			<HeaderText style={{marginBottom: "30px"}} textJSX={this.$t("Choose your import method")}/>
			<DescriptionButton
				style={{maxWidth: "490px"}}
				leftIconJSX={
					<RoundIconMiddle icon="multimedia-campaign" color="blue"/>
				}
				text1JSX={this.$t("Import from CSV file")}
				text2JSX={this.$t("I already have a CSV file organized with all the parents I want to import.")}
				onClick={this.selectCSVMethod}
			/>
			<Separator textJSX={this.$t("or")}/>
			<DescriptionButton
				leftIconJSX={
					<RoundIconMiddle icon="sms-campaign" color="coral"/>
				}
				text1JSX={this.$t("Import manually")}
				text2JSX={this.$t("I have all the information and I want to manually import the parents.")}
				style={{boxShadow: "none", maxWidth: "490px"}}
				onClick={this.selectManualMethod}
			/>
		</div>)
	}
}

ChooseImportMethodFormComponent.propTypes = {
	stepsAPI: PropTypes.object.isRequired,
}
export const ChooseImportMethodForm = withTranslation()(ChooseImportMethodFormComponent)
