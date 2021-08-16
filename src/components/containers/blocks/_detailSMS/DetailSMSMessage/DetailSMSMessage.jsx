import * as React from "react";
import { withTranslation } from 'react-i18next';
import {StatusMessage, MessagePreview} from "presentational";
import {KRUtils, KRClient} from "@klassroom/klassroom-sdk-js";
import {FormAPI} from "forms";
import PropTypes from 'prop-types';
import * as moment from 'moment';
import { DotLoader } from 'react-spinners';
import "./DetailSMSMessage.scss";


class DetailSMSMessageComponent extends React.Component {
	static translate;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
		this.form = new FormAPI(this);
		this.AllClasses = [];
	}
	componentDidMount(){
		this.loadClasses();
	}
	getDetailData(){
		return this.props.detailData;
	}
	getPost(){
		return this.getDetailData().post;
	}
	getDate(){
		if(this.getPost() && this.getPost().date){
			return moment.unix(this.getPost().date).locale(this.i18n.language).format("lll");
		}
		return null;
	}
	getClasses() {
		return this.AllClasses.map((_class) => {
			let result = null;
			if(this.getDetailData().to && Array.isArray(this.getDetailData().to)){
				this.getDetailData().to.some((_classroomID, index) => {
					if(_classroomID == _class.classroomID){
						result = _class.classroomName;
						if(index < (this.getDetailData().to.length - 1)){
							result+=", ";
						}
						return true;
					}
					return false;
				});
			}
			return result;
		});
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
		// What are tha statuses for sms?
		switch(this.getDetailData().post.status){
			case(0):
			return "draft"
			case(1):
			return "deleted"
			case(2):
			return "send"
		}
	}

	render() {
		if(!this.getDetailData()) {
			return (
				<div className="detail-sms-message__loader">
				<DotLoader
					sizeUnit={"px"}
					size={50}
					color={'#1f9aff'}
					loading={true}
				/>
			</div>);
		}
		return (
			<div className="detail-sms-message">

				<div className="detail-sms-message__header">
					<div className="detail-sms-message__header-h1">{this.$t("Message detail")}</div>
					<div>

					</div>
				</div>

				<div className="detail-sms-message__header2">

					<div className="detail-sms-message__header2-icon">
						<div className="icon klassicon-sms-campaign"></div>
					</div>

					<div className="detail-sms-message__details">
						<div className="detail-sms-message__header-h2">{this.getDetailData().subject} <StatusMessage status={this.getStatus()}/></div>
						<div className="detail-sms-message__date">{this.getDate()}</div>

						<div className="detail-sms-message__classes"><div className="icon klassicon-back"></div>{this.getClasses()}</div>
					</div>

				</div>

				<div className="detail-sms-message__preview">
					{this.getPost().text}
				</div>

			</div>
		);
	}
}
DetailSMSMessageComponent.propTypes = {
	detailData: PropTypes.object,
	statistic: PropTypes.object,
}
export const DetailSMSMessage = withTranslation()(DetailSMSMessageComponent)
