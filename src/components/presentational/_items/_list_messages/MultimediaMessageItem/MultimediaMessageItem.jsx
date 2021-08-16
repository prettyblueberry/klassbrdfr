import * as React from "react";
import { withTranslation } from 'react-i18next';
import {HeaderTextSmall} from "presentational";
import {PopupMenu} from "@klassroom/klassroom-react-lib";
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import "./MultimediaMessageItem.scss";
import {KRClient} from "@klassroom/klassroom-sdk-js";
import * as moment from 'moment';

class MultimediaMessageItemComponent extends React.Component {
	static translate;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
		this.campaign = this.props.campaign;
		this.post = this.campaign.post;
	}
	getData(){
		return this.campaign;
	}
	goToDetail = () => {
		const id = this.getData().id;
		if(id){
			this.props.history.push(`/detail-multimedia/`+this.getData().id);
		}
	}

	viewMessage =()=>{
		this.goToDetail();
	}
	editMessage =()=>{
		const id = this.getData().id;
		if(id){
			this.props.history.push(`/new-multimedia?id=`+this.getData().id);
		}
	}
	deleteMessage =()=>{
			this.campaign.updateStatus(3).then(()=>{
				this.forceUpdate()

			});
	}
	pauseMessage =()=>{
			this.campaign.updateStatus(1).then(()=>{this.forceUpdate()});
	}

	runMessage =()=>{
			this.campaign.updateStatus(2).then(()=>{this.forceUpdate()});
	}
	getMenuItems() {
		return [
			{text: this.$t("View"), callback: this.viewMessage, visible: true},
			{text: this.$t("Edit"), callback: this.editMessage, visible: true},
			{text: this.$t("Pause"), callback: this.pauseMessage, visible: this.getData().isRunning},
			{text: this.$t("Run"), callback: this.runMessage, visible: !this.getData().isRunning},
			{text: this.$t("Delete"), callback: this.deleteMessage, visible: !this.getData().isDeleted}
		];
	}
	renderClasses(){


		return this.getData().classrooms.map((_class, index) => {
			const classroom = KRClient.getInstance().classrooms[_class];
			if(classroom){
				if(index >= this.getData().classrooms.length -1){
					return <span key={index} className="multimedia-message-item__class">{classroom.name}</span>
				}
				return <span key={index} className="multimedia-message-item__class">{classroom.name},</span>
			}else{
				return <span key={index} ></span>
			}

		})
	}

	renderStatus(){
		if(this.campaign.isDeleted){
			return (<div className={"message-preview__header-label  message-preview__header-label-status  krRed-bg"}>{this.$t("Deleted")}</div>)
		}else{
			if(this.campaign.post.scheduled_at){
				return (<div className={"message-preview__header-label message-preview__header-label-status  krOrange-bg"}>{this.$t("Scheduled on {{date}}",{date:moment(this.campaign.post.scheduled_at).locale(this.i18n.language).format("lll")})}</div>)
			}else
			if(this.campaign.isRunning){
				return (<div className={"message-preview__header-label  message-preview__header-label-status  krNeonGreen-bg"}>{this.$t("Posted")}</div>)
			}else{
				return (<div className={"message-preview__header-label  message-preview__header-label-status  krOrange-bg"}>{this.$t("Paused")}</div>)
			}
		}

	}
	renderLabel(){

		if(!this.post){
			return null;
		}
		let post_type = null;
		let label_type = null;
		if(this.post.location){
			post_type = ("location");
			label_type = this.$t("location");
		} else if(this.post.event){
			post_type = ("event");
			label_type = this.$t("event");
		}  else if(this.post.poll){
			post_type = ("poll");
				label_type = this.$t("poll");
		} else if(this.post.checklist){
			post_type = ("list");
				label_type = this.$t("list");
		} else if(this.post.homework){
			post_type = ("homework");
			label_type = this.$t("homework");
		} else if(this.post.documents && this.post.documents.length > 0){
			post_type = ("document");
				label_type = this.$t("document");
		} else if((this.post.videos && this.post.videos.length > 0) || (this.post.audios && this.post.audios.length > 0) || (this.post.images && this.post.images.length > 0)){
			post_type = ("media");
			label_type = this.$t("media");
		} else  {
			//Some types are missing
			post_type = ("message");
			label_type = this.$t("message");
		}
		return <div className={"message-preview__header-label  message-preview__header-label-"+post_type}>{label_type.toUpperCase()}</div>
	}

	getTitle = () =>{
					if(this.post.require_signature){
						return this.$t("Signed");
					}else if(this.post.require_reply){
						return this.$t("Replied");
					}else{
						return this.$t("Viewed");
					}

	}

	render() {

		return (
			<div style={this.props.style || {}} className="multimedia-message-item">
				<div className="multimedia-message-item__icon" onClick={this.goToDetail}>
					<div className="icon klassicon-multimedia-campaign"></div>
				</div>

				<div className="multimedia-message-item__description" onClick={this.goToDetail}>
					<div title={this.getData().name} className="multimedia-message-item__description-t1">{this.getData().name}</div>
					<HeaderTextSmall className="multimedia-message-item__description-t2" textJSX={moment(this.getData().createdAt).locale(this.i18n.language).format("lll")}/>

						{this.renderLabel()}
					<div className="multimedia-message-item__description-classes">
						<div className="icon klassicon-back"></div> {this.$t("{{count}} classes", {count: this.getData().classroomsCount})}
					</div>
				</div>



				<div className="multimedia-message-item__views multimedia-message-item__statistic"  onClick={this.goToDetail}>

					<div className="multimedia-message-item__statistic-top">
						<div className="multimedia-message-item__statistic-count">{this.getData().viewsCount}</div>

					</div>

					<div className="multimedia-message-item__statistic-label">
						{this.getTitle()}
					</div>
				</div>

				<div className="multimedia-message-item__reactions multimedia-message-item__statistic"  onClick={this.goToDetail}>
					<div className="multimedia-message-item__statistic-top">
						<div className="multimedia-message-item__statistic-count">{this.getData().reactionsCount}</div>

					</div>

					<div className="multimedia-message-item__statistic-label">
						{this.$t("Reactions")}
					</div>
				</div>

				<div className="multimedia-message-item__comments multimedia-message-item__statistic"  onClick={this.goToDetail}>
					<div className="multimedia-message-item__statistic-top">
						<div className="multimedia-message-item__statistic-count">{this.getData().commentsCount}</div>

					</div>

					<div className="multimedia-message-item__statistic-label">
						{this.$t("Comments")}
					</div>
				</div>

				<div className="multimedia-message-item__menu">
				<PopupMenu
						alignRight={true}
						className="class-item-left__popup"
						items={this.getMenuItems()}
				>
					<div className="icon klassicon-options"></div>
				</PopupMenu>
				<br/>
				{this.renderStatus()}
				</div>

			</div>
		);
	}
}
MultimediaMessageItemComponent.propTypes = {

}
const TranslatedComponent = withTranslation()(MultimediaMessageItemComponent);
export const MultimediaMessageItem = withRouter(props => <TranslatedComponent {...props}/>)
