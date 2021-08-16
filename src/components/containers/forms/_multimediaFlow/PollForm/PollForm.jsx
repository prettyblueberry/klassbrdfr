import * as React from "react";
import { withTranslation } from 'react-i18next';
import {
	Button,
	TextInput2,
	OptionInput,
	DateTimePicker,
	CheckBoxLabeled,
	Space,
} from "presentational";
import {DnD} from "../../../coordinates";
import {uniqueId, deepClone} from "utils";
import {FormAPI} from "forms";
import PropTypes from 'prop-types';
import "./PollForm.scss";
import {KRPostPoll, KRUtils} from "@klassroom/klassroom-sdk-js";
import * as moment from 'moment';
import {ModalManager} from "containers/modals"

class PollFormComponent extends React.Component {
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
				question: this.props.poll ? this.props.poll.question : "",
				ends: this.props.poll ?  moment(this.props.poll.ends) : null,
				options: this.props.poll ? this.props.poll.options : [],
				is_anonymous: this.props.poll ? this.props.poll.is_anonymous : true,
				show_results: this.props.poll ? this.props.poll.show_results : true,
				self_participate: this.props.poll ? this.props.poll.self_participate : true,
			},
			formRules: {
				question: [
					{
						type: "not_empty",
						errorText: this.$t("question required")
					},
				],
				ends: [
					{
						type: "function",
						validationProperties: {
							func: (date) => {
								return typeof date == "object" && date !== null;
							}
						},
						errorText: "date required"
					},
				],
				options: [
					{
						type: "function",
						validationProperties: {
							func: (options) => {
								var valid = false
								KRUtils.each(options,(key, option)=>{
									console.log(option);
										if(option.value){
											valid = true;
										}
								});

								return valid && options.length > 0;
							}
						},
						errorText: "options required"
					}
				]
			}
		}
		this.disableInputs = false;
	}
	componentDidMount() {
		if(this.props.poll){
			const options = [];
			KRUtils.each(this.props.poll.options,(key,option)=>{
				options.push(
					{
						id: uniqueId(),
						placeholder: this.$t("Option"),
						value: option,
						parent: this,
						optionParentName: "options"
					}
				);
			});
			this.form.updateValueForm('options', options);
		}
	}
	getOptions = () => {
		return this.form.getValueInputForm('options')
	}
	onSubmit = (event) => {
		if(event && event.preventDefault) {
			event.preventDefault();
		}
		this.form.getFormValidation(
			true,
			(formValidData) => {
				if(formValidData.valid && typeof this.props.callbackSubmit == "function") {
					let data = this.form.getValueForm();
					let poll = new KRPostPoll();
					poll.question = data.question;
					poll.is_anonymous = data.is_anonymous;
					poll.show_results = data.show_results;
					poll.self_participate = data.self_participate;
					poll.ends = data.ends.toDate().getTime();


					var options = [];
					KRUtils.each(data.options, (key,option)=>{
						if(option.value){
							options.push(option.value);
						}

					})
					poll.options = options;
					this.props.callbackSubmit(poll);
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
	onToggleOption = (option) => {
		this.form.updateValueForm(option, !this.form.getValueInputForm(option));
	}
	updateOption = (option, value) => {
		let options = deepClone(this.getOptions(), ['parent']);
		options = options.map((_option) => {
			let newOption = deepClone(_option, ['parent']);
			if(newOption.id == option.id){
				newOption.value = value;
			}
			return newOption;
		});
		this.form.updateValueForm('options', options);
	}
	onDeleteOption = (option) => {
		let options = deepClone(this.getOptions(), ['parent']);
		options = options.filter((_option) => {
			return _option.id !== option.id
		});
		this.form.updateValueForm('options', options);
	}
	addOption = () => {
		let options = deepClone(this.getOptions(), ['parent', 'editor']);

		if(options.length < 5){
			options.push(
				{
					id: uniqueId(),
					placeholder: this.$t("Options"),
					value: "",
					parent: this,
					optionParentName: "options"
				}
			);
			this.form.updateValueForm('options', options);
		}else{
			ModalManager.getInstance().alert(this.$t("Error"),this.$t("You can only add {{count}} options",{count:5}))
		}
	}
	checkDisabledButton () {
		return !this.form.getFormValidation(false).valid;
	}
	onDrop = (droppedItemData, currentItemData) => {
		let options = deepClone(this.getOptions(), ['parent']);
		options = options.filter((option) => {
			return option.id !== droppedItemData.option.id;
		});
		options[currentItemData.index] = droppedItemData.option;
		options.splice(currentItemData.index + 1, 0, currentItemData.option);
		this.form.updateValueForm('options', options);
	}
	onStartDrag = ()=> {
		this.disableInputs = true;
		this.forceUpdate();
	}
	onEndDrag = () => {
		this.disableInputs = false;
		this.forceUpdate();
	}
	renderGhost = (option) => {
		return <OptionInput className="option-input__dragged" option={option} />
	}
	renderOptions() {
		return this.getOptions().map((option, index) => {
			return (
			<DnD
				key={index}
				type="drag-drop"
				// Items which can send data, array of types items
				typesSenders={['poll_item']}
				// Type this item
				typeRecipient="poll_item"
				onDrop={this.onDrop}
				ghostComponent={this.renderGhost(option)}
				buttonDnDClass="option-input__reorder"
				data={{
					option,
					index,
				}}
				shiftTop={-10}
				className="poll-form__dnd"
				onStartDrag={this.onStartDrag}
				onEndDrag={this.onEndDrag}
			>
			<OptionInput onDelete={this.onDeleteOption} onChange={this.updateOption} disableInputs={this.disableInputs} option={option} />
		</DnD>)
		});
	}
	render() {
		return (
			<form className="poll-form" onSubmit={this.onSubmit}>
					{this.form.renderFormError()}
					<fieldset>
						<TextInput2
							onChange={(value, submit) => this.onChangeInput('question', value, submit)}
							value={this.form.getValueInputForm('question')}
							label={this.$t("What do you want to ask?")}
							placeholder={""}
						/>
						{this.renderOptions()}
						<div onClick={this.addOption} className="poll-form__add-option">
							{this.$t("Add new option")}
						</div>
						<DateTimePicker
							placeholder={this.$t("Date")}
							value={this.form.getValueInputForm('ends')}
							onChange={(value) => this.onChangeInput('ends', value)}
						/>
						<CheckBoxLabeled
							checked={this.form.getValueInputForm('is_anonymous')}
							onToggle={() => this.onToggleOption("is_anonymous")}
							label={this.$t("Is Anonymous?")}
							reverseSide={true}
							description={this.$t("Nobody (including you) will be able to see who voted. You will only see the final result")}
						/>
						<CheckBoxLabeled
							checked={this.form.getValueInputForm('show_results')}
							onToggle={() => this.onToggleOption("show_results")}
							label={this.$t("Show Results?")}
							reverseSide={true}
							description={this.$t("Would you like to show the final poll results to parents?")}
						/>
						<CheckBoxLabeled
							checked={this.form.getValueInputForm('self_participate')}
							onToggle={() => this.onToggleOption("self_participate")}
							description={this.$t("Whether or not you would like to participate to the poll")}
							reverseSide={true}
							label={this.$t("Do you want to participate?")}
						/>
						<Space height="50px"/>
						<div className="clearfix">
							<Button disabled={this.checkDisabledButton()} onClick={this.onSubmit} typeDesign="primary" name={(this.props.id ? this.$t("Edit poll") :this.$t("Post poll"))}/>
						</div>
					</fieldset>
			</form>
		);
	}
}
PollFormComponent.propTypes = {
	poll: PropTypes.object,
	callbackSubmit: PropTypes.func.isRequired,
}
export const PollForm = withTranslation()(PollFormComponent)
