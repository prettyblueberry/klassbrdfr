import * as React from "react";
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import {
	Button,
	HeaderTextSmall,
	HeaderText,
	Select,
} from "../../../../presentational";
import classnames from "classnames";
import {FormAPI} from "../../_system/FormAPI";
import "./ImportParentsChooseClassForm.scss";
import {KRClient, KRUtils} from "@klassroom/klassroom-sdk-js";
class ImportParentsChooseClassFormComponent extends React.Component {
	static $t;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
		this.steps = this.props.stepsAPI;

		this.form = new FormAPI(this);
		this.form.setFormSettings({
			formValidation: null,
			formValue: {
				class:  "",
			},
			formRules: {
				class: [
					{
						type: "not_empty",
						errorText: this.$t("subject required")
					},
				],
			}
		});
		this.modal = this.props.modalAPI;
		this.classes = [];
	}
	componentDidMount() {
		this.modal.disableBackButton();
		this.loadClasses();
	}
	loadClasses = () => {

			this.getClasses();
			this.forceUpdate();

	}
	onChangeFormValue = (formValue) => {
		// data of step updated here
		this.steps.updateStepData(formValue, this);
	}
	onChangeClass = (value, submit = false) => {
		this.form.updateValueForm('class', value);
		if(submit) {
			this.onSubmit();
		}
	}
	renderCountMembers(countMembers, _className) {
		return (
		<div className="import-parents-choose-class-form__count-members">
			<div className="import-parents-choose-class-form__count-members__h1">{_className}</div>
			{countMembers} {this.$t("members")}
		</div>
		)
	}
	getClasses = () => {
		this.classes = [];

		KRUtils.each(KRClient.getInstance().classrooms,(classroomID,classroom) => {
				this.classes.push({
					value: classroomID,
					title: classroom.name,
				});
		});
		
		return this.classes;
	}
	nextStep = () => {
		this.steps.addStep('ChooseImportMethod');
	}
	checkDisabledButton () {
		const enabled = this.form.getValueInputForm('class') && this.form.getValueInputForm('class') != "";
		return !enabled;
	}
	render() {


		if(this.steps.getStepData(this.props.id).data){
			this.form.updateValueForm("class",this.steps.getStepData(this.props.id).data.class,false,false);
		}



		return (
		<div className="import-parents-choose-class-form">
			<div className="import-parents-choose-class-form__container">
				<HeaderTextSmall style={{fontSize: "13px"}} textJSX={this.$t("ADD PARENTS TO {{class}}",{class: this.form.getValueInputForm('class').name})}/>
				<HeaderText className="import-parents-choose-class-form__h3" textJSX={this.$t("Choose a class")}/>
				<Select
					value={this.form.getValueInputForm('class')}
					onChange={this.onChangeClass}
					label={this.$t("class")}
					items={this.getClasses()}
					showValueInSelection={this.form.getValueInputForm('class').name}
					styleItem={{height: "60px"}}
					placeholder={this.$t("Choose a class")}
				/>
			</div>
			<Button disabled={this.checkDisabledButton()} className="import-parents-choose-class-form__submit" onClick={this.nextStep} typeDesign="primary" name={this.$t("Continue")}/>
		</div>)
	}
}

ImportParentsChooseClassFormComponent.propTypes = {
	stepsAPI: PropTypes.object.isRequired,
}
export const ImportParentsChooseClassForm = withTranslation()(ImportParentsChooseClassFormComponent)
