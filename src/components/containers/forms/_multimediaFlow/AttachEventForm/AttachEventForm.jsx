import * as React from "react";
import { withTranslation } from 'react-i18next';
import {Button, TextInput2, DateTimePicker, SquarePhoto, TextArea} from "presentational";
import {FormAPI} from "forms";
import PropTypes from 'prop-types';
import "./AttachEventForm.scss";
import {KRPostEvent} from "@klassroom/klassroom-sdk-js";
import * as moment from 'moment';

class AttachEventFormComponent extends React.Component {
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
				cover: this.props.event ? (this.props.event.cover ? this.props.event.cover : this.props.event.cover_thumb_url) : null,
				title: this.props.event ? this.props.event.title : "",
				location: this.props.event ? this.props.event.location : "",
				start_date: this.props.event ? moment(this.props.event.start_date) : null,
				end_date: this.props.event ? moment(this.props.event.end_date) : null,
				description: this.props.event ? this.props.event.description : "",
			},
			formRules: {
				cover: [],
				title: [
					{
						type: "not_empty",
						errorText: this.$t("title required")
					},
				],
				location: [

				],
				start_date: [
					{
						type: "function",
						validationProperties: {
							func: (date) => {
								return typeof date == "object" && date !== null;
							}
						},
						errorText: "from required"
					}
				],
				end_date: [
					{
						type: "function",
						validationProperties: {
							func: (date) => {
								return typeof date == "object" && date !== null;
							}
						},
						errorText: "to required"
					}
				],
				description: [
					{
						type: "not_empty",
						errorText: this.$t("description required")
					},
				],
			}
		}
		this.state = {
			focused: false,
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

					let event = new KRPostEvent();
					event.title = data.title;
					event.description = data.description;
					event.location = data.location;
					event.cover = data.cover;
					event.start_date = data.start_date.toDate().getTime();
					event.end_date = data.end_date.toDate().getTime();


					this.props.callbackSubmit(event);
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
	checkDisabledButton () {
		return !this.form.getFormValidation(false).valid;
	}

	render() {
		return (
			<form onSubmit={this.onSubmit}>
					{this.form.renderFormError()}
					<fieldset>
							<SquarePhoto
								src={this.form.getValueInputForm('cover')}
								onChange={(value) => this.onChangeInput('cover', value)}
							/>
							<TextInput2
								onChange={(value, submit) => this.onChangeInput('title', value, submit)}
								value={this.form.getValueInputForm('title')}
								label={this.$t("Title")}
								placeholder={this.$t("Title")}
							/>
							<TextInput2
								onChange={(value, submit) => this.onChangeInput('location', value, submit)}
								value={this.form.getValueInputForm('location')}
								label={this.$t("Location")}
								placeholder={this.$t("Location")}
							/>
							<DateTimePicker
								placeholder={this.$t("From")}
								value={this.form.getValueInputForm('start_date')}
								dateFormat={"ll"}
								onChange={(value) => this.onChangeInput('start_date', value)}
							/>
							<DateTimePicker
								placeholder={this.$t("To")}
								value={this.form.getValueInputForm('end_date')}
								dateFormat={"ll"}
								onChange={(value) => this.onChangeInput('end_date', value)}
							/>
							<TextArea
								className="attach-event-description"
								onChange={(value) => this.onChangeInput('description', value)}
								value={this.form.getValueInputForm('description')}
								maxCountChars={160}
								label={this.$t("Description")}
							/>
							<div className="space"></div>
							<div className="clearfix">
								<Button disabled={this.checkDisabledButton()} onClick={this.onSubmit} typeDesign="primary" name={(this.props.event ? this.$t("Edit event") :this.$t("Post event"))}/>
							</div>

					</fieldset>
			</form>
		);
	}
}
AttachEventFormComponent.propTypes = {
	initData: PropTypes.object,
	id: PropTypes.string,
	callbackSubmit: PropTypes.func.isRequired,
}
export const AttachEventForm = withTranslation()(AttachEventFormComponent)
