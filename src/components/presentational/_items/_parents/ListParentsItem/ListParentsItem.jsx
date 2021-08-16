import * as React from "react";
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import {EditParentForm} from "forms";
import {RoundIconMiddle} from "presentational";
import {PopupMenu} from "@klassroom/klassroom-react-lib";
import classnames from "classnames";
import {deepEqual} from "utils";
import "./ListParentsItem.scss";
import {KRUtils} from "@klassroom/klassroom-sdk-js";
import {ModalManager} from "containers/modals"

class ListParentsItemComponent extends React.Component {
	static translate;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
		this.list = this.props.listAPI;

		this.deleted = false;	}


	getParent = () => {
		return this.props.parent
	}
	renderChild() {
		if(this.getParent().children && Array.isArray(this.getParent().children) && this.getParent().children.length > 0) {
			return (
				<div className="list-parents-item__text-dad">
					{this.$t("Dad of")}
					<b>{this.getParent().children[0].first_name} {this.getParent().children[0].last_name}</b>
				</div>
			);
		}
		return null;
	}
	getRootClasses() {
		let classes = {
			"list-parents-item": true,
		}
		if(this.getParent().userID != null){
			classes["list-parents-item--linked"] = true;
		}

		return classnames(classes);
	}
	deleteParent = () => {
		kbApp.modalAPI.confirm(this.$t("Do you want to remove this parent? All associated data will be lost.")
			,(val) => {
				if(val){

					showLoader(this.$t("Deleting parent..."));
					this.props.parent.delete()
					.then(() => {
							this.deleted = true;
							this.list.sendRequest("loadParents");
							this.forceUpdate();

					})
					.catch((err) => {
								ModalManager.getInstance().alert(this.$t("Error"), err.message);
					})
					.finally(()=>hideLoader());

				}
		});
	}

	editParent = () => {
		this.modalAPI = kbApp.modalAPI.dialog({
			dialogClassName: "edit-parent__modal",
			title: this.$t("Edit parent"),
			closeButton: true
		});
		this.modalAPI.message = <EditParentForm
					initData={this.props.parent}
					modalAPI={this.modalAPI}
					callbackSubmit={(data)=>{
						this.props.parent.first_name = data.first_name;
						this.props.parent.last_name = data.last_name;
						this.props.parent.phone = data.phone;
						this.props.parent.email = data.email;
						this.props.parent.classrooms = data.classrooms.map((classroom) => {
							return classroom.value;
						})
							showLoader(this.$t("Saving parent..."));

							this.props.parent.save()
							.then(() => {
									this.modalAPI.hideModal();
									this.forceUpdate();
							})
							.catch((err) => {
										ModalManager.getInstance().alert(this.$t("Error"), err.message);
							})
							.finally(()=>hideLoader());
					}}

					/>;
	}


	getMenuItems() {
		return [
			{text: this.$t("Edit"), callback: this.editParent, visible: true},
			{text: this.$t("Delete"), callback: this.deleteParent, visible: true}		];
	}
	renderAvatarImg () {
		if(!this.getParent().thumb_image_url) {
				let name = this.getParent().first_name.replace(/[,|\.|_|-|\'|\"]/g, "").toUpperCase();
				if(!name){
					name = this.getParent().last_name.replace(/[,|\.|_|-|\'|\"]/g, "").toUpperCase() || "";
				}
				return <RoundIconMiddle char={name[0]} />
		}
		return <img className="list-parents-item__icon-img" src={this.getParent().thumb_image_url}/>;
	}
	renderAvatar () {
		return (
			<div className="list-parents-item__icons-container">
				<div className="list-parents-item__icon">
						<div className="list-parents-item__icon-wrapper">
							{this.renderAvatarImg()}
						</div>
					<div className="icon klassicon-link"></div>
				</div>
			</div>
		);
	}
	render() {

		if(this.deleted){
			return(
				<div>
				</div>);
		}
		return (
			<div className={this.getRootClasses()}>
				{this.renderAvatar()}

				<div className="list-parents-item__texts-container">
					<div className="list-parents-item__text-class">{this.getParent().displayClassrooms() }</div>
					<div className="list-parents-item__text-name"><b>{this.getParent().first_name || ""}</b> {this.getParent().last_name || ""}</div>
					{this.renderChild()}
				</div>

				<div className="list-parents-item__mobile-container">
					<div className="list-parents-item__label">{this.$t("Mobile phone")}</div>
					<div className="list-parents-item__mobile">{KRUtils.formatPhone(this.getParent().phone) || ""}</div>
				</div>

				<div className="list-parents-item__email-container">
					<div className="list-parents-item__label">{this.$t("Email")}</div>
					<div className="list-parents-item__email">{this.getParent().email || ""}</div>
				</div>

				<div className="list-parents-item__menu-container">
					<PopupMenu
						alignRight={true}
						className="class-item-left__popup"
						items={this.getMenuItems()}

					>

					<div className="icon klassicon-options"></div>

					</PopupMenu>
				</div>

			</div>
		);
	}
}
ListParentsItemComponent.propTypes = {
	parent: PropTypes.object.isRequired,
	listAPI: PropTypes.object.isRequired,
}
export const ListParentsItem = withTranslation()(ListParentsItemComponent)
