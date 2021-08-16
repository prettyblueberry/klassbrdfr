import * as React from "react";
import { withTranslation } from 'react-i18next';
import {MessagePreview} from "presentational";
import {KRUtils, KRClient} from "@klassroom/klassroom-sdk-js";
import {PopupMenu} from "@klassroom/klassroom-react-lib";
import {FormAPI} from "forms";
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import * as moment from 'moment';
import { DotLoader } from 'react-spinners';
import "./DetailMultimediaMessage.scss";



class DetailMultimediaMessageComponent extends React.Component {
	static translate;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
		this.form = new FormAPI(this);
		this.campaign = this.props.campaign;
		this.AllClasses = [];
	}
	componentDidMount(){
		this.loadClasses();
	}

	getDetailData(){
		return this.props.campaign;
	}
	getPost(){
		return this.getDetailData().post;
	}
	getDate(){

			return moment(this.getDetailData().createdAt).locale(this.i18n.language).format("lll");

	}
	getClasses() {
		return this.campaign.classrooms.map((_class) => {
			let result = null;
			const classroom = KRClient.getInstance().classrooms[_class];
			if(classroom){
					return classroom.name;
			}
		}).filter((el) => el ).join(", ");
	}
	loadClasses() {
		let result = [];
		KRUtils.each(KRClient.getInstance().classrooms,(classroomID,classroom) => {
			result.push({
				classroomID: classroomID,
				classroomName: classroom.name,
			});
		});
		this.AllClasses = result;
	}
	getStatus(){

		if(this.getDetailData().isDeleted){
				return this.$t("Deleted");
		}else if(this.getDetailData().post.scheduled_at){
				return this.$t("Scheduled");
		}else if(this.getDetailData().isRunning){
				return this.$t("Posted");
		}else{
			return this.$t("Paused");
		}




	}

	getStatistic(){
		const post = this.getPost();
		return {
			views: this.getPost().views_count,
			reactions: this.getPost().reactions_count,
			comments: this.getPost().comments_count,
			viewsOf: Math.max(post.views_count,this.campaign.getTotalMembers())
		}
	}

	editMessage = () => {
		if(this.props.match && this.props.match.params && this.props.match.params.id){
			const id = this.props.match.params.id;
			this.props.history.push(`/new-multimedia?id=`+id);
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

	onClickComments = ()=>{

	}
	getMenuItems() {
		return [
			{text: this.$t("Edit"), callback: this.editMessage, visible: true},
			{text: this.$t("Pause"), callback: this.pauseMessage, visible: this.campaign.isRunning},
			{text: this.$t("Run"), callback: this.runMessage, visible: !this.campaign.isRunning},
			{text: this.$t("Delete"), callback: this.deleteMessage, visible: !this.campaign.isDeleted}
		];
	}
	renderStatus(){
		if(this.campaign.isDeleted){
			return (<div className={"message-preview__header-label message-preview__header-label-status  krRed-bg"}>{this.$t("Deleted")}</div>)
		}else{
			if(this.campaign.post.scheduled_at){
				return (<div className={"message-preview__header-label message-preview__header-label-status krOrange-bg"}>{this.$t("Scheduled on {{date}}",{date:moment(this.campaign.post.scheduled_at).locale(this.i18n.language).format("lll")})}</div>)
			}else
			if(this.campaign.isRunning){
				return (<div className={"message-preview__header-label message-preview__header-label-status krNeonGreen-bg"}>{this.$t("Posted")}</div>)
			}else{
				return (<div className={"message-preview__header-label message-preview__header-label-status krOrange-bg"}>{this.$t("Paused")}</div>)
			}
		}

	}
	render() {
		if(!this.getDetailData()) {
			return (
				<div className="detail-multimedia-message__loader">
				<DotLoader
					sizeUnit={"px"}
					size={50}
					color={'#1f9aff'}
					loading={true}
				/>
			</div>);
		}
		return (
			<div className="detail-multimedia-message">
				{this.renderStatus()}
				<div className="detail-multimedia-message__header">
					<div className="detail-multimedia-message__header-h1">{this.$t("Message detail")}</div>
					<div>
						<PopupMenu
								alignRight={true}
								className="class-item-left__popup"
								items={this.getMenuItems()}
						>
							<div className="icon klassicon-options"></div>
						</PopupMenu>
					</div>
				</div>

				<div className="detail-multimedia-message__header2">

					<div className="detail-multimedia-message__header2-icon">
						<div className="icon klassicon-multimedia-campaign"></div>
					</div>

					<div className="detail-multimedia-message__details">
						<div className="detail-multimedia-message__header-h2">{this.getDetailData().name}</div>
						<div className="detail-multimedia-message__date">{this.getDate()}</div>

						<div className="detail-multimedia-message__classes"><div className="icon klassicon-back"></div>{this.getClasses()}</div>
					</div>

				</div>

				<div className="detail-multimedia-message__preview">
					<MessagePreview
						statistic={this.getStatistic()}
						post={this.getPost()}
						showComments={true}
						onClickComments={this.onClickComments}
						readonly={true}
						/>
				</div>

			</div>
		);
	}
}
DetailMultimediaMessageComponent.propTypes = {
	detailData: PropTypes.object,
	statistic: PropTypes.object,
}

const TranslatedComponent = withTranslation()(DetailMultimediaMessageComponent);
export const DetailMultimediaMessage = withRouter(props => <TranslatedComponent {...props}/>)
