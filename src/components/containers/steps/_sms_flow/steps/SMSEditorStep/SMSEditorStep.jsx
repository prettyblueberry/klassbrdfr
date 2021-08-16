import * as React from "react";
import { withTranslation } from 'react-i18next';
import {MessagesLayout} from "../../../../layouts";
import {
	HeaderBlock,
	SMSInfo,
} from '../../../../blocks';
import {NewSMSMessageForm, FormAPI} from "../../../../forms";
import {KRClient} from "@klassroom/klassroom-sdk-js";
import "./SMSEditorStep.scss";

class SMSEditorStepComponent extends React.Component {
	static $t;
	static i18n;
	form = {};
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
		this.state = {
			errorText: ''
		}
		this.steps = this.props.stepsAPI;
		this.form = new FormAPI(this);
	}
	componentDidMount() {
		const SMSEditorStepData = this.steps.getStepData("SMSEditor");
		if(SMSEditorStepData && SMSEditorStepData.data) {
			this.form.updateValuesForm([
				{
					nameInput: "subject",
					valueInput: SMSEditorStepData.data.subject || "",
				},
				{
					nameInput: "from",
					valueInput: SMSEditorStepData.data.from || "",
				},
				{
					nameInput: "to",
					valueInput: SMSEditorStepData.data.to || [],
				},
				{
					nameInput: "message",
					valueInput: SMSEditorStepData.data.message || "",
				}
			]);
		}
	}
	clearErrorForm = () => {
		this.setState({
			errorText: ""
		});
	}
	onChangeFormValue = (formValue) => {
		// data of step updated here
		this.steps.updateStepData(formValue, this);
	}
	renderForm() {
		return (
			<NewSMSMessageForm
				stepsAPI = {this.steps}
				formAPI = {this.form}
				errorText = {this.state.errorText}
				callbackClearError = {this.clearErrorForm}
			/>
		)
	}
	render() {
		return (
			<MessagesLayout
				leftPanelHTML={this.renderForm()}
				rightPanelHTML={<SMSInfo stepsAPI={this.steps} formAPI = {this.form}/>}
				headerHTML={<HeaderBlock pageType="school"/>}
			/>
		);
	}
}
export const SMSEditorStep = withTranslation()(SMSEditorStepComponent)
