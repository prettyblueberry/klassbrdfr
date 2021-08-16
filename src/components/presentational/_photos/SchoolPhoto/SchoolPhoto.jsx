import * as React from "react";
import { withTranslation } from 'react-i18next';
import {PhotoSelector} from "../../../presentational";
import {KRClient, KBEvent} from '@klassroom/klassroom-sdk-js';
import "./SchoolPhoto.scss";
import {ModalManager} from "containers/modals"

class SchoolPhotoComponent extends React.Component {
	static translate;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
		this.addListeners();
	}
	addListeners(){
		KRClient.getInstance().addListener(this, this.handleEvent);
	}
	removeListeners(){
		KRClient.getInstance().removeListener(this);
	}
	componentWillUnmount(){
		this.removeListeners();
	}
	handleEvent = (ev, opts) => {
		switch(ev){
				case KBEvent.organization_updated:
					this.forceUpdate();
					break;
		}
	}
	render() {
		return (
			<div className="school-photo">
			<PhotoSelector
				callbackChangePhoto = {(photo) => {
						showLoader(this.$t("Uploading school cover..."));
						KRClient.getInstance().organization.setCover(photo)
						.then(() => {
						})
						.catch((err) => {
									ModalManager.getInstance().alert(this.$t("Error"), err.message);
						})
						.finally(()=>hideLoader());
					}
				}
				photo={KRClient.getInstance().organization.thumb_image_url}
			/>
			</div>
		);
	}
}
export const SchoolPhoto = withTranslation()(SchoolPhotoComponent)
