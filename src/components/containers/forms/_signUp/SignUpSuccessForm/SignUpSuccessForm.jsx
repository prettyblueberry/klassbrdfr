import * as React from "react";
import { withTranslation } from 'react-i18next';
import {Button} from "../../../../presentational";
import {PopupMenu} from "@klassroom/klassroom-react-lib";
import {FormAPI} from "../../_system/FormAPI";
import { ModalSystem } from '../../../modals';
import fileDialog from 'file-dialog';
import PropTypes from 'prop-types';
import "./SignUpSuccessForm.scss";
import {KRUtils, KRFile} from "@klassroom/klassroom-sdk-js";
import { parsePhoneNumberFromString } from 'libphonenumber-js';


import {dataURItoBlob} from "../../../../../lib/Utils";

class SignUpSuccessFormComponent extends React.Component {
	static $t;
	static i18n;
	modalAPI = null;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
		this.form = new FormAPI(this);
		this.formSettings = {
			formValidation: null,
			formValue: {
				photo: null,
			},
			formRules: {
				photo: []
			}
		}
		this.state = {
			showPopupChangeAvatar: false,
			selectedAvatar: null,
			selectedPhoto: null,
		}
	}
	componentDidMount() {

	}
	componentWillUnmount() {

	}

	getPersonalInfoData() {
		return Object.assign({},this.props.userData.personalInfoData) ;
	}
	getFormattedPhone() {
		if(this.props.userData) return null;
		const formattedPhone = parsePhoneNumberFromString(this.props.userData.contactInfoData.phoneInput.phone, this.props.userData.contactInfoData.phoneInput.countryData.iso2.toUpperCase());
		return  formattedPhone.formatInternational();

	}
	changePhotoFromApp = () => {
		kbApp.modalAPI.showModal("chooseAvatar",{
				callback:(avatar) => {
						this.form.updateValueForm('photo', null);
						this.form.updateValueForm('avatar',avatar);
						this.setState({
								selectedPhoto:null,
								selectedAvatar: avatar,
						})

				}
		});
	}
	changePhoto = () => {
		var self = this;
    fileDialog({ accept: 'image/*' })
      .then(files => {
        if (files && files.length) {
					var file = files[0];
 					var reader  = new FileReader();
 					reader.onloadend = function () {
 					KRUtils.processImage(reader.result, file.type, 1280,(dataUrl) => {
						self.form.updateValueForm('photo',KRFile.dataURItoFile(dataUrl,file.name));
						self.form.updateValueForm('avatar',null);
 						self.setState({
							selectedAvatar: null,
							selectedPhoto: dataUrl,
						})
 				 	});
 				};
 				reader.onerror = function (error) {
 				};
 				reader.readAsDataURL(file);
					this.hidePopup();
        }
      })
	}
	clearPhoto = () => {
		this.form.updateValueForm('photo', null);
		this.form.updateValueForm('avatar',null);
		this.setState({
				selectedPhoto:null,
				selectedAvatar: null,
		})
		this.hidePopup();
	}
	getPhotoUrl() {
		const photoValue = this.form.getValueInputForm('photo');
		if(this.state.selectedAvatar){
			return this.state.selectedAvatar;
		}else if(this.state.selectedPhoto){
			return this.state.selectedPhoto;
		}
		return "/public/images/make-photo.svg"
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
					this.props.callbackSubmit(data);
				}
			}
		)
	}

	renderPopup() {
		return (
			<PopupMenu
				items={[
					{text: this.$t("Choose a fun Klassroom Avatar"), callback: this.changePhotoFromApp},
					{text: this.$t("Choose from your library"), callback: this.changePhoto},
					{text: this.$t("Delete"), callback: this.clearPhoto},
				]}

			>
				<img src={this.getPhotoUrl()} className="make-photo" />
			</PopupMenu>
		)
	}
	render() {
			return (
				<>
					<div className="small-butterscotch" />
					<div className="small-coral" />
					<div className="small-turquoise-blue" />
					<div className="small-purple" />
					<div className="signup-success-form">
						<div className="signup-success-form__header1">{this.$t('CONGRATULATIONS')}</div>
						<div className="signup-success-form__header2">
							<span className="text">{this.$t('Your account has been created!')} </span>

						</div>
						<div className="signup-success-form__header3">
								{this.$t("Good job {{name}}! Your account has been created. Now add your school.",
										{name: this.getPersonalInfoData().firstName || ""}
								)}

						</div>
						<div className="signup-success-form__body">
								<div className="signup-success-form__photo-name">

									{this.renderPopup()}
									<div className="signup-success-form__photo-fullname">
										{this.getPersonalInfoData().firstName || ""} {this.getPersonalInfoData().lastName || ""}
										<div className="signup-success-form__position">{(this.props.userData.contactInfoData && this.props.userData.contactInfoData.email) || ''}</div>
										<div className="signup-success-form__phone">{this.getFormattedPhone() || ''}</div>
									</div>



								</div>

								<div className="signup-success-form__container">
									<Button onClick={this.onSubmit} typeDesign="primary" name={this.$t("Add my school")}/>
								</div>

								<img src="/public/images/book.svg" className="signup-success-form__book" />
								<img
									src="/public/images/illustration.svg"
									className="signup-success-form__illustration"
								/>
								<img src="/public/images/unicorn-1.svg" className="signup-success-form__unicorn-1" />
								<img src="/public/images/unicorn-2.svg" className="signup-success-form__unicorn-2" />
							</div>
					</div>
				</>
			)
	}
}
SignUpSuccessFormComponent.propTypes = {
	callbackSubmit: PropTypes.func.isRequired,
	userData: PropTypes.object.isRequired,
}
export const SignUpSuccessForm = withTranslation()(SignUpSuccessFormComponent)
