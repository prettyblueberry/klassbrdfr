import * as React from "react";
import { withTranslation } from 'react-i18next';
import {Button} from "../../../../presentational";
import {FormAPI} from "../../_system/FormAPI";
import PropTypes from 'prop-types';
import "./AddClassCreateYourClassesForm.scss";
import {withRouter} from 'react-router-dom';
import {KRClient} from "@klassroom/klassroom-sdk-js";

class AddClassCreateYourClassesFormComponent extends React.Component {
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

	gotoDashboard = (event) => {
		event.preventDefault();
		this.props.history.goBack();
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
	getYear() {
		let nextYear = KRClient.getInstance().getPeriod() + 1;
		return `${KRClient.getInstance().getPeriod()}-${nextYear}`;
	}
	render() {
		return (
			<div className="create-your-classes">
				<img className="create-your-classes__photo-unicorn-left" src="/public/pages/addClass/photo-unicorn-left.png"/>
				<img className="create-your-classes__photo-unicorn-left-top" src="/public/pages/addClass/photo-unicorn-left-top.png"/>
				<img className="create-your-classes__photo-unicorn-right-top" src="/public/pages/addClass/photo-unicorn-right-top.png"/>
				<img className="create-your-classes__photo-unicorn-right" src="/public/pages/addClass/photo-unicorn-right.png"/>
				<div className="create-your-classes__h1">{this.$t("SCHOOL YEAR")}</div>
				<div className="create-your-classes__year">{this.getYear()}</div>
				<div className="create-your-classes__icon">
					<img src="/public/pages/addClass/class-icon-gold.svg" />
				</div>
				<div className="create-your-classes__h2">{this.$t("MY FIRSTS STEPS")}</div>
				<div className="create-your-classes__h3" dangerouslySetInnerHTML={{__html: this.$t("Create <b>your classes</b>")}}></div>
				<div className="create-your-classes__h4" dangerouslySetInnerHTML={{__html: this.$t("This is your first day on Klassboard? Do not panic, we are going to help you from A to Z! To start, you need to <b>add your classes in Klassboard!</b>")}}></div>
				<div className="create-your-classes__buttons">
					<Button onClick={this.onSubmit} iconType="add-white" iconSide="left" typeDesign="primary" name={this.$t("Add a new class")}/>
					<br/>
					<br/>
					<a onClick={this.gotoDashboard} className="add-new-class-form__cancel">{this.$t('Cancel')}</a>

				</div>
				<img className="create-your-classes__unicorn-left" src="/public/pages/addClass/unicorn-left.png"/>
				<img className="create-your-classes__unicorn-right" src="/public/pages/addClass/unicorn-right.png"/>
			</div>);
	}
}
AddClassCreateYourClassesFormComponent.propTypes = {
	callbackSubmit: PropTypes.func.isRequired,
	callbackClearError: PropTypes.func.isRequired,
	callbackOnBack: PropTypes.func.isRequired,
	year: PropTypes.number.isRequired,
}


const TranslatedComponent = withTranslation()(AddClassCreateYourClassesFormComponent);
export const AddClassCreateYourClassesForm = withRouter(props => <TranslatedComponent {...props}/>)
