import * as React from "react";
import { withTranslation } from 'react-i18next';
import {LinkClassHeader} from "../../components";
import {
	Button,
	HeaderText,
	HeaderTextSmall,
	ClassItemSmall,
	ClassItemSmallClassRoom,
} from "../../../../../presentational";
import { withRouter } from 'react-router-dom';
import {FormAPI} from "../../../_system/FormAPI";
import PropTypes from 'prop-types';
import "./LinkConfirmSuccessForm.scss";
import {KRClient} from "@klassroom/klassroom-sdk-js";

class LinkConfirmSuccessFormComponent extends React.Component {
	static $t;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
		this.form = new FormAPI(this);
		this.formSettings = {
			formValidation: null,
			formValue: {},
			formRules: {}
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
					this.form.resetValidation();
					this.props.callbackSubmit(data);
				}
			}
		)
	}
	gotoMyClasses = (event) => {
		event.preventDefault();
		this.props.history.push(`/my-classes`)
	}
	getClass() {
    return this.props.classroom;
	}
	getClassRoom() {
		return this.props.data.klass;
	}
	render() {
		return (
			<form onSubmit={this.onSubmit} className="link-confirm-success-form">
				<LinkClassHeader {...this.props} noback={true}/>
				<HeaderTextSmall style={{textAlign: "left",}} textJSX={this.$t("CONGRATULATIONS")}/>
				<HeaderText style={{textAlign: "left", marginBottom: "10px"}} textJSX={this.$t("Your link request has been <blue>sent</blue>!")}/>
				<HeaderTextSmall style={{opacity: 1, textAlign: "left", marginBottom: "30px"}} textJSX={this.$t("Congratulations! A request has been sent to <blue>{{user}}</blue> to link <blue>{{classboard}}</blue> to <coral>{{classroom}}</coral>.", {
					user: this.getClassRoom().ownerDisplayName(),
					classboard: this.getClass().name,
					classroom: this.getClassRoom().natural_name,
				})}/>
				<ClassItemSmall style={{marginBottom: 0}} classroom={this.props.classroom}/>
				<div className="link-confirm-success-form__link">
					<img src="/public/pages/linkClass/link-icon-blue.svg"/>
				</div>
				<ClassItemSmallClassRoom classData={this.getClassRoom()}/>
				<div className="link-confirm-success-form__buttons">
					<Button style={{width: "100%", marginBottom: "24px"}} onClick={this.gotoMyClasses} iconType="arrow-white" iconSide="right" typeDesign="primary" name={this.$t("See my classes")}/>
				</div>
			</form>);
	}
}
LinkConfirmSuccessFormComponent.propTypes = {
	callbackSubmit: PropTypes.func.isRequired,
	callbackOnBack: PropTypes.func.isRequired,
}

export const LinkConfirmSuccessForm = withRouter(withTranslation()(LinkConfirmSuccessFormComponent));
