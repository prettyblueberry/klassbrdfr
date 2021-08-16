import * as React from "react";
import { withTranslation } from 'react-i18next';
import {
	SMSCredits,
	SMSRequired,
} from "../../../";
import {
	HeaderText,
	HeaderTextSmall,
	Button,
	RoundIconMiddle,
	Space,
} from "presentational";
import PropTypes from 'prop-types';
import "./SMSInfo.scss";

class SMSInfoComponent extends React.Component {
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
		this.rootBlockRef = React.createRef();
	}
	componentDidMount() {
		this.addListeners();
		this.initWidth();
	}
	componentWillUnmount(){
		this.removeListeners();
	}
	addListeners = () => {
		const leftPanelElement = document.querySelector(".messages-layout");
		if(leftPanelElement){
			leftPanelElement.addEventListener("scroll", this.onScroll);
		}
	}
	removeListeners = () => {
		const leftPanelElement = document.querySelector(".messages-layout");
		if(leftPanelElement){
			leftPanelElement.removeEventListener("scroll", this.onScroll);
		}
	}
	initWidth = () => {
		if(this.rootBlockRef.current) {
			this.rootBlockRef.current.style.width = this.rootBlockRef.current.offsetWidth + "px";
		}
	}
	onScroll = (event) => {
		if(event.target.scrollTop >= 153){
			if(this.rootBlockRef.current){
				this.rootBlockRef.current.style.position = 'fixed';
				this.rootBlockRef.current.style.marginTop = '0';
				this.rootBlockRef.current.style.top = '0';
				this.rootBlockRef.current.style.maxHeight = '100%';
			}
		} else {
			if(this.rootBlockRef.current) {
				this.rootBlockRef.current.style.position = null;
				this.rootBlockRef.current.style.marginTop = null;
				this.rootBlockRef.current.style.top = null;
				this.rootBlockRef.current.style.maxHeight = null;
			}
		}
	}
	gotoNext = () => {
		if(this.form.getFormValidation(false).valid){
			this.steps.addStep("SMSBroadcastingStep");
		}
	}
	cancel = () => {

	}
	disableNext() {
		return !this.form.getFormValidation(false).valid;
	}
	render() {
		return (
			<div ref={this.rootBlockRef} className="sms-info">
				<div className="sms-info__blocks">
					<HeaderText className="sms-info__h1" textJSX={this.$t("Messages information")}/>
					<RoundIconMiddle className="sms-info__icon" color="butterscotch" icon="views"/>
					<HeaderTextSmall className="sms-info__h2" style={{marginBottom: "40px"}} textJSX={this.$t("Check information of your SMS message")}/>
					<SMSCredits currentCredits={536}/>
					<SMSRequired requiredCredits={100}/>
				</div>
				<Space height="60px" />
				<div className="sms-info__buttons">
					<Button disabled={this.disableNext()} className="sms-info__next" onClick={this.gotoNext} iconType="send" typeDesign="primary" name={this.$t("Continue")}/>
					<Button className="sms-info__cancel" onClick={this.cancel} iconType="without-icon" typeDesign="transparent-blue" name={this.$t("Cancel")}/>
				</div>
			</div>
		);
	}
}
SMSInfoComponent.propTypes = {
	formAPI: PropTypes.object.isRequired,
}
export const SMSInfo = withTranslation()(SMSInfoComponent)
