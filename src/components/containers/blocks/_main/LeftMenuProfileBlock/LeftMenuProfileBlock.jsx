import * as React from "react";
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import {Button, PhotoSelector, LeftMenuItem} from "../../../../presentational";
import "./LeftMenuProfileBlock.scss";
import {KRClient,KBEvent, KREvent} from "@klassroom/klassroom-sdk-js";
import {ModalManager} from "containers/modals"

class LeftMenuProfileBlockComponent extends React.Component {
	static $t;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
		this.handleEvent = (ev, opts)=>{
				switch(ev){
					case KREvent.app_connect:
						this.forceUpdate();
						break;
						case KREvent.user_updated:
							this.forceUpdate();
							break;
						case KBEvent.organization_updated:
							this.forceUpdate();
							break;
						case KREvent.counts_updated:
							this.forceUpdate();
							break;
				}
		}
		KRClient.getInstance().addListener(this,this.handleEvent);

	}


	componentWillUnmount(){
		KRClient.getInstance().removeListener(this);
	}

	logout = () => {
		showLoader(this.$t("Signing out..."));
		KRClient.getInstance().logout()
			.then(()=>{

			})
			.catch((error) => alert(error.message))
			.finally(()=> hideLoader());
	}
	renderMenu() {
		return (
			<div className="left-menu-profile-block__menu-container">
				<LeftMenuItem to="/personal-information" icon="profile-picture" name={this.$t("Personal Information")} callback={() => {}}/>
				<LeftMenuItem to="/school-information" icon="school-informations" name={this.$t("School Information")} callback={() => {}}/>
				{/*<LeftMenuItem to="/sms-credits" icon="sms-credits-2" name={this.$t("SMS Credits")} callback={() => {}}/>
				<LeftMenuItem to="/settings" icon="settings" name={this.$t("Settings")} callback={() => {}}/>*/}

				<LeftMenuItem className="left-menu-logout" action={this.logout} icon="logout" name={this.$t("Log out")} callback={() => {}}/>
			</div>
		)
	}
	render() {
		return (
			<div className="left-menu-profile-block">

					<div className="left-menu-profile-block__shape small-butterscotch"></div>
					<div className="left-menu-profile-block__shape small-coral"></div>
					<div className="left-menu-profile-block__shape small-turquoise-blue"></div>
					<div className="left-menu-profile-block__shape small-purple"></div>

					<PhotoSelector
						avatar = {true}
						callbackChangePhoto = {(photo,avatar) => {

							if(photo){
								showLoader(this.$t("Uploading photo..."));
								KRClient.getInstance().user.setPhoto(photo)
								.then(() => {

								})
								.catch((err) => {
											ModalManager.getInstance().alert(this.$t("Error"), err.message);
								})
								.finally(()=>hideLoader());

							}else if(avatar){
								showLoader(this.$t("Uploading photo..."));
								KRClient.getInstance().user.setAvatar(avatar)
								.then(() => {

								})
								.catch((err) => {
											ModalManager.getInstance().alert(this.$t("Error"), err.message);
								})
								.finally(()=>hideLoader());
							}else{


								KRClient.getInstance().user.removePhoto()
								.then(() => {

								})
								.catch((err) => {
											ModalManager.getInstance().alert(self.$t("Error"), err.message);
								})
								.finally(()=>hideLoader());

							}



						}


						}
						photo={KRClient.getInstance().user.thumb_image_url}
					/>

					<div className="">
						<div className="left-menu-profile-block__header1">{KRClient.getInstance().organization.member.position.toUpperCase()}</div>
						<div className="left-menu-profile-block__header2">
							{KRClient.getInstance().user.name}
						</div>
					</div>

					{this.renderMenu()}
			</div>
		);
	}
}
LeftMenuProfileBlockComponent.propTypes = {

}
export const LeftMenuProfileBlock = withTranslation()(LeftMenuProfileBlockComponent);
