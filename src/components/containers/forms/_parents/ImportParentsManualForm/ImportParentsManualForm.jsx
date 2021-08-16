import * as React from "react";
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import {
	Button,
	HeaderTextSmall,
	HeaderText,
	TextInput2,
	BackButton,
	RoundIconSmall,

} from "../../../../presentational";
import classnames from "classnames";
import {FormAPI} from "../../_system/FormAPI";
import "./ImportParentsManualForm.scss";

class ImportParentsManualFormComponent extends React.Component {
	static $t;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
		this.form = new FormAPI(this);
		this.form.setFormSettings({
			formValidation: null,
			formValue: {
				first_name: "",
				last_name: "",
				email: "",
				phone: "",
			},
			formRules: {
				first_name: [
					{
						type: "not_empty",
						errorText: this.$t("First name required")
					},
				],
				last_name: [
					{
						type: "not_empty",
						errorText: this.$t("Last name required")
					},
				],
				email: [
					{
						type: "not_empty",
						errorText: this.$t("Email required")
					},
					{
						type: "email",
						errorText: this.$t("Email has wrong format")
					},
				],
				phone: [
					{
						type: "not_empty",
						errorText: this.$t("Phone required")
					},
				],
			}
		});
		this.steps = this.props.stepsAPI;
		this.modal = this.props.modalAPI;
	}
	componentDidMount() {
		this.modal.enableBackButton(this.onBack);
	}
	// this is hook
	onChangeFormValue = (formValue) => {
		// data of step updated here
		this.steps.updateStepData(formValue, this);
	}
	onChangeInput = (value, submit = false, nameInput) => {
		this.form.updateValueForm(nameInput, value);
		if(submit) {
			this.onSubmit();
		}
	}
	getData = () => {
		const stepClass = this.steps.getStepData("ChooseClassStep");
		let contacts = [
			{
				first_name: this.form.getValueInputForm('first_name'),
				last_name: this.form.getValueInputForm('last_name'),
				phone: this.form.getValueInputForm('phone'),
				email: this.form.getValueInputForm('email')
			}
		];

		let _class = null;
		if(stepClass && stepClass.data && stepClass.data.class) {
			_class = stepClass.data.class;
		}
		return {
			contacts,
			class: _class
		}
	}
	nextStep = () => {
		showLoader(this.$t("Saving data"));
		// here you can get result!
		let data = this.getData();

		setTimeout(() => {
			this.steps.addStep('ImportParentsSuccess');
			hideLoader();
		}, 3000);
	}
	onBack = () => {
		this.steps.goBack();
	}
	checkDisabledButton () {
		return !this.form.getFormValidation(false).valid;
	}
	renderIconChecker() {
		const isValid = this.form.getFormValidation(false).valid;
		if(isValid){
			return <RoundIconSmall className="import-parents-manual-form-check--valid" color="green" icon="check"/>
		}
		return <RoundIconSmall className="import-parents-manual-form-check" color="white" icon="check"/>
	}
	render() {
		return (
		<div className="import-parents-manual-form">
			<div className="import-parents-manual-form__container">
				<div className="import-parents-manual-form__status">
					<HeaderTextSmall className="import-parents-manual-form__h2" textJSX={this.$t("MANUAL IMPORT")}/>
					{this.renderIconChecker('from', this.form.getValueInputForm('from'))}
				</div>
				<HeaderText className="import-parents-manual-form__h3" textJSX={this.$t("Enter parent information")}/>
				<HeaderTextSmall className="import-parents-manual-form__h4" textJSX={this.$t("Enter the information of the parent you want to import.")}/>
				<TextInput2
					autofocus={true}
					onChange={(value, submit) => this.onChangeInput(value, submit, "first_name")}
					value={this.form.getValueInputForm('first_name')}
					type="text"
					label={this.$t("First name")}
				/>
				<TextInput2
					onChange={(value, submit) => this.onChangeInput(value, submit, "last_name")}
					value={this.form.getValueInputForm('last_name')}
					type="text"
					label={this.$t("Last name")}
				/>
				<TextInput2
					onChange={(value, submit) => this.onChangeInput(value, submit, "email")}
					value={this.form.getValueInputForm('email')}
					type="text"
					label={this.$t("Email")}
				/>
				<TextInput2
					onChange={(value, submit) => this.onChangeInput(value, submit, "phone")}
					value={this.form.getValueInputForm('phone')}
					type="text"
					label={this.$t("Mobile phone")}
				/>
			</div>
			<Button
				disabled={this.checkDisabledButton()}
				className="import-parents-manual-form__submit"
				onClick={this.nextStep}
				typeDesign="primary"
				name={this.$t("Import parent")}
			/>
		</div>)
	}
}

ImportParentsManualFormComponent.propTypes = {
	stepsAPI: PropTypes.object.isRequired,
}
export const ImportParentsManualForm = withTranslation()(ImportParentsManualFormComponent)
