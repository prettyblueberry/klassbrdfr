import * as React from "react";
import { withTranslation } from 'react-i18next';
import {Button, HeaderTextMiddle, HeaderText, SMSPackageItem, BackButton} from "presentational";
import {withRouter} from 'react-router-dom';
import {FormAPI} from "forms";
import PropTypes from 'prop-types';
import PackagesCredits from "../PackagesCredits";
import "./ChoosePackageForm.scss";

class ChoosePackageFormComponent extends React.Component {
	static $t;
	static i18n;
	form;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
		this.steps = this.props.stepsAPI;
		this.form = new FormAPI(this);
		this.formSettings = {
			formValidation: null,
			formValue: {
				package: "",
			},
			formRules: {
				package: [
					{
						type: "not_empty",
						errorText: this.$t("package required")
					},
				],
			}
		}
		this.packages = new PackagesCredits(this.$t).getPackages();
	}
	
	onChangeFormValue = (formValue) => {
		// data of step updated here
		this.steps.updateStepData(formValue, this);
	}
	nextStep = () => {
		this.steps.addStep('BillingInformation');
	}
	checkDisabledButton() {
		return !this.form.getFormValidation(false).valid;
	}
	onSelectPackage = (value) => {
		this.form.updateValueForm('package', value);
	}
	getButtonText() {
		if(this.form.getValueInputForm('package') && this.packages[this.form.getValueInputForm('package')]) {
			return this.$t("Order") + this.packages[this.form.getValueInputForm('package')].name;
		}
		return this.$t("Order package");
	}
	goBack = () => {
		this.props.history.goBack();
	}
	renderCostButton() {
		if(this.form.getValueInputForm('package') && this.packages[this.form.getValueInputForm('package')]) {
			return <div className="choose-package-form__btn-cost">{this.packages[this.form.getValueInputForm('package')].cost}</div>;
		}
		return null;
	}
	render() {
		return (
			<form className="choose-package-form">
				<BackButton className="choose-package-form__back" onClick={this.goBack}/>
				<HeaderTextMiddle className="choose-package-form__h1" style={{textAlign: "center", marginTop: "70px"}} textJSX={this.$t("BUY SMS CREDITS")}/>
				<HeaderText className="choose-package-form__h2" style={{textAlign: "center", marginBottom: "50px"}} textJSX={this.$t("Choose your favorite <purple>package</purple>")}/>
				<div className="choose-package-packages">

					<SMSPackageItem isSelected={this.form.getValueInputForm('package') == "eco"} onSelect={this.onSelectPackage} package={this.packages.eco}/>
					<SMSPackageItem isSelected={this.form.getValueInputForm('package') == "comfort"} onSelect={this.onSelectPackage} package={this.packages.comfort}/>
					<SMSPackageItem isSelected={this.form.getValueInputForm('package') == "premium"} onSelect={this.onSelectPackage} package={this.packages.premium}/>
					
				</div>

				<div className="choose-package-form__more">{this.$t("See more package")}</div>

				<div className="choose-package-form__btn">
					{this.renderCostButton()}
					<Button
						disabled={this.checkDisabledButton()}
						className="choose-package-form__submit"
						onClick={this.nextStep}
						typeDesign="primary"
						name={this.getButtonText()}
					/>
				</div>

				<div className="choose-package-form__secure-block">

					<div className="choose-package-form__secure"> <div className="icon klassicon-check"></div> {this.$t("100% secure payment")}</div>

					<div className="choose-package-form__secure"> <div className="icon klassicon-check"></div> {this.$t("Customer service at your service")}</div>

					<div className="choose-package-form__secure"> <div className="icon klassicon-check"></div> {this.$t("Quick SMS credits recharge")}</div>

				</div>
				
			</form>
		);
	}
}
ChoosePackageFormComponent.propTypes = {
	stepsAPI: PropTypes.object.isRequired,
}
const TranslatedComponent = withTranslation()(ChoosePackageFormComponent);
export const ChoosePackageForm = withRouter(props => <TranslatedComponent {...props}/>)
