import * as React from "react";
import { withTranslation } from 'react-i18next';
import {LinkClassHeader} from "../../components";
import {
	Button,
	HeaderText,
	HeaderTextSmall,
	TextInput2,
} from "../../../../../presentational";
import { withRouter } from 'react-router-dom';
import {FormAPI} from "../../../_system/FormAPI";
import PropTypes from 'prop-types';
import "./LinkClassKeyForm.scss";
import {KRClient} from "@klassroom/klassroom-sdk-js";

class LinkClassKeyFormComponent extends React.Component {
	static $t;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
		this.form = new FormAPI(this);
		this.formSettings = {
			formValidation: null,
			formValue: {
				classKey: this.props.initFormValue.classKey || "",
			},
			formRules: {
				classKey: [
					{
						type: "not_empty",
						errorText:	this.$t("class key required")
					}
				],
			}
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
	onChangeKey = (value, submit = false) => {
		this.form.updateValueForm('classKey', value);
		if(submit) {
			this.onSubmit();
		}
	}
	gotoDashboard = (event) => {
		event.preventDefault();
		this.props.history.goBack();
	}
	render() {
		return (
			<form onSubmit={this.onSubmit} className="link-class-key-form">
				<LinkClassHeader {...this.props}/>
				<HeaderTextSmall style={{textAlign: "left",}} textJSX={this.$t("LINK A KLASSROOM CLASS")}/>
				<HeaderText style={{textAlign: "left", marginBottom: "10px"}} textJSX={this.$t("What is the <purple>class key<purple/>?")}/>
				<HeaderTextSmall style={{textAlign: "left", marginBottom: "20px"}} textJSX={this.$t("Enter the key of the class of the teacher.")}/>
				{this.form.renderFormError()}
				<TextInput2
					onChange={this.onChangeKey}
					value={this.form.getValueInputForm('classKey')}
					type="text"
					label={this.$t("Class key")}
				/>
				<div className="link-class-key-form__buttons">
					<a onClick={this.gotoDashboard} className="link-class-key-form__cancel">{this.$t('Cancel')}</a>
					<Button onClick={this.onSubmit} iconType="arrow-white" iconSide="right" typeDesign="primary" name={this.$t("Create")}/>
				</div>
			</form>);
	}
}
LinkClassKeyFormComponent.propTypes = {
	initFormValue: PropTypes.object.isRequired,
	callbackSubmit: PropTypes.func.isRequired,
	callbackClearError: PropTypes.func.isRequired,
	callbackOnBack: PropTypes.func.isRequired,
}

export const LinkClassKeyForm = withRouter(withTranslation()(LinkClassKeyFormComponent));
