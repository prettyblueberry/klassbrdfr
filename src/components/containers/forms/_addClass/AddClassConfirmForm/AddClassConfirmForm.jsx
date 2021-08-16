import * as React from "react";
import { withTranslation } from 'react-i18next';
import {Button, ClassItemSmall} from "../../../../presentational";
import { withRouter } from 'react-router-dom';
import {FormAPI} from "../../_system/FormAPI";
import PropTypes from 'prop-types';
import "./AddClassConfirmForm.scss";
import {KRClient} from "@klassroom/klassroom-sdk-js";

class AddClassConfirmFormComponent extends React.Component {
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

			},
			formRules: {

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
	getClass(){
		const klass = {
				externalID:this.props.class.internID,
				name:this.props.class.internName,
				teacher:this.props.class.principalTeacher,
				students_count:this.props.class.studentNumber,
		}

		return klass;
	}
	renderClass() {
		if(this.getClass()) {
			return <ClassItemSmall classroom={this.getClass()}/>
		}
		return null;
	}
	goBack = () => {
		this.props.callbackOnBack();
	}
	gotoDashboard = (event) => {
		event.preventDefault();
		this.props.history.goBack();
	}
	getYear() {
		let nextYear = KRClient.getInstance().getPeriod() + 1;
		return `${KRClient.getInstance().getPeriod()}-${nextYear}`;
	}
	render() {
		return (
			<div className="add-class-confirm">
				<div onClick={this.goBack} className="add-class-confirm__back-button"><img src="/public/pages/addClass/back-btn.svg" />{this.$t("Back")}</div>
				<div className="add-class-confirm__h1">{this.$t("SCHOOL YEAR")}</div>
				<div className="add-class-confirm__year">{this.getYear()}</div>
				<div className="add-class-confirm__container">
					<div className="add-class-confirm__h2">{this.$t("YOUR CLASS")}</div>
					<div className="add-class-confirm__h3" dangerouslySetInnerHTML={{__html: this.$t("Do you want <b>add this class</b>?")}}></div>
					<div className="add-class-confirm__h4">{this.$t("Check the information of your class.")}</div>
					<div className="add-class-confirm__classes">
						{this.renderClass()}
					</div>
					<div className="add-class-confirm__buttons">
						<a onClick={this.gotoDashboard} className="add-class-confirm__cancel">{this.$t('Cancel')}</a>
						<Button onClick={this.onSubmit} iconType="arrow-white" iconSide="right" typeDesign="primary" name={this.$t("Create")}/>
					</div>

				</div>
			</div>);
	}
}
AddClassConfirmFormComponent.propTypes = {
	class: PropTypes.object,
	callbackSubmit: PropTypes.func.isRequired,
	callbackClearError: PropTypes.func.isRequired,
	callbackOnBack: PropTypes.func.isRequired,
	year: PropTypes.number.isRequired,
}

export const AddClassConfirmForm = withRouter(withTranslation()(AddClassConfirmFormComponent));
