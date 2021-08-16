import * as React from "react";
import { withTranslation } from 'react-i18next';
import {Button, TextInput2, GeoInput, MapViewer} from "presentational";
import {FormAPI} from "forms";
import PropTypes from 'prop-types';
import "./LocationForm.scss";
import {KRPostLocation} from "@klassroom/klassroom-sdk-js";

class LocationFormComponent extends React.Component {
	static $t;
	static i18n;
	form;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
		this.form = new FormAPI(this);
		let location = {
			longitude: 0,
			latitude: 0,
		};
		let longlat = new google.maps.LatLng(0, 0);
		if(this.props.location.longitude && this.props.location.latitude){
			location = {
				longitude: this.props.location.longitude,
				latitude: this.props.location.latitude,
			}
			longlat = new google.maps.LatLng(this.props.location.latitude, this.props.location.longitude);
		}
		this.formSettings = {
			formValidation: null,
			formValue: {
				name: this.props.location.name || "",
				address: this.props.location.address || "",
				coordinates: location,
			},
			formRules: {
				name: [
					{
						type: "not_empty",
						errorText: this.$t("name required")
					},
				],
				address: [
					{
						type: "not_empty",
						errorText: this.$t("address required")
					},
				],
				coordinates: [
					{
						type: "function",
						validationProperties: {
							 func: (value) => {
								 
								 return true;
							 }
						 },
						errorText: "the passwords are not the same"
					},
				]
			}
		}
		this.state = {
			longlat: longlat,
		}
	}


	componentDidMount(){
		let p = {};
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((position)=>{
				var lat = position.coords.latitude;
				var lng = position.coords.longitude;
				p.latitude = lat;
				p.longitude = lng;
				this.setState({
					longlat: new google.maps.LatLng(lat, lng)
				})
				});
			} else {

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
					let location = new KRPostLocation();
					location.name = data.name;
					location.address = data.address;
					location.longitude = data.coordinates.longitude;
					location.latitude = data.coordinates.latitude;

					this.props.callbackSubmit(location);
				}
			}
		)
	}
	onChangeInput = (inputName,value, submit = false) => {
		this.form.updateValueForm(inputName, value);
		if(submit) {
			this.onSubmit();
		}
	}

	onSuggestSelect = (suggest) => {
		 if(suggest && suggest.location) {
			this.form.updateValuesForm(
				[
					{
						nameInput: "coordinates",
						valueInput:  {
							longitude: suggest.location.lng,
							latitude: suggest.location.lat,
						}
					},
					{
						nameInput: "address",
						valueInput: suggest.description
					}
				]
			)
		 }
   }
	render() {

		return (
			<form onSubmit={this.onSubmit}>
					{this.form.renderFormError()}
					<fieldset>

						<TextInput2
							onChange={(value, submit) => this.onChangeInput('name', value, submit)}
							value={this.form.getValueInputForm('name')}
							label={this.$t("Name")}
							placeholder={this.$t("Name")}
						/>

						<GeoInput
							placeholder={this.$t("Type address")}
							onSuggestSelect={this.onSuggestSelect}
							location={this.state.longlat}
						/>

						<MapViewer
							lat={this.form.getValueInputForm('coordinates').latitude}
							lng={this.form.getValueInputForm('coordinates').longitude}
							style={{marginBottom: "20px"}}
							title={this.form.getValueInputForm('name')}
							address={this.form.getValueInputForm('address')}
						/>

						<div className="space"></div>
						<div className="clearfix">
							<Button onClick={this.onSubmit} typeDesign="primary" name={(this.props.id ? this.$t("Edit location") :this.$t("Post location"))}/>
						</div>
					</fieldset>
			</form>
		);
	}
}
LocationFormComponent.propTypes = {
	callbackSubmit: PropTypes.func.isRequired,
}
export const LocationForm = withTranslation()(LocationFormComponent)
