import * as React from "react";
import { withTranslation } from 'react-i18next';
import {PopupMenu} from "@klassroom/klassroom-react-lib";
import PropTypes from 'prop-types';
import {KRUtils, KRFile} from "@klassroom/klassroom-sdk-js";
import fileDialog from 'file-dialog';

import "./PhotoSelector.scss";

class PhotoComponent extends React.Component {
	static $t;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
		this.state = {
			showPopup: false
		}


	}
	componentDidMount() {

	}
	componentWillUnmount() {

	}

	changePhotoFromApp = () => {
		kbApp.modalAPI.showModal("chooseAvatar",{
				callback:(avatar) => {
						this.props.callbackChangePhoto(null, avatar)

				}
		});
	}

	changePhoto = () => {
		if(typeof this.props.callbackChangePhoto == "function"){
			fileDialog({ accept: 'image/*' })
      .then(files => {
        if (files && files.length) {
					let file = files[0];
 					let reader  = new FileReader();
 					reader.onloadend = () => {
						KRUtils.processImage(reader.result, file.type, 1280,(dataUrl) => {
							this.props.callbackChangePhoto(
									KRFile.dataURItoFile(dataUrl,file.name)
							);
						});
 				};
 				reader.onerror = (error) => {
 				};
 				reader.readAsDataURL(file);

        }
      })
		}
	}
	clearPhoto = () => {
		this.props.callbackChangePhoto(null);
	}
	getPhotoUrl() {
		if(this.props.photo) {
			if(typeof this.props.photo === "string"){
				return this.props.photo;
			}else(this.props.photo instanceof KRFile)
				return this.props.photo.dataUrl;
		}
		return null;
	}

	render() {
		if(!this.getPhotoUrl()) {
			return (

				<PopupMenu
					items={[
						{text: this.$t("Choose a fun Klassroom Avatar"), callback: this.changePhotoFromApp, visible : this.props.avatar == true },
						{text: this.$t("Choose from your library"), callback: this.changePhoto, visible : true },
						{text: this.$t("Delete"), callback: this.clearPhoto,  visible : true },
					]}
					disable={!this.props.callbackChangePhoto}
					>

					<div className="photo-component photo-component--empty">
						<img onClick={this.showPopup} src="/public/images/make-photo.svg" className="photo-component__photo-img" />

					</div>
				</PopupMenu>

			)
		} else {
			return (
				<PopupMenu
					items={[
						{text: this.$t("Choose a fun Klassroom Avatar"), callback: this.changePhotoFromApp, visible : this.props.avatar == true },
						{text: this.$t("Choose from your library"), callback: this.changePhoto, visible : true },
						{text: this.$t("Delete"), callback: this.clearPhoto,  visible : true },
					]}
					disable={!this.props.callbackChangePhoto}
					>

					<div className="photo-component">
						<div className="photo-component__photo">
							<div style={{backgroundImage: `url(${this.getPhotoUrl()})`}} className="photo-component__photo-img" />
						</div>

					</div>
				</PopupMenu>

			)
		}
	}
}

PhotoComponent.propTypes = {
	callbackChangePhoto: PropTypes.func,
	photo: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.object
	])
}
export const PhotoSelector = withTranslation()(PhotoComponent)
