import * as React from "react";
import { withTranslation } from 'react-i18next';
import {MessagesLayout} from "../../../../layouts";
import {
	HeaderBlock,
	SMSInfoBroadcasting,
} from '../../../../blocks';
import {SMSBroadcastingForm, FormAPI} from "../../../../forms";
import {KRClient} from "@klassroom/klassroom-sdk-js";
import "./SMSBroadcastingStep.scss";

class SMSBroadcastingStepComponent extends React.Component {
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
		// here link to form, but all logic and data in form
		this.form = new FormAPI(this);
	}
	componentDidMount() {
		const SMSEditorStepData = this.steps.getStepData("SMSEditor");
		if(SMSEditorStepData && SMSEditorStepData.data) {
			this.form.updateValueForm("message", SMSEditorStepData.data.message || "");
		}
	}
	clearErrorForm = () => {
		this.setState({
			errorText: ""
		});
	}
	renderForm() {
		return (
			<SMSBroadcastingForm
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
				rightPanelHTML={<SMSInfoBroadcasting formAPI = {this.form}/>}
				headerHTML={<HeaderBlock pageType="school"/>}
			/>
		);
	}
}
export const SMSBroadcastingStep = withTranslation()(SMSBroadcastingStepComponent)
