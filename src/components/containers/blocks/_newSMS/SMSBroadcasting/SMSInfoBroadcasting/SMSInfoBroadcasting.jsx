import * as React from "react";
import { withTranslation } from 'react-i18next';
import {
	SMSCredits,
	SMSMessagesRight,
	SMSMessagesRightClassroom,
} from "../../../";
import {withRouter} from 'react-router-dom';
import {
	HeaderText,
	HeaderTextSmall,
	Button,
	RoundIconMiddle,
	Space,
} from "../../../../../presentational";
import PropTypes from 'prop-types';
import "./SMSInfoBroadcasting.scss";

class SMSInfoBroadcastingComponent extends React.Component {
	static translate;
	static i18n;
	modalAPI = {};
	form = {};
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
		this.form = this.props.formAPI;
		this.steps = this.props.stepsAPI;
		this.modalAPI = null;
	}
	hideModal = () => {
		if(this.modalAPI) {
			this.modalAPI.hideModal();
			this.props.history.push("/messages");
		}
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
	sendSMS = () => {
		if(this.form.getFormValidation(false).valid) {
			this.modalAPI = kbApp.modalAPI.dialog({
				dialogClassName: "sms-info-broadcasting__message",
				//title: this.$t("Edit class"),
				closeButton: false,
				message: this.renderModal()
			});
		}
	}
	cancel = () => {
		this.props.history.push("/choose-message");
	}
	disableNext() {
		return !this.form.getFormValidation(false).valid;
	}
	renderKlassroomMessageBlock () {
		if(this.form.getValueForm() && this.form.getValueForm().broadcastingMethod == "optimized") {
			return (
				<>
					<div className="sms-info-broadcasting__plus">
						<div className="icon klassicon-add"></div>
					</div>
					<SMSMessagesRightClassroom/>
				</>
			);
		}
		return null;
	}
	renderLabel() {
		if(this.form.getValueForm() && this.form.getValueForm().broadcastingMethod == "optimized") {
			return (
				<div className="sms-info-broadcasting__label-container">
					<div className="sms-info-broadcasting__label-left">{this.$t("Broadcasting")}</div>
					<div className="sms-info-broadcasting__label-right">{this.$t("Optimized")}</div>
				</div>
			);
		}
		return (
			<div className="sms-info-broadcasting__label-container">
				<div className="sms-info-broadcasting__label-left">{this.$t("Broadcasting")}</div>
				<div className="sms-info-broadcasting__label-right">{this.$t("Classic")}</div>
			</div>
		);
	}
	render() {
		return (
			<div className="sms-info-broadcasting">
				<div className="sms-info-broadcasting__blocks">
					<HeaderText className="sms-info-broadcasting__h1" textJSX={this.$t("Messages information")}/>
					<RoundIconMiddle className="sms-info-broadcasting__icon" color="butterscotch" icon="views"/>
					<HeaderTextSmall className="sms-info-broadcasting__h2" style={{marginBottom: "40px"}} textJSX={this.$t("Check information of your SMS message")}/>
					<SMSCredits currentCredits={536}/>
					{this.renderLabel()}
					<SMSMessagesRight count={32}/>
					{this.renderKlassroomMessageBlock()}
				</div>
				<Space height="60px"/>
				<div className="sms-info-broadcasting__buttons">
					<Button disabled={this.disableNext()} className="sms-info-broadcasting__next" onClick={this.sendSMS} iconType="send" typeDesign="primary" name={this.$t("Broadcast the message")}/>
					<Button className="sms-info-broadcasting__cancel" onClick={this.cancel} iconType="without-icon" typeDesign="transparent-blue" name={this.$t("Cancel")}/>
				</div>
			</div>
		);
	}
}
SMSInfoBroadcastingComponent.propTypes = {
	formAPI: PropTypes.object.isRequired,
}
const TranslatedComponent = withTranslation()(SMSInfoBroadcastingComponent);
export const SMSInfoBroadcasting = withRouter(props => <TranslatedComponent {...props}/>)
