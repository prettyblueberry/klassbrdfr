import * as React from "react";
import { withTranslation } from 'react-i18next';
import {MessagesLayout} from "../../../../layouts";
import {
	HeaderBlock,
	MultimediaPreviewBlock,
} from 'blocks';
import {
	HeaderText,
	HeaderTextSmall,
	Button,
	RoundIconMiddle
} from "presentational";
import * as moment from 'moment';
import {withRouter} from 'react-router-dom';
import {NewMultimediaMessageForm, FormAPI} from "forms";
import {KRClient, KRCampaign, KRPost, KRUtils} from "@klassroom/klassroom-sdk-js";
import "./MultimediaEditorStep.scss";
import {ModalManager} from "containers/modals"

class MultimediaEditorStepComponent extends React.Component {
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
		const t = KRClient.getInstance();
		console.log(t)
	}
	componentDidMount() {
		const MultimediaEditorStepData = this.steps.getStepData("MultimediaEditorStep");
		if(MultimediaEditorStepData && MultimediaEditorStepData.data) {
			this.form.updateValuesForm([
				{
					nameInput: "subject",
					valueInput: MultimediaEditorStepData.data.subject || "",
				},
				{
					nameInput: "from",
					valueInput: MultimediaEditorStepData.data.from || "",
				},
				{
					nameInput: "classes",
					valueInput: MultimediaEditorStepData.data.classes || [],
				},
				{
					nameInput: "message",
					valueInput: MultimediaEditorStepData.data.message || "",
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
		this.forceUpdate();
	}
	callbackSubmit = () => {
		const data = this.form.getValueForm();
		const post = data.message;
		if(post.id && !post.remind_type){

			kbApp.modalAPI.confirm(this.$t("Would you like to notify the class about the update?")
			,(val) => {
					if(val){
						post.remind_type = KRPost.Type.message;
					}else{
						post.remind_type = null
					}
					this.checkSchedule();
				},true
			);
		}else{
			this.checkSchedule();
		}
	}

	checkSchedule = ()=>{
		const data = this.form.getValueForm();
		const post = data.message;

		if(post.require_reply && post.require_signature){
			ModalManager.getInstance().alert("",this.$t("You can only choose Signature or With Reply"));
		} else {

			if(post.scheduled_at){
					kbApp.modalAPI.confirm(this.$t("You are about to schedule a post on {{date}}", {date: moment(post.scheduled_at).locale(this.i18n.language).format("lll")})
					,(val) => {
						if(val){
								this.send();
							}
						},true
					);
				} else {
					this.send();
				}
		}

	}

	send = () => {
		if(this.form.getFormValidation(false).valid) {

			var data = this.form.getValueForm();
			var campaign = new KRCampaign();
			if(data.campaignID){
					campaign = KRClient.getInstance().campaigns[data.campaignID];
					if(!campaign){
						ModalManager.getInstance().alert(this.$t("Error"),this.$t("This message doesn't exist."))
						return;
					}
			}

			campaign.name = data.subject;
			campaign.classrooms = data.to;
			campaign.post = data.message;

			showLoader("Sending")

			campaign.save(data.attachments,(progress)=>{
					showLoader("Sending")
			}).then(()=>{

				this.modalAPI = kbApp.modalAPI.dialog({
					dialogClassName: "sms-info-broadcasting__message",
					//title: this.$t("Edit class"),
					closeButton: false,
					message: this.renderModal()
				});

			}).catch((error)=>{
				ModalManager.getInstance().alert(this.$t("Error"), error.message);
			}).finally(()=>{
					hideLoader();
			})


			/**/
		}
	}
	hideModal = () => {
		if(this.modalAPI) {
			this.modalAPI.hideModal();
			this.props.history.push("/messages");
		}
	}
	renderForm() {
		return (
			<NewMultimediaMessageForm
				stepsAPI = {this.steps}
				formAPI = {this.form}
				errorText = {this.state.errorText}
				callbackClearError = {this.clearErrorForm}
				callbackSubmit={this.callbackSubmit}
			/>
		)
	}
	renderModal = (modalAPI) => {
		// using keys for bug in bootstrap react.
		return (
		<div className="sms-info-broadcasting__message-body">
			<RoundIconMiddle key="broadcasting__message-body_1" style={{width: "80px", height: "80px", fontSize: "37px"}} icon="check" color="green"/>
			<HeaderTextSmall key="broadcasting__message-body_2" className="sms-info-broadcasting__message-body__h1" style={{marginTop: "20px"}} textJSX={this.$t("CONGRATULATIONS")}/>
			<HeaderText key="broadcasting__message-body_3" className="sms-info-broadcasting__message-body__h2" style={{marginBottom: "10px"}} textJSX={this.$t("Your message has been sent!")}/>
			<HeaderTextSmall key="broadcasting__message-body_4" className="sms-info-broadcasting__message-body__h3" style={{width: "490px", marginBottom: "30px"}} textJSX={this.$t("Congratulations! You sent your first message! Now you can Go to your message to view the analytics of your messages.")}/>
			<Button key="broadcasting__message-body_5" onClick={this.hideModal} typeDesign="primary" name={this.$t("Go to my message")}/>
		</div>)
	}
	render() {
		return (
			<MessagesLayout
				leftPanelHTML={this.renderForm()}
				rightPanelHTML={<MultimediaPreviewBlock callbackSubmit={this.callbackSubmit} stepsAPI={this.steps} formAPI = {this.form}/>}
				headerHTML={<HeaderBlock pageType="school"/>}
			/>
		);
	}
}
const TranslatedComponent = withTranslation()(MultimediaEditorStepComponent);
export const MultimediaEditorStep = withRouter(props => <TranslatedComponent {...props}/>)
