import * as React from "react";
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import {withRouter} from 'react-router-dom';
import {CurrentYear, BackButton, SMSStatistic} from "presentational";
import { DotLoader } from 'react-spinners';
import {MessageDetailData} from "mockup-data";
import {LevelReadingMessagesSMS, DetailSMSMessage} from "blocks";
import "./DetailSMSBlock.scss";

class DetailSMSBlockComponent extends React.Component {
	static $t;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
		this.detailData = null;
		this.statisticSMS = null;
		this.loadingDetail = false;
		this.loadingStatistic = false;
	}
	componentDidMount(){
		this.loadData();
		this.loadStatistic();
	}
	getCredits(){
		return 500;
	}
	loadData = () => {
		this.loadingDetail = true;
		this.forceUpdate();
		setTimeout(() => {
			this.detailData = MessageDetailData.sms;
			this.loadingDetail = false;
			this.forceUpdate();
		},3000);
	}
	goBack = () => {
		this.props.history.goBack();
	}
	loadStatistic = () => {
		this.loadingStatistic = true;
		this.forceUpdate();
		setTimeout(() => {
			this.statisticSMS = MessageDetailData.statisticSMS;
			this.loadingStatistic = false;
			this.forceUpdate();
		},4000);
	}
	getDetailData = () => {
		return this.detailData;
	}
	renderStatistic(){
		if(!this.statisticSMS){
		 	return null;
		}
		let level = 0;
		let oneLevel = 100 / 9;
		if(this.statisticSMS.smsOpenedOf){
			level = Math.round(this.statisticSMS.smsOpenedOf / oneLevel);
		}
		return (
			<div className="detail-sms-block__statistic">
				<LevelReadingMessagesSMS level={level}/>
				<SMSStatistic credits={this.getCredits()} statistic={this.statisticSMS}/>
			</div>
		)
	}
	renderHeader(){
		if(!this.getDetailData()) {
			return null;
		}
		return (
			<>
				<CurrentYear style={{marginTop: "42px", marginBottom: "79px"}} title={this.$t("SCHOOL YEAR")}/>
				<div className="detail-sms-block__header">
					<BackButton className="detail-sms-block__back" onClick={this.goBack} absolute/>
					<div className="detail-sms-block__header-h1">
						{this.getDetailData().subject}
					</div>
					<div  className="detail-sms-block__header-h2">
						{this.$t("SMS Message")}
					</div>
				</div>
			</>
		)
	}
	render() {
		return (
			<div className="detail-sms-block">
				{this.renderHeader()}
				{this.renderStatistic()}
				<DetailSMSMessage statistic={this.statisticData} detailData={this.getDetailData()}/>
			</div>
		);
	}
}
DetailSMSBlockComponent.propTypes = {

}

const TranslatedComponent = withTranslation()(DetailSMSBlockComponent);
export const DetailSMSBlock = withRouter(props => <TranslatedComponent {...props}/>)
