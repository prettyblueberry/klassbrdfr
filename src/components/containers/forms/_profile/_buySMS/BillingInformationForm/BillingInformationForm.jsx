import * as React from "react";
import { withTranslation } from 'react-i18next';
import {Button, HeaderTextMiddle, HeaderText, BackButton } from "presentational";
import {CardSlider} from "../../../../special/CardSlider/CardSlider";
import {FormAPI, AddNewCardForm} from "forms";
import PropTypes from 'prop-types';
import {Carousel} from "react-bootstrap";
import PackagesCredits from "../PackagesCredits";
import "./BillingInformationForm.scss";

class BillingInformationFormComponent extends React.Component {
	static $t;
	static i18n;
	form;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
		this.steps = this.props.stepsAPI;
		this.modalAPI = null;
		this.form = new FormAPI(this);
		this.formSettings = {
			formValidation: null,
			formValue: {
				bankAccount: "",
			},
			formRules: {
				bankAccount: [
					{
						type: "not_empty",
						errorText: this.$t("bank account required")
					},
				],
			}
		}
		this.accounts = [
			{
				id: 1,
				account: "** **** **** **** **** 890",
				nameCard: "Sousa Mendes School"
			},
			{
				id: 2,
				account: "** **** **** **** **** 890",
				nameCard: "Sousa Mendes School"
			},
			{
				id: 3,
				account: "** **** **** **** **** 890",
				nameCard: "Sousa Mendes School"
			}
		];
		this.packages = new PackagesCredits(this.$t).getPackages();
		this.selectedPackage = null;
		const ChoosePackageData = this.steps.getStepData("ChoosePackage");
		if(ChoosePackageData && ChoosePackageData.data) {
			this.selectedPackage = this.packages[ChoosePackageData.data.package];
		}
	}
	onChangeFormValue = (formValue) => {
		// data of step updated here
		this.steps.updateStepData(formValue, this);
	}
	nextStep = () => {
		this.steps.addStep('BillingSuccessful');
	}
	checkDisabledButton() {
		return !this.form.getFormValidation(false).valid;
	}
	onChangeFormValue = (formValue) => {
		// data of step updated here
		this.steps.updateStepData(formValue, this);
	}
	getButtonText() {
		return this.$t("Confirm package order");
	}
	goBack = () => {
		this.steps.goBack();
	}
	
	renderCostButton() {
		if(this.form.getValueInputForm('package') && this.packages[this.form.getValueInputForm('package')]) {
			return <div className="billing-Information__btn-cost">{this.packages[this.form.getValueInputForm('package')].cost}</div>;
		}
		return null;
	}
	renderSlider() {
		return (
			<CardSlider accounts={this.accounts} formAPI={this.form}/>
		)
	}
	showAddCardModal = () => {
		this.modalAPI = kbApp.modalAPI.dialog({
			dialogClassName: "add-card__modal",
			title: this.$t("Add bank account"),
			closeButton: true,
			message: <AddNewCardForm/>
		});
	}
	render() {
		return (
			<form className="billing-Information">
				<BackButton className="billing-Information__back" onClick={this.goBack}/>
				<HeaderTextMiddle className="billing-Information__h1" style={{textAlign: "center", marginTop: "70px"}} textJSX={this.$t("BUY SMS CREDITS")}/>
				<HeaderText className="billing-Information__h2" style={{textAlign: "center", marginBottom: "50px"}} textJSX={this.$t("Your package <butterscotch>order</butterscotch>")}/>
			
				<div className="billing-Information__your-package">

					<div className="billing-Information__your-package-left">
						<HeaderTextMiddle className="billing-Information__h3" textJSX={this.$t("YOU CHOOSE")}/>
						<HeaderText className="billing-Information__h4" textJSX={this.selectedPackage && this.selectedPackage.name}/>
						<div className="billing-Information__your-package-credits">
							<div className="billing-Information__your-package-credits-h1">{this.selectedPackage && this.selectedPackage.credits}</div>
							<div className="billing-Information__your-package-credits-h2">{this.$t('Credits').toUpperCase()}</div>
						</div>
						<a className="billing-Information__link">{this.$t("Change package")}</a>
					</div>

					<div className="billing-Information__your-package-right">
						<HeaderText className="billing-Information__h5" textJSX={this.$t("TOTAL")}/>
						<HeaderText className="billing-Information__cost" textJSX={this.selectedPackage && this.selectedPackage.cost}/>
					</div>
			
				</div>

				<div className="billing-Information__cards">
					<div className="billing-Information__cards-texts">
						<HeaderText className="billing-Information__cards_h1" style={{fontSize: "18px", textAlign: "left"}} textJSX={this.$t("Billing information")}/>
						<a onClick={this.showAddCardModal} className="billing-Information__add-account">{this.$t("Add a bank account")}</a>
					</div>

					<HeaderText className="billing-Information__cards-h2" textJSX={this.$t("SELECT BANK ACCOUNT")}/>
					<HeaderText className="billing-Information__cards-h3" textJSX={this.$t("Principal account")}/>
					<div className="billing-Information__slider">
						{this.renderSlider()}
					</div>
				
				</div>

				<div className="billing-Information__btn">
					{this.renderCostButton()}
					<Button
						disabled={this.checkDisabledButton()}
						className="billing-Information__submit"
						onClick={this.nextStep}
						typeDesign="primary"
						name={this.getButtonText()}
					/>
				</div>

				<div className="billing-Information__secure-block">

					<div className="billing-Information__secure"> <div className="icon klassicon-check"></div> {this.$t("100% secure payment")}</div>

					<div className="billing-Information__secure"> <div className="icon klassicon-check"></div> {this.$t("Customer service at your service")}</div>

					<div className="billing-Information__secure"> <div className="icon klassicon-check"></div> {this.$t("Quick SMS credits recharge")}</div>

				</div>
				
			</form>
		);
	}
}
BillingInformationFormComponent.propTypes = {
	stepsAPI: PropTypes.object.isRequired,
}
export const BillingInformationForm = withTranslation()(BillingInformationFormComponent)
