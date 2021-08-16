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
	EditorMessage,
	RoundIconSmall,
} from "presentational";
import Select from 'react-select';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {queryStringToObject} from "utils";
import {MessageDetailData} from "mockup-data";
import {KRClient, KRUtils, KRPost} from "@klassroom/klassroom-sdk-js";
import { ModalSystem, ModalCombolist } from 'containers/modals';
import {ModalManager} from "containers/modals"

import "./NewMultimediaMessageForm.scss";

class NewMultimediaMessageFormComponent extends React.Component {
	static $t;
	static i18n;
	form = {};
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
		this.steps = this.props.stepsAPI;
		this.form = this.props.formAPI;


		var initPost = new KRPost();
		initPost.user = KRClient.getInstance().organization.toUser()

		this.form.setFormSettings({
			formValidation: null,
			formValue: {
				subject: "",
				from: 'school',
				campaignID: null,
				message: initPost,
				attachments:[],
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
					type: "function",
					validationProperties: {
						func: (post) => {
							return post && ((post.text && post.text.trim().length > 0) || this.form.getValueForm().attachments.length );
						}
					},
					errorText: "message required"
				}],
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
			selectedOption: null,
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
		this.options = [

		];
		KRUtils.each(KRClient.getInstance().classrooms,(classroomID,classroom) => {
			this.options.push({
				value: classroomID,
				label: classroom.name,
			});
		});
	}
	componentDidMount(){
		this.checkEditing();
	}
	checkEditing = () => {
		const id = queryStringToObject().id;

	if(id){
				KRClient.getInstance().loadCampaign(id).then(()=>{

						if(KRClient.getInstance().campaigns[id]){

							let campaign = KRClient.getInstance().campaigns[id];

							this.form.updateValuesForm([
								{
									nameInput: "subject",
									valueInput: campaign.name
								},
								{
									nameInput: "message",
									valueInput: campaign.post
								},

								{
									nameInput: "to",
									valueInput: campaign.classrooms
								},

								{
									nameInput: "campaignID",
									valueInput: campaign.id
								}
							]);


						}

				}).catch((error)=>{

						ModalManager.getInstance().alert(this.$t("Error"), err.message);


				});



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
		this.props.history.goBack();
	}
	onChangeSubject = (value, submit = false) => {
		this.form.updateValueForm('subject', value);
		if(submit) {
			this.onSubmit();
		}
	}
	onChangeFormValue = (formValue) => {
		// data of step updated here
		this.steps.updateStepData(formValue, this);
	}

	onChangeFrom = (value, submit = false) => {
		this.form.updateValueForm('from', value);
		if(submit) {
			this.onSubmit();
		}
	}
	onChangeMessage = (value, attachments, submit = false) => {
		this.form.updateValueForm('message', value);
		this.form.updateValueForm('attachments', attachments);

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
		},

	];
	}
	onSubmitClasses = (data) => {

		this.onChangeTo(data.checkedItems);
		this.modalAPI.hideModal();
	}


	getClassses = () => {
		let items = Object.values(KRClient.getInstance().classrooms)
		.filter((classroom) =>  classroom.klass != null)
		.map((classroom)=>{
				return {id:classroom.id, title: classroom.name, reference: classroom };
			});
			items.sort((a,b) => {
				let x = a.reference.position;
				let y = b.reference.position;
				if (x < y) {return -1;}
				if (x > y) {return 1;}
				return 0;
			});
			return items
	}

	showClassesModal = () => {
		if(this.getClassses().length){
		this.modalAPI = kbApp.modalAPI.dialog({
			dialogClassName: "members-modal__root",
			//title: this.$t("Edit class"),
			closeButton: true,
			message: <ModalCombolist
				callbackCancel={() => this.modalAPI.hideModal()}
				callbackSubmit={this.onSubmitClasses}
				title = {this.$t("Classes")}
				items = {this.getClassses()}
				checkedItems = {this.form.getValueInputForm('to')}
			/>
		});
	}else{
		ModalManager.getInstance().alert(this.$t("Error"),this.$t("You don't have any classes linked to Klassroom. Go to your classes."))
	}
	}

	getCountAllMembers() {
		return this.state.countAllMembers;
	}
	disableNext() {
		return !this.form.getFormValidation(false).valid;
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
			<HeaderTextSmall className="new-sms-message__h1" textJSX={this.$t("What is the subject of this message?")}/>
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
			<HeaderTextSmall className="new-sms-message__h1" textJSX={this.$t("Who is sending this message?")}/>
			<Radios
				isInline={true}
				options={this.getOptionsFrom()}
				selectedOption={this.form.getValueInputForm('from')}
				onChange={this.onChangeFrom}
			/>
		</div>
		)
	}
	renderClassesBlock() {
		return (
		<div className="form-block">
			{this.renderIconChecker('to', this.form.getValueInputForm('to'))}
			<HeaderText textJSX={this.$t("To")}/>
			<HeaderTextSmall className="new-sms-message__h1" textJSX={this.$t("Which class will receive this message?")}/>

			<HeaderText className="new-sms-message__to_h" style={{textAlign: "center"}} textJSX={this.$t("You have <blue>{{count}} classes</blue> selected", {count: this.form.getValueInputForm('to').length})}/>

			<Button3 style={{marginTop: "36px"}} iconType="add-white" onClick={this.showClassesModal} title={this.$t('Select classes')} />

		</div>
		)
	}
	renderMessageBlock() {
		return (
		<div className="form-block">
			{this.renderIconChecker('message', this.form.getValueInputForm('message'))}
			<HeaderText textJSX={this.$t("Message")}/>
			<HeaderTextSmall className="new-sms-message__h1" textJSX={this.$t("What message do you want to share?")}/>

			<EditorMessage
				onChange={this.onChangeMessage}
				value={this.form.getValueInputForm('message')}
				label={this.$t("Your message")}
				canMix={true}
			/>
		</div>
		)
	}
	render() {
		return (
			<form className="new-sms-message-form" onSubmit={this.onSubmit}>
				<div className="new-sms-message-form__header">
					<BackButton onClick={this.onBack}/>
					<CurrentYear title={this.$t("SCHOOL YEAR")}/>
					<div/>
				</div>
				<RoundIconMiddle className="new-sms-message-icon1" color="purple" icon="multimedia-campaign"/>
				<HeaderTextSmall style={{fontSize: "13px"}} textJSX={this.$t("NEW MULTIMEDIA Message")}/>
				<HeaderText style={{marginBottom: "50px"}} textJSX={this.$t("Create <purple> multimedia message</purple>")}/>
				{/*this.form.renderFormError()*/}
				{this.renderSubjectBlock()}
				{this.renderFormBlock()}
				{this.renderClassesBlock()}
				{this.renderMessageBlock()}
				<Button disabled={this.disableNext()} className="new-sms-message-form__next" onClick={this.onSubmit} iconType="send" typeDesign="primary" name={this.$t("Broadcast the message")}/>
			</form>
		);
	}
}
NewMultimediaMessageFormComponent.propTypes = {
	callbackClearError: PropTypes.func.isRequired,
	errorText: PropTypes.string,
	formAPI: PropTypes.object.isRequired,
}
const TranslatedComponent = withTranslation()(NewMultimediaMessageFormComponent);
export const NewMultimediaMessageForm = withRouter(props => <TranslatedComponent {...props}/>)
