import * as React from "react";
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import {
	Button,
	HeaderTextSmall,
	HeaderText,
	BackButton
} from "../../../../presentational";
import {ListStep3} from "../../../lists";
import {FormAPI} from "../../_system/FormAPI";
import classnames from "classnames";
import "./CSV_Step3Form.scss";
import {KRClient} from "@klassroom/klassroom-sdk-js";
import {ModalManager} from "containers/modals"

class CSV_Step3FormComponent extends React.Component {
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
				contacts: [],
			},
			formRules: {
				contacts: [
					{
						type: "not_empty",
						errorText: this.$t("contacts required")
					},
				]
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
	getData = () => {
		const step3Data = this.steps.getStepData("CSV_Step3");
		const stepClass = this.steps.getStepData("ChooseClassStep");
		let contacts = [];
		let _class = null;
		if(step3Data && step3Data.data && step3Data.data.contacts) {
			contacts = step3Data.data.contacts;
		}
		if(stepClass && stepClass.data && stepClass.data.class) {
			_class = KRClient.getInstance().classrooms[stepClass.data.class];
		}
		return {
			contacts,
			class: _class
		}
	}
	nextStep = () => {
		showLoader(this.$t("Importing parents..."));
		// here you can get result!
		let data = this.getData();
		KRClient.getInstance().importParents(data.contacts,data.class.id).then(() => {
				this.steps.addStep('ImportParentsSuccess');

		}).catch((err)=>{
			ModalManager.getInstance().alert(this.$t("Error"), err.message);
		}).finally(()=>{
			hideLoader();
		});

	}
	onBack = () => {
		this.steps.goBack();
	}
	checkDisabledButton() {
		return !this.form.getFormValidation(false).valid;
	}
	getCount() {
		return this.form.getValueInputForm('contacts').length;
	}
	render() {
		return (
		<div className="csv_step-3-form">
			<div className="csv_step-3-form__container">
				<div className="csv_step-3-form__status">
					<HeaderTextSmall className="csv_step-3-form__h2" textJSX={this.$t("STEP 3")}/>
				</div>
				<HeaderText className="csv_step-3-form__h3" textJSX={this.$t("Confirm your <green>import</green> to <blue>{{name}}</blue>",{name:this.getData().class.name})}/>
				<HeaderTextSmall className="csv_step-3-form__h4" textJSX={this.$t("Nice! Now let's confirm your import to add these members to your klassboard.")}/>
				<ListStep3
					formAPI={this.form}
					stepsAPI={this.steps}
				/>
			</div>
			<Button
				disabled={this.checkDisabledButton()}
				className="csv_step-3-form__submit"
				onClick={this.nextStep}
				typeDesign="primary"
				iconType="check"
				name={this.$t("Confirm import <span class='csv_step-3-form__count_btn'>({{count}} members)</span>", {count: this.getCount()})}
			/>
		</div>)
	}
}

CSV_Step3FormComponent.propTypes = {
	stepsAPI: PropTypes.object.isRequired,
}
export const CSV_Step3Form = withTranslation()(CSV_Step3FormComponent)
