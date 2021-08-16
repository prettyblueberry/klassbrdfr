import * as React from "react";
import { withTranslation } from 'react-i18next';
import {deepClone} from "../../../../lib/Utils";
import PropTypes from 'prop-types';
import classnames from "classnames";
import MaskedInput from 'react-text-mask';
import IntlTelInput from 'react-intl-tel-input';
import 'react-intl-tel-input/dist/main.css';
import "./CountryPhoneInput.scss";
import {KRUtils,KRClient} from "@klassroom/klassroom-sdk-js";

class CountryPhoneInputComponent extends React.Component {
	static $t;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
	}

	componentDidMount(){
		if(KRUtils.getCookie("klassroom_country")){

		}else{
				KRClient.getInstance().country().then((countryCode)=>{
					KRUtils.setCookie("klassroom_country",countryCode.toLowerCase(),365*25);
					this.forceUpdate();
				})
		}
	}
	getValue() {
		if(this.props.value && this.props.value.phone) {
			return this.props.value.phone;
		}
		return ""
	}
	changePhone = (valid, phone, countryData) => {
		const value = {
			phone,
			valid,
			countryData
		}
		this.props.onChange(value);
	}
	getClasses() {
		let classes = {
			"country-phone-input block clearfix text-input": true,
		}
		if(this.props.theme == "gray"){
			classes["country-phone-input__theme-gray"] = true;
		}
		return classnames(classes);
	}
	render() {
		return (
			<div className={this.getClasses()}>
	    	<div className="block form-group">
					<p><label>{this.props.label}</label></p>
					<IntlTelInput
						defaultCountry={KRUtils.getCookie("klassroom_country") || this.props.defaultCountry }
						inputClassName={this.props.isSignin ? "form-control k-input" : "country-phone-input_input"}
						onPhoneNumberChange={this.changePhone}
						value={this.getValue()}
						onPhoneNumberBlur={() => {}}
						onSelectFlag={(phone,country,valid) => {
								KRUtils.setCookie("klassroom_country",country.iso2,365*25);
								const value = {
									phone,
									valid,
									country
								}
								this.props.onChange(value);
						}}
						geoIpLookup={()=>{



						}


						}

					/>
				</div>
			</div>
		);
	}
}

CountryPhoneInputComponent.propTypes = {
	value: PropTypes.object,
	defaultCountry: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	label: PropTypes.string,
	theme: PropTypes.string,
}
export const CountryPhoneInput = withTranslation()(CountryPhoneInputComponent)
