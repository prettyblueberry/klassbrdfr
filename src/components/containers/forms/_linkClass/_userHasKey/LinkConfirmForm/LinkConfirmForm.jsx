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
import "./LinkConfirmForm.scss";
import {KRClient} from "@klassroom/klassroom-sdk-js";

class LinkConfirmFormComponent extends React.Component {
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
	gotoDashboard = (event) => {
		event.preventDefault();
		this.props.history.goBack();
	}

	getClassRoom() {
		return this.props.data.klass;
	}
	render() {
		return (
			<form onSubmit={this.onSubmit} className="link-confirm-form">
				<LinkClassHeader {...this.props}/>
				<HeaderTextSmall style={{textAlign: "left",}} textJSX={this.$t("LINK A KLASSROOM CLASS")}/>
				<HeaderText style={{textAlign: "left", marginBottom: "10px"}} textJSX={this.$t("Do you want link <blue>{{classBoard}}</blue> to <coral>{{classRoom}}</coral>?", {
					classBoard: this.props.classroom.name,
					classRoom: this.props.data.klass.natural_name,
				})}/>
				<HeaderTextSmall style={{textAlign: "left", marginBottom: "30px"}} textJSX={this.$t("A request will be sent to the teacher who created the class.")}/>
				<ClassItemSmall style={{marginBottom: 0}} classroom={this.props.classroom}/>
				<div className="link-confirm-form__link">
					<img src="/public/pages/linkClass/link-icon-gray.svg"/>
				</div>
				<ClassItemSmallClassRoom classData={this.getClassRoom()}/>
				<div className="link-confirm-form__buttons">
					<Button style={{width: "100%", marginBottom: "24px"}} onClick={this.onSubmit} iconType="arrow-white" iconSide="right" typeDesign="primary" name={this.$t("Link to this class")}/>
					<a onClick={this.gotoDashboard} className="link-confirm-form__cancel">{this.$t('Cancel')}</a>
				</div>
			</form>);
	}
}
LinkConfirmFormComponent.propTypes = {
	callbackSubmit: PropTypes.func.isRequired,
	callbackOnBack: PropTypes.func.isRequired,
}

export const LinkConfirmForm = withRouter(withTranslation()(LinkConfirmFormComponent));
