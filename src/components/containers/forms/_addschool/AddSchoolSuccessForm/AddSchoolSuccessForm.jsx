import * as React from "react";
import { withTranslation } from 'react-i18next';
import {Button, PhotoSelector} from "../../../../presentational";
import { connect } from 'react-redux';
import {FormAPI} from "../../_system/FormAPI";
import { ModalSystem } from '../../../modals';
import PropTypes from 'prop-types';
import {deepEqual} from "../../../../../lib/Utils"
import "./AddSchoolSuccessForm.scss";
import {KRClient} from "@klassroom/klassroom-sdk-js";

class AddSchoolSuccessFormComponent extends React.Component {
	static $t;
	static i18n;
	modalAPI = null;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
		// get init photo from schoolData
		let photo = null;
		if(this.props.schoolData && this.props.schoolData.successData && this.props.schoolData.successData.photo) {
			photo = this.props.schoolData.successData.photo;
		}
		this.form = new FormAPI(this);
		this.formSettings = {
			formValidation: null,
			formValue: {
				photo: photo || null,
			},
			formRules: {
				photo: []
			}
		}
	}

	shouldComponentUpdate(nextProps) {
    // update photo if changes in root component
    if(nextProps && nextProps.schoolData && nextProps.schoolData.successData) {
			if(!deepEqual(nextProps.schoolData.successData.photo, this.form.getValueInputForm('photo'))) {
      	// The parameter updateView in updateValueForm method must be false, shouldComponentUpdate dont must re-render anything.
      	this.form.updateValueForm('photo', nextProps.schoolData.successData.photo, true, false);
			}
    }
    return true;
  }
	getUserData() {
		return this.props.userData;
	}
	getSchoolData() {
		return this.props.schoolData;
	}
	getSchoolName = () => {
		const schoolData = this.getSchoolData();
		if(schoolData.schoolNameData && schoolData.schoolNameData.schoolName) {
			return schoolData.schoolNameData.schoolName;
		}
		return "";
	}
	onSubmit = (event, toNextStep = true) => {
		if(event && event.preventDefault) {
			event.preventDefault();
		}
		this.form.getFormValidation(
			true,
			(formValidData) => {
				if(formValidData.valid && typeof this.props.callbackSubmit == "function") {
					const data = this.form.getValueForm();
					this.props.callbackSubmit(data, toNextStep);
				}
			}
		)
	}
	changePhoto = (photo) => {
		this.props.changePhoto(photo);
	}
	render() {
		return (
			<ModalSystem>
       {({modalAPI}) => {
				// 'Cause context system it is wrapper, we get link to modal API from this wrapper.
        // read documentation: https://reactjs.org/docs/context.html
        // Dont use single context system
        this.modalAPI = modalAPI;
				return (
				<>
					<div className="small-butterscotch" />
					<div className="small-coral" />
					<div className="small-turquoise-blue" />
					<div className="small-purple" />
					<div className="add-school-success">
						<div className="add-school-success__header1">{this.$t('CONGRATULATIONS')}</div>
						<div className="add-school-success__header2">
							<span className="text">{this.$t('Your school has been added!')} </span>

						</div>
						<div className="add-school-success__header3">
								{this.$t(
										'Amazing {{name}}, your school has been added. Quickly discover your personal space!',
										{name: KRClient.getInstance().user.first_name || ""}
								)}
						</div>
						<div className="add-school-success__body">
								<div className="add-school-success__photo-name">
									<PhotoSelector
										photo={this.form.getValueInputForm('photo')}
										callbackChangePhoto={this.changePhoto}
									/>
									<div className="add-school-success__photo-fullname">
										<span>{this.$t("{{school}}", {school: this.getSchoolName()})}</span>
										<div className="add-school-success__position">{this.$t("Managed by {{name}}", {name: KRClient.getInstance().user.name})}</div>
									</div>

								</div>

								<div className="add-school-success__container">
									<Button onClick={this.onSubmit} typeDesign="primary" name={this.$t("Go to my school")}/>
								</div>

								<img src="/public/images/book.svg" className="add-school-success__book" />
								<img
									src="/public/images/illustration.svg"
									className="add-school-success__illustration"
								/>
								<img src="/public/images/unicorn-1.svg" className="add-school-success__unicorn-1" />
								<img src="/public/images/unicorn-2.svg" className="add-school-success__unicorn-2" />
							</div>
					</div>
				</>
				)}
			}
			</ModalSystem>);
	}
}
AddSchoolSuccessFormComponent.propTypes = {
	callbackSubmit: PropTypes.func.isRequired,
	schoolData: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    changePhoto: (photo) => dispatch({
			type: "ADD_SCHOOL_PAGE.CHANGE_PHOTO",
			data: {photo}
		})
  }
}

export const AddSchoolSuccessForm = connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslation()(AddSchoolSuccessFormComponent));
