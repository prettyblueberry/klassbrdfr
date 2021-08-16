import * as React from "react";
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { ModalSystem } from '../../../../containers/modals';
import {PopupMenu} from "@klassroom/klassroom-react-lib";
import {deepEqual} from "utils";
import "./ClassItemLeft.scss";
import {EditClassRoom} from "components/containers/forms";
import {ModalManager} from "containers/modals"

export class ClassItemLeftComponent extends React.Component {
	static translate;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
		this.state = {
			showMenu: false
		}
	}
	componentDidMount() {

	}
	componentWillUnmount() {

	}



	removeClass = () => {
		kbApp.modalAPI.confirm(this.$t("Do you want to remove this class? All associated data will be lost.")
			,(val) => {
				if(val){

					const prompt = kbApp.modalAPI.prompt(this.$t("Please type 'DELETE' to remove this class."),(response)=>{
							if(response && response.toLowerCase() == this.$t('delete')){
								showLoader(this.$t("Deleting class..."));
								this.props.classroom.delete()
								.then(() => {
										prompt.hideModal();
								})
								.catch((err) => {
											ModalManager.getInstance().alert(this.$t("Error"), err.message);
								})
								.finally(()=>hideLoader());
							}else{
								ModalManager.getInstance().alert(this.$t("Error"), this.$t("Incorrect value"));
							}
					});
				}
		});
	}
	unlinkClass = () => {
		kbApp.modalAPI.confirm(this.$t("Do you want to unlink this class?")
			,(val) => {
				if(val){
					showLoader(this.$t("Unlinking class..."));
					this.props.classroom.unlink()
					.then(() => {

					})
					.catch((err) => {
								ModalManager.getInstance().alert(this.$t("Error"), err.message);
					})
					.finally(()=>hideLoader());
				}
		}
	 );
	}
	editClassRoom = () => {
		console.log(kbApp, 'kbApp!!');
		const modal = kbApp.modalAPI.dialog({
				title:this.$t("Edit class"),
				closeButton:false,
				message:
						<EditClassRoom
							initFormValue={{}}
							callbackSubmit={(data)=>{
									this.props.classroom.name = data.internName;
									this.props.classroom.teacher = data.principalTeacher;
									this.props.classroom.externalID = data.internID;
									this.props.classroom.students_count = data.studentNumber;
									showLoader(this.$t("Saving class..."));

					        this.props.classroom.save()
					        .then(() => {
											modal.hideModal();
					        })
					        .catch((err) => {
					              ModalManager.getInstance().alert(this.$t("Error"), err.message);
					        })
					        .finally(()=>hideLoader());
							}}
							callbackCancel={()=>{modal.hideModal()}}
							errorText={""}
							callbackClearError={()=>{}}
							classroom={this.props.classroom}
						/>,
		});
	}
	getMenuItems() {
		return [
			{text: this.$t("edit class"), callback: this.editClassRoom, visible: true},
			{text: this.$t("unlink klassroom class"), callback: this.unlinkClass, visible: (this.props.classroom && this.props.classroom.klass)},
			{text: this.$t("remove class"), callback: this.removeClass, visible: true},
		];
	}
	renderMenu() {

		return (
			<>

				<PopupMenu alignRight={true} className="class-item-left__popup" items={this.getMenuItems()}>
						<img  className="class-item-left__menu-icon" src="/public/pages/listClasses/spread-icon.svg"/>
				</PopupMenu>
			</>
		);
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
					<div className="class-item-left">
						{this.renderMenu()}
						<div className="class-item-left__dnd-inactive" style={{backgroundImage:`url("/public/pages/listClasses/reorder-inactive.svg")`}}/>
						<img className="class-item-left__dnd-active" src="/public/pages/listClasses/reorder-active.svg"/>
						{false && <img className="class-item-left__icon" src="/public/pages/listClasses/class-icon.svg"/>}
						<div className="class-item-left__name">{this.props.classroom.name}</div>
						<div className="class-item-left__teacher" dangerouslySetInnerHTML={{__html: this.$t('Managed by <b>{{teacher}}</b>', {teacher: this.props.classroom.teacher})}}></div>
						<div className="class-item-left__id">{this.props.classroom.externalID}</div>
					</div>
				)}
			}
			</ModalSystem>
		);
	}
}
ClassItemLeftComponent.propTypes = {
	classroom: PropTypes.object.isRequired,
	listAPI: PropTypes.object,
}
export const ClassItemLeft = withTranslation()(ClassItemLeftComponent)
