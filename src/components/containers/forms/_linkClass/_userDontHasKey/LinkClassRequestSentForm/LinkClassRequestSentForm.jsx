import * as React from "react";
import { withTranslation } from 'react-i18next';
import {LinkClassHeader} from "../../components";
import {
	Button,
	HeaderText,
	HeaderTextSmall,
	DescriptionButton,
} from "../../../../../presentational";
import { withRouter } from 'react-router-dom';
import {FormAPI} from "../../../_system/FormAPI";
import PropTypes from 'prop-types';
import "./LinkClassRequestSentForm.scss";
import {KRClient} from "@klassroom/klassroom-sdk-js";

class LinkClassRequestSentFormComponent extends React.Component {
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
	render() {
		return (
			<form onSubmit={this.onSubmit} className="link-class-request-sent">
				<LinkClassHeader {...this.props} noback={true}/>
				<HeaderTextSmall style={{textAlign: "left",}} textJSX={this.$t("REQUEST FOR CLASS CREATION")}/>
				<HeaderText style={{textAlign: "left", marginBottom: "10px"}} textJSX={this.$t("Your request for class creation has been <blue>sent</blue>!")}/>
				<HeaderTextSmall style={{opacity: 1, textAlign: "left", marginBottom: "30px"}} textJSX={this.$t("Here we go! A request for class creation has been sent to the teacher.")}/>
				<DescriptionButton
					style={{background: "#f9fafc", boxShadow: "none", height: "120px", marginBottom: "50px", maxWidth: "490px"}}
					leftIconJSX={<img src="/public/pages/linkClass/success-blue-icon.svg"/>}
					text1JSX={null}
					text2JSX={this.$t("Do not forget to ask the teacher for his class key to link it with one of your classes.")}
					rightIconJSX={null}
				/>
				<div className="link-class-request-sent__buttons">
					<Button style={{width: "100%", marginBottom: "24px"}} onClick={this.gotoMyClasses} iconType="arrow-white" iconSide="right" typeDesign="primary" name={this.$t("See my classes")}/>
				</div>
				<img className="link-class-request-sent__unicorn-left" src="/public/pages/linkClass/unicorn-left.png"/>
				<img className="link-class-request-sent__unicorn-right" src="/public/pages/linkClass/unicorn-right.svg"/>
			</form>);
	}
}
LinkClassRequestSentFormComponent.propTypes = {
	callbackSubmit: PropTypes.func.isRequired,
	callbackOnBack: PropTypes.func.isRequired,
}

export const LinkClassRequestSentForm = withRouter(withTranslation()(LinkClassRequestSentFormComponent));
