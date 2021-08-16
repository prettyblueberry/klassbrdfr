import * as React from "react";
import { withTranslation } from 'react-i18next';
import {Button, StripeInput} from "presentational";
import {FormAPI} from "forms";
import PropTypes from 'prop-types';
import "./AddNewCardForm.scss";

class AddNewCardFormComponent extends React.Component {
	static $t;
	static i18n;
	form;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
		this.form = new FormAPI(this);
		this.formSettings = {
			formValidation: null,
			formValue: {
				stripeInput: ""
			},
			formRules: {
				stripeInput: [
					{
						type: "not_empty",
						errorText: "stripe input required"
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
					this.props.callbackSubmit(data);
				}
			}
		)
	}

	render() {
		return (
			<form onSubmit={this.onSubmit} className="addcard-form" action="/charge" method="post" id="payment-form">
				{this.form.renderFormError()}
				<StripeInput/>
				<Button
						disabled={false}
						className="addcard-form__submit"
						onClick={this.onSubmit}
						typeDesign="primary"
						name={this.$t("Add a bank account")}
					/>
			</form>
		);
	}
}
AddNewCardFormComponent.propTypes = {

}
export const AddNewCardForm = withTranslation()(AddNewCardFormComponent)
