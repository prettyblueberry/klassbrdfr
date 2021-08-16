import * as React from "react";
import { withTranslation } from 'react-i18next';
import {
	CurrentYear,
	Actions,
	BackButton,
	RoundIconMiddle,
	HeaderTextSmall,
	HeaderText,
	RoundIconSmall,
} from "../../../../presentational";
import {SMSMethod} from "../../../blocks";
import { ModalSystem } from '../../../../containers/modals';
import PropTypes from 'prop-types';
import "./SMSBroadcastingForm.scss";

class SMSBroadcastingFormComponent extends React.Component {
	static $t;
	static i18n;
	form = {};
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
		this.form = this.props.formAPI;
		this.form.setFormSettings({
			formValidation: null,
			formValue: {
				message: "",
				broadcastingMethod: "classic",
			},
			formRules: {
				message: [
					{
						type: "not_empty",
						errorText: this.$t("message required")
					},
				],
				broadcastingMethod: [
					{
						type: "not_empty",
						errorText: this.$t("broadcasting method required")
					},
				]
			}
		});
		this.steps = this.props.stepsAPI;
		this.state = {
			
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
					this.props.callbackSubmit(data);
				}
			}
		)
	}
	goBack = () => {
		this.steps.goBack();
	}
	onChangeBroadcastingMethod = (value, submit = false) => {
		this.form.updateValueForm('broadcastingMethod', value);
		if(submit) {
			this.onSubmit();
		}
	}
	renderIconChecker(nameInput, valueInput) {
		const isValid = this.form.inputIsValid(nameInput, valueInput);
		if(isValid){
			return <RoundIconSmall className="sms-broadcasting-icon-checker--valid" color="green" icon="check"/>	
		}
		return <RoundIconSmall className="sms-broadcasting-icon-checker" color="white" icon="check"/>
	}
	renderMyMessage() {
		return (
		<div className="form-block">
			{this.renderIconChecker('message', this.form.getValueInputForm('message'))}
			<HeaderText textJSX={this.$t("My message")}/>
			<HeaderTextSmall className="sms-broadcasting__h1" textJSX={this.$t("Edit my message")}/>
		</div>
		)
	}
	renderBroadcastingMethod() {
		return (
		<div className="form-block">
			{this.renderIconChecker('broadcastingMethod', this.form.getValueInputForm('broadcastingMethod'))}
			<HeaderText textJSX={this.$t("Broadcasting")}/>
			<HeaderTextSmall className="sms-broadcasting__h1" textJSX={this.$t("Choose your broadcasting method")}/>
			<SMSMethod
				h1={this.$t("Classic (Only SMS)")}
				h2={this.$t("Send {{members}} SMS message to all selected parents", {members: 32})}
				icon="sms-campaign"
				onClick={() => { this.onChangeBroadcastingMethod("classic") }}
				checked={this.form.getValueInputForm('broadcastingMethod') == "classic"}
			/>
			<SMSMethod
				h1={this.$t("Optimized (SMS + Klassroom message)")}
				h2={this.$t("Send {{members}} SMS & Klassroom message to all selected parents", {members: 32})}
				icon="optimized-campaign"
				onClick={() => { this.onChangeBroadcastingMethod("optimized") }}
				checked={this.form.getValueInputForm('broadcastingMethod') == "optimized"}
			/>
		</div>
		)
	}
	render() {
		return (
			<ModalSystem>
      {({modalAPI}) => {
			this.modalAPI = modalAPI;
			return (
				<form className="sms-broadcasting-form" onSubmit={this.onSubmit}>
					<div className="sms-broadcasting-form__header">
						<BackButton onClick={this.goBack}/>
						<CurrentYear title={this.$t("SCHOOL YEAR")}/>
						{/*<Actions/>*/}
					</div>
					<RoundIconMiddle className="sms-broadcasting-icon1" color="butterscotch" icon="sms-campaign"/>
					<HeaderTextSmall style={{fontSize: "13px"}} textJSX={this.$t("NEW SMS MESSAGE")}/>
					<HeaderText style={{marginBottom: "50px"}} textJSX={this.$t("Create SMS message")}/>
					{/*this.form.renderFormError()*/}
					{this.renderMyMessage()}
					{this.renderBroadcastingMethod()}
				</form>
			)}
		}
		</ModalSystem>
		);
	}
}
SMSBroadcastingFormComponent.propTypes = {
	callbackClearError: PropTypes.func.isRequired,
	errorText: PropTypes.string,
	formAPI: PropTypes.object.isRequired,
}
export const SMSBroadcastingForm = withTranslation()(SMSBroadcastingFormComponent)
