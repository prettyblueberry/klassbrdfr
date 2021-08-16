import * as React from "react";
import { withTranslation } from 'react-i18next';
import {Button, ClassItemSmall, Button2} from "../../../../presentational";
import { withRouter } from 'react-router-dom';
import {FormAPI} from "../../_system/FormAPI";
import PropTypes from 'prop-types';
import "./AddClassFinishForm.scss";
import {KRClient} from "@klassroom/klassroom-sdk-js";

class AddClassFinishFormComponent extends React.Component {
	static $t;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
		this.form = new FormAPI(this);
		this.formSettings = {
			formValidation: null,
			formValue: {

			},
			formRules: {

			}
		}
	}
	createNewClass = () => {
		this.props.callbackOnBack();
	}
	getClass(){
		const klass = {
				externalID:this.props.class.internID,
				name:this.props.class.internName,
				teacher:this.props.class.principalTeacher,
				students_count:this.props.class.studentNumber,
		}

		return klass;
	}
	renderClass() {
		if(this.getClass()) {
			return <ClassItemSmall classroom={this.getClass()}/>
		}
		return null;
	}
	gotoDashboard = (event) => {
		event.preventDefault();
		this.props.history.push(`/my-classes`)
	}
	getYear() {
		let nextYear = KRClient.getInstance().getPeriod() + 1;
		return `${KRClient.getInstance().getPeriod()}-${nextYear}`;
	}
	render() {
		return (
			<div className="add-class-finish-form">
				<div className="add-class-finish-form__h1">{this.$t("SCHOOL YEAR")}</div>
				<div className="add-class-finish-form__year">{this.getYear()}</div>
				<div className="add-class-finish-form__container">
					<div className="add-class-finish-form__h2">{this.$t("CONGRATULATIONS")}</div>
					<div className="add-class-finish-form__h3" dangerouslySetInnerHTML={{__html: this.$t("Your class has been <b>created</b>!")}}></div>
					<div className="add-class-finish-form__h4" dangerouslySetInnerHTML={{__html: this.$t("Congratulations! You have added a new class to your school. <b>Add a new class</b> or <b>Access your dashboard</b>.")}}></div>
					<div className="add-class-finish-form__classes">
						{this.renderClass()}
						<Button2 onClick={this.createNewClass} title={this.$t('Create a new class')} />
					</div>
					<div className="add-class-finish-form__or">
						<hr/> {this.$t("or")} <hr/>
					</div>
					<div className="add-class-finish-form__buttons">
						<Button onClick={this.gotoDashboard} iconType="arrow-white" iconSide="right" typeDesign="primary" name={this.$t("Go to my classes")}/>
					</div>
				</div>
				<img className="add-class-finish-form__unicorn-left" src="/public/pages/addClass/unicorn-left.png"/>
				<img className="add-class-finish-form__unicorn-right" src="/public/pages/addClass/unicorn-right.png"/>
			</div>);
	}
}
AddClassFinishFormComponent.propTypes = {
	class: PropTypes.object,
	callbackClearError: PropTypes.func.isRequired,
	callbackOnBack: PropTypes.func.isRequired,
	year: PropTypes.number.isRequired,
}

export const AddClassFinishForm = withRouter(withTranslation()(AddClassFinishFormComponent));
