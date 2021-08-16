import * as React from "react";
import { withTranslation } from 'react-i18next';
import {Button, VerificationCode} from "../../../presentational";
import {
  Link
} from 'react-router-dom';
import PropTypes from 'prop-types';
import {FormAPI} from "../_system/FormAPI";
import "./VerificationCodeForm.scss";
import { parsePhoneNumberFromString } from 'libphonenumber-js';

class VerificationCodeFormComponent extends React.Component {
	static $t;
	static i18n;
	form;
	interval = null;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
		this.form = new FormAPI(this);
		this.formSettings = {
			formValidation: null,
			formValue: {
				code: ""
			},
			formRules: {
				code: [
					{
						type: "not_empty",
						errorText:	"Code required"
					}
				]
			}
		}
		this.state = {
			timer: 30,
		}
	}
	componentDidMount(){
		 this.interval = setInterval(() => {
			const timer = --this.state.timer;
			if(timer >= 0) {
				this.setState({timer})
			}
		 }, 1000);
	}
	componentDidUpdate() {
		if(this.state.timer === 0) {
			clearInterval(this.interval);
		}
	}
	componentWillUnmount() {
		clearInterval(this.interval);
	}
	onSubmit = (event) => {
		event.preventDefault();
		this.form.getFormValidation(
			true,
			(formValidData) => {
				if(formValidData.valid && typeof this.props.callbackSubmit == "function") {
					const data = this.form.getValueForm();
					this.props.callbackSubmit(data.code);
				}
			}
		)
	}
	onChangeCode = (value, submit = false) => {
		this.form.updateValueForm('code', value);
		if(submit) {
			this.onSubmit();
		}
	}


  getPhone() {
    if(this.props.phoneData){
      if(this.props.phoneData.email) {
        return this.props.phoneData.email;
      }else{
        return this.getFormatterPhone();
      }
    }
    return null;
  }
	getFormatterPhone() {

    const formattedPhone = parsePhoneNumberFromString(this.props.phoneData.phone, this.props.phoneData.countryData.iso2.toUpperCase());

    return formattedPhone.formatInternational();

	}
	back = (event) => {
		event.preventDefault();
		this.props.callbackBack();
	}

	renderRepeatCode() {

    if(this.props.resent){
      return <><div>{this.$t("We sent you a security code to {{phone}}", {phone: this.getFormatterPhone()})}</div><br/></>;
    }
		if(this.state.timer === 0 && this.getPhone()) {
			return (
				<p>
					<a onClick={this.props.callbackRepeatSendCode} className="btn repeat-phone-btn">
						{this.$t("Send me a new code to {{phone}}",{phone: this.getFormatterPhone()})}
					</a>
				</p>
			)
		}else{
      return <p>{this.$t("I haven't received my code?")} <span className="krBlue">{this.state.timer}</span> </p>;
    }
		return null;
	}

	render() {
		return (
			<>
				<h2 dangerouslySetInnerHTML={{ __html:this.$t("Verification Code")}}/>
				<h3>{this.$t("We sent you a security code to {{phone}}", {phone: this.getPhone()})}</h3>
				<form className="verification-code-form" onSubmit={this.onSubmit}>
						{this.form.renderFormError()}
						<fieldset>
								<VerificationCode
									value={this.form.getValueInputForm('code')}
									onChange={this.onChangeCode}
									label={this.$t("Your verification code")}
								/>
								<div className="space"></div>
								{this.renderRepeatCode()}
								<div className="space"></div>
						</fieldset>
						<fieldset>
							<div className="clearfix">
								<button onClick={this.back} className="btn-back btn-transparent">
									<img className="btn-back-white-icon" src="/public/k-img/icons/arrow-back-white.svg"/>
									<img className="btn-back-black-icon" src="/public/k-img/icons/arrow-back-blue.svg"/>
									<span className="btn-back-text"> {this.$t("Back")}</span>
								</button>
								<Button onClick={this.onSubmit} typeDesign="primary" name={this.$t("Create password")}/>
							</div>
							<div className="hide-desktop mobile-message">
								<p>{this.$t("You don't have a Klassroom account yet?")} <Link to="/signup">{this.$t("Create an account")}</Link></p>
							</div>
						</fieldset>
				</form>
			</>
		);
	}
}
VerificationCodeFormComponent.propTypes = {
	callbackSubmit: PropTypes.func.isRequired,
	callbackBack: PropTypes.func.isRequired,
	callbackRepeatSendCode: PropTypes.func.isRequired,
	phoneData: PropTypes.object,
	errorText: PropTypes.string
}
export const VerificationCodeForm = withTranslation()(VerificationCodeFormComponent)
