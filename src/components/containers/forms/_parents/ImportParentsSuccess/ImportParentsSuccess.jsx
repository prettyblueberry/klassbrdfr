import * as React from "react";
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import {
	Button,
	HeaderTextSmall,
	HeaderText,
	RoundIconMiddle,
} from "../../../../presentational";
import classnames from "classnames";
import {FormAPI} from "../../_system/FormAPI";
import "./ImportParentsSuccess.scss";

class ImportParentsSuccessComponent extends React.Component {
	static $t;
	static i18n;
	contacts = [];
	class = null;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
		this.steps = this.props.stepsAPI;
		this.modal = this.props.modalAPI;
		const step3Data = this.steps.getStepData("CSV_Step3");
		const stepClass = this.steps.getStepData("ChooseClassStep");
		if(step3Data && step3Data.data && step3Data.data.contacts) {
			this.contacts = step3Data.data.contacts;
		}
		if(!step3Data){
			const manualImportStep = this.steps.getStepData("ManualImport");
			if(manualImportStep && manualImportStep.data){
				this.contacts = [
					{
						first_name: manualImportStep.data.first_name || "",
						last_name: manualImportStep.data.last_name || "",
						phone: manualImportStep.data.phone || "",
						email: manualImportStep.data.email || "",
					}
				];

			}
		}
		if(stepClass && stepClass.data && stepClass.data.class) {
			this.class = stepClass.data.class;
		}
	}
	componentDidMount() {
		this.modal.disableBackButton();
	}
	getCountContacts = () => {
		return this.contacts.length;
	}
	getClassName = () => {
		if(this.class && this.class.name){
			return this.class.name;
		}
		return "";
	}
	hideModal = () => {
		this.modal.hideModal();
	}
	render() {
		return (
			<div className="sms-info-broadcasting__message-body">
				<RoundIconMiddle key="broadcasting__message-body_1" style={{width: "80px", height: "80px", fontSize: "37px"}} icon="check" color="green"/>
				<HeaderTextSmall key="broadcasting__message-body_2" className="sms-info-broadcasting__message-body__h1" style={{marginTop: "20px"}} textJSX={this.$t("CONGRATULATIONS")}/>
				<HeaderText key="broadcasting__message-body_3" className="sms-info-broadcasting__message-body__h2" style={{marginBottom: "10px"}} textJSX={this.$t("You added <butterscotch>{{count}} members</butterscotch> to <blue>{{class}}</blue>", {count: this.getCountContacts(), class: this.getClassName()})}/>
				<HeaderTextSmall key="broadcasting__message-body_4" className="sms-info-broadcasting__message-body__h3" style={{width: "490px", marginBottom: "30px"}} textJSX={this.$t("Congratulations! You've added {{count}} members to <b>{{class}}</b>! Now you can <b>See all members</b> to manage your parents.", {count: this.getCountContacts(), class: this.getClassName()})}/>
				<Button key="broadcasting__message-body_5" onClick={this.hideModal} typeDesign="primary" name={this.$t("See all members")}/>
			</div>
		)
	}
}

ImportParentsSuccessComponent.propTypes = {
	stepsAPI: PropTypes.object.isRequired,
	modalAPI: PropTypes.object.isRequired,
}
export const ImportParentsSuccess = withTranslation()(ImportParentsSuccessComponent)
