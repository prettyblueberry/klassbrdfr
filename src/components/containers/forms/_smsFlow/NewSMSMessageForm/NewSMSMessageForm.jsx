import * as React from "react";
import { withTranslation } from 'react-i18next';
import {
	Button,
	Button3,
	CurrentYear,
	Actions,
	BackButton,
	RoundIconMiddle,
	HeaderTextSmall,
	HeaderText,
	TextInput2,
	Radios,
	TextArea,
	RoundIconSmall,
} from "../../../../presentational";
import {withRouter} from 'react-router-dom';
import { ModalSystem, ModalMembers } from '../../../../containers/modals';
import PropTypes from 'prop-types';
import "./NewSMSMessageForm.scss";
import {KRClient} from "@klassroom/klassroom-sdk-js";

class NewSMSMessageFormComponent extends React.Component {
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
				subject: "",
				from: "school",
				message: "",
				to: [],
			},
			formRules: {
				subject: [
					{
						type: "not_empty",
						errorText: this.$t("subject required")
					},
				],
				message: [
					{
						type: "not_empty",
						errorText: this.$t("message required")
					},
				],
				from: [
					{
						type: "not_empty",
						errorText: this.$t("from required")
					},
				],
				to: [
					{
						type: "not_empty",
						errorText: this.$t("to required")
					},
				]
			}
		});
		this.state = {
			countAllMembers: 90,
			optionsFrom: [
				{
					name: "Sousa Mendes School",
					value: "school"
				},
				{
					name: "Julien Bernard",
					value: "admin"
				},
			],
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
	onBack = () => {
		this.props.history.push("/choose-message");
	}
	onChangeSubject = (value, submit = false) => {
		this.form.updateValueForm('subject', value);
		if(submit) {
			this.onSubmit();
		}
	}
	onChangeFrom = (value, submit = false) => {
		this.form.updateValueForm('from', value);
		if(submit) {
			this.onSubmit();
		}
	}
	onChangeMessage = (value, submit = false) => {
		this.form.updateValueForm('message', value);
		if(submit) {
			this.onSubmit();
		}
	}
	onChangeTo = (value, submit = false) => {
		this.form.updateValueForm('to', value);
		if(submit) {
			this.onSubmit();
		}
	}
	getOptionsFrom() {
		return [{
			name: KRClient.getInstance().organization.name,
			value: "school"
		}];
	}
	onSubmitMembers = (data) => {
		this.onChangeTo(data.checkedMembers);
		this.modalAPI.hideModal();
	}
	showMembersModal = () => {
		this.modalAPI = kbApp.modalAPI.dialog({
			dialogClassName: "members-modal__root",
			//title: this.$t("Edit class"),
			closeButton: true,
			message: <ModalMembers
				callbackCancel={() => this.modalAPI.hideModal()}
				callbackSubmit={this.onSubmitMembers}
			/>
		});
	}
	getCountAllMembers() {
		return this.state.countAllMembers;
	}
	renderIconChecker(nameInput, valueInput) {
		const isValid = this.form.inputIsValid(nameInput, valueInput);
		if(isValid){
			return <RoundIconSmall className="new-sms-message-icon-checker--valid" color="green" icon="check"/>
		}
		return <RoundIconSmall className="new-sms-message-icon-checker" color="white" icon="check"/>
	}
	renderSubjectBlock() {
		return (
		<div className="form-block">
			{this.renderIconChecker('subject', this.form.getValueInputForm('subject'))}
			<HeaderText textJSX={this.$t("Subject")}/>
			<HeaderTextSmall className="new-sms-message__h1" textJSX={this.$t("What is the subject of this campaign?")}/>
			<TextInput2
				autofocus={true}
				onChange={this.onChangeSubject}
				value={this.form.getValueInputForm('subject')}
				type="text"
				label={this.$t("Subject")}
				maxCountChars={100}
			/>
		</div>
		)
	}
	renderFormBlock() {
		return (
		<div className="form-block">
			{this.renderIconChecker('from', this.form.getValueInputForm('from'))}
			<HeaderText textJSX={this.$t("From")}/>
			<HeaderTextSmall className="new-sms-message__h1" textJSX={this.$t("Who is sending this campaign?")}/>
			<Radios
				isInline={true}
				options={this.getOptionsFrom()}
				selectedOption={this.form.getValueInputForm('from')}
				onChange={this.onChangeFrom}
			/>
		</div>
		)
	}
	renderToBlock() {
		return (
		<div className="form-block">
			{this.renderIconChecker('to', this.form.getValueInputForm('to'))}
			<HeaderText textJSX={this.$t("To")}/>
			<HeaderTextSmall className="new-sms-message__h1" textJSX={this.$t("Which peoples will receive this campaign?")}/>
			<HeaderText className="new-sms-message__to_h" style={{textAlign: "center"}} textJSX={this.$t("You have {{count}} members selected", {count: this.form.getValueInputForm('to').length})}/>
			<HeaderTextSmall style={{textAlign: "center",fontSize: "14px", marginBottom: "30px"}} textJSX={this.$t("{{count}} members in your school", {count: this.getCountAllMembers()})}/>
			<Button3 style={{marginTop: "36px"}} iconType="add-white" onClick={this.showMembersModal} title={this.$t('Import members')} />
		</div>
		)
	}
	renderMessageBlock() {
		return (
		<div className="form-block">
			{this.renderIconChecker('message', this.form.getValueInputForm('message'))}
			<HeaderText textJSX={this.$t("Message")}/>
			<HeaderTextSmall className="new-sms-message__h1" textJSX={this.$t("What message do you want to share?")}/>

			<TextArea
				onChange={this.onChangeMessage}
				value={this.form.getValueInputForm('message')}
				maxCountChars={160}
				label={this.$t("Your message")}
			/>
		</div>
		)
	}
	render() {
		return (
			<ModalSystem>
      {({modalAPI}) => {
			//this.modalAPI = modalAPI;
			return (
				<form className="new-sms-message-form" onSubmit={this.onSubmit}>
					<div className="new-sms-message-form__header">
						<BackButton onClick={this.onBack}/>
						<CurrentYear title={this.$t("SCHOOL YEAR")}/>
						{/*<Actions/>*/}
					</div>
					<RoundIconMiddle className="new-sms-message-icon1" color="butterscotch" icon="sms-campaign"/>
					<HeaderTextSmall style={{fontSize: "13px"}} textJSX={this.$t("NEW SMS MESSAGE")}/>
					<HeaderText style={{marginBottom: "50px"}} textJSX={this.$t("Create SMS message")}/>
					{/*this.form.renderFormError()*/}
					{this.renderSubjectBlock()}
					{this.renderFormBlock()}
					{this.renderToBlock()}
					{this.renderMessageBlock()}
				</form>
			)}
		}
		</ModalSystem>
		);
	}
}
NewSMSMessageFormComponent.propTypes = {
	callbackClearError: PropTypes.func.isRequired,
	errorText: PropTypes.string,
	formAPI: PropTypes.object.isRequired,
}
const TranslatedComponent = withTranslation()(NewSMSMessageFormComponent);
export const NewSMSMessageForm = withRouter(props => <TranslatedComponent {...props}/>)
