import * as React from "react";
import { withTranslation } from 'react-i18next';
import {
	Button,
	TextInput2,
	OptionInput,
	Space,
} from "presentational";
import {DnD} from "../../../coordinates";
import {uniqueId, deepClone} from "utils";
import {FormAPI} from "forms";
import PropTypes from 'prop-types';
import "./MultimediaAddListForm.scss";
import {KRPostChecklist, KRUtils} from "@klassroom/klassroom-sdk-js";
import {ModalManager} from "containers/modals"

class MultimediaAddListFormComponent extends React.Component {
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
				title:  this.props.list ? this.props.list.title : "",
				options:  this.props.list ? this.props.list.items : [],
			},
			formRules: {
				title: [
					{
						type: "not_empty",
						errorText: this.$t("title required")
					},
				],
				options: [
					{
						type: "function",
						validationProperties: {
							func: (options) => {
								var valid = false
								KRUtils.each(options,(key, option)=>{
										if(option.value){
											valid = true;
										}
								});

								return valid && options.length > 0;
							}
						},
						errorText: "items required"
					}
				],
			}
		}
		this.disableInputs = false;

		if(this.props.list){
			const options = [];
			KRUtils.each(this.props.list.items,(key,item)=>{
				options.push(
					{
						id: uniqueId(),
						placeholder: this.$t("Item"),
						value: item,
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
					let list = new KRPostChecklist();
					list.title = data.title;
					var items = [];
					KRUtils.each(data.options, (key,option)=>{
						if(option.value){
							items.push(option.value);
						}

					})
					list.items = items;
					this.props.callbackSubmit(list);
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
	updateOption = (option, value) => {
		let options = deepClone(this.getOptions(), ['parent', 'editor']);
		options = options.map((_option) => {
			let newOption = deepClone(_option, ['parent', 'editor']);
			if(newOption.id == option.id){
				newOption.value = value;
			}
			return newOption;
		});
		this.form.updateValueForm('options', options);
	}
	onDeleteOption = (option) => {
		let options = deepClone(this.getOptions(), ['parent', 'editor']);
		options = options.filter((_option) => {
			return _option.id !== option.id
		});
		this.form.updateValueForm('options', options);
	}
	addOption = () => {
		let options = deepClone(this.getOptions(), ['parent', 'editor']);

		if(options.length < 20){
			options.push(
				{
					id: uniqueId(),
					placeholder: this.$t("Item"),
					value: "",
					parent: this,
					optionParentName: "options"
				}
			);
			this.form.updateValueForm('options', options);
		}else{
			ModalManager.getInstance().alert(this.$t("Error"),this.$t("You can only add {{count}} items",{count:20}))
		}

	}
	checkDisabledButton () {
		return !this.form.getFormValidation(false).valid;
	}
	onDrop = (droppedItemData, currentItemData) => {
		let options = deepClone(this.getOptions(), ['parent', 'editor']);
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
					key={option.id}
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
			<form className="multimedia-add-list-form" onSubmit={this.onSubmit}>
					{this.form.renderFormError()}
					<fieldset>
						<TextInput2
							onChange={(value, submit) => this.onChangeInput('title', value, submit)}
							value={this.form.getValueInputForm('title')}
							placeholder={this.$t("Title")}
						/>
						{this.renderOptions()}
						<div onClick={this.addOption} className="multimedia-add-list-form__add-option">
							{this.$t("Add new item")}
						</div>
						<Space height="50px"/>
						<div className="clearfix" style={{"float":"right"}}>
							<Button disabled={this.checkDisabledButton()} onClick={this.onSubmit} typeDesign="primary" name={(this.props.id ? this.$t("Edit list") :this.$t("Post list"))}/>
						</div>
					</fieldset>
			</form>
		);
	}
}
MultimediaAddListFormComponent.propTypes = {
	list: PropTypes.object,
	callbackSubmit: PropTypes.func.isRequired,
}
export const MultimediaAddListForm = withTranslation()(MultimediaAddListFormComponent)
