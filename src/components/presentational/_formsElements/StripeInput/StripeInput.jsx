import * as React from "react";
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import "./StripeInput.scss";

class StripeInputComponent extends React.Component {
	static translate;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
		this.form = this.props.formAPI;
		this.stripe = Stripe('pk_test_TYooMQauvdEDq54NiTphI7jx');
		this.elements = this.stripe.elements();
		this.card = null;
	}
	componentDidMount(){
		this.initStripe();
	}
	initStripe() {
		const style = {
			base: {
				color: '#32325d',
				fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
				fontSmoothing: 'antialiased',
				fontSize: '16px',
				'::placeholder': {
					color: '#aab7c4'
				}
			},
			invalid: {
				color: '#fa755a',
				iconColor: '#fa755a'
			}
		};
		
		// Create an instance of the card Element.
		this.card = this.elements.create('card', {style: style});
		
		// Add an instance of the card Element into the `card-element` <div>.
		this.card.mount('#stripe-input__card');
		this.card.addEventListener('change', (event) => {
			const displayError = document.getElementById('card-errors');
			if (event.error) {
				displayError.textContent = event.error.message;
			} else {
				displayError.textContent = '';
			}
		});
	}
	stripeTokenHandler(token) {
		//here we get token
		console.log(token.id, "token id");
	}
	createToken = () => {
		this.stripe.createToken(this.card).then((result) => {
			if (result.error) {
				// Inform the user if there was an error.
				const errorElement = document.getElementById('card-errors');
				errorElement.textContent = result.error.message;
			} else {
				// Send the token to your server.
				this.stripeTokenHandler(result.token);
			}
		});
	}
	render() {
		return (
			<div className="stripe-input">
				<div className="stripe-input__label">
					{this.$t("Credit or debit card")}
				</div>
				<div id="stripe-input__card" className="stripe-input__card"></div>
				<div id="card-errors" role="alert"></div>
			</div>
		);
	}
}
StripeInputComponent.propTypes = {
	formAPI: PropTypes.object.isRequired,
}
export const StripeInput = withTranslation()(StripeInputComponent)