import * as React from "react";
import { withTranslation } from 'react-i18next';
import {withRouter} from 'react-router-dom';
import * as moment from 'moment';
import {
	Button,
	HeaderText,
	HeaderTextSmall,
	MultimediaMessageItem,
	SelectSmall,
	SMSMessageItem,
	SMSStatistic,
	DateRangePicker,
} from "presentational";
import {NewSMSAdvertising, MultimediaStatistic} from "blocks";
import {queryStringToObject} from "utils";
import "./MessageTabs_All.scss";
import { DotLoader } from 'react-spinners';
import {KRClient, KRUtils, KRCampaign, KRClassroom} from "@klassroom/klassroom-sdk-js";
import {ModalManager} from "containers/modals"

export class MessageTabs_AllComponent extends React.Component {
	static translate;
	static i18n;
	mockupMessages = []
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
		this.list = this.props.listAPI;

		this.shownDates = false;

		this.refDate = new Date();
		this.isLoading = false;
		this.reloadMore = true;
		this.isFirstTime = true;

		this.dataAttachmentByDate = {};
		this.dataDate = [];
		this.data = {};
		this.filter = null;

		this.campaigns = Object.assign({});

		this.list.setRequests(
			{
				loadCampaigns: (quiresURL, params, data) => {

					return new Promise((resolve, reject) => {

									var isFirstTime = this.isFirstTime;

									var dnow = new Date().getTime() + 30000;

									this.dataAttachmentByDate = {};
									this.dataDate = [];
									this.data = {};

									let filter = this.getTabFromURL() || "all";

									this.filter = filter;

									KRUtils.each(KRClient.getInstance().campaigns, (campaignID,campaign)=>{

										switch(filter){
													case "all":
															if(campaign.createdAt.getTime() <= dnow){

																var d = moment(campaign.createdAt).locale(this.i18n.language).format('YYYY-MM') ;

																if(this.dataDate.indexOf(d) == -1){
																	this.dataDate.push(d);
																}
																if(!this.dataAttachmentByDate[d]){
																	this.dataAttachmentByDate[d] = [];
																}
																if(	(!quiresURL.search || campaign.name.includes(quiresURL.search.trim())) &&
																		(!quiresURL.class || quiresURL.class=="all" || campaign.classrooms.indexOf(quiresURL.class)>-1)
																	){


																		if(!this.dataAttachmentByDate[d].find((el) => el.id == campaign.id)){
																				this.dataAttachmentByDate[d].push(campaign);
																		}
																}

																if(campaign.createdAt.getTime() < this.refDate.getTime()){
																	 if(this.campaigns[campaign.id]) this.refDate = campaign.createdAt;
																}
															}
														break;
													case "sms":
															if(campaign.isSMS){
																var d = moment(campaign.createdAt).locale(this.i18n.language).format('YYYY-MM') ;
																if(!this.dataAttachmentByDate[d]){
																	this.dataAttachmentByDate[d] = [];
																}
																if(this.dataDate.indexOf(d) == -1){
																	this.dataDate.push(d);
																}
																if(	(!quiresURL.search || campaign.name.includes(quiresURL.search.trim())) &&
																		(!quiresURL.class || quiresURL.class=="all" || campaign.classrooms.indexOf(quiresURL.class)>-1)
																	){


																		if(!this.dataAttachmentByDate[d].find((el) => el.id == campaign.id)){
																				this.dataAttachmentByDate[d].push(campaign);
																		}


																}

																if(campaign.createdAt.getTime() < this.refDate.getTime()){
																	if(this.campaigns[campaign.id]) this.refDate  = campaign.createdAt;
																}
															}
														break;



													case "multimedia":
													if(!campaign.isSMS){
														var d = moment(campaign.createdAt).locale(this.i18n.language).format('YYYY-MM') ;
														if(!this.dataAttachmentByDate[d]){
															this.dataAttachmentByDate[d] = [];
														}
														if(this.dataDate.indexOf(d) == -1){
															this.dataDate.push(d);
														}
														if(	(!quiresURL.search || campaign.name.includes(quiresURL.search.trim())) &&
																(!quiresURL.class || quiresURL.class=="all" || campaign.classrooms.indexOf(quiresURL.class)>-1)
															){

															if(!this.dataAttachmentByDate[d].find((el) => el.id == campaign.id)){
																	this.dataAttachmentByDate[d].push(campaign);
															}



														}

														if(campaign.createdAt.getTime() < this.refDate.getTime()){
															 if(this.campaigns[campaign.id]) this.refDate  = campaign.createdAt;
														}
													}

														break;


												}


													this.dataDate.sort((a,b)=>{
														var d1 =  a;
														var d2 = b;
														return d1<d2 ? 1 : d1>d2 ? -1 : 0;
													});

													KRUtils.each(this.dataDate,(key,v)=>{
														this.dataAttachmentByDate[v].sort((a,b)=>{
															var d1 =  a.createdAt;
															var d2 = b.createdAt;
															return d1<d2 ? 1 : d1>d2 ? -1 : 0;
														});
													});
									});
									resolve(this.dataDate);
							});
					}
			});

	}
	componentDidMount() {
		this.loadMore();
		this.reloadData();

		this.addEventsListeners();
	}

	componentWillUnmount() {
		this.removeEventsListeners();
	}
	addEventsListeners(){
		if(window.appBrowser == "safari" || window.appBrowser == "edge"){
			const el = document.querySelector(".three-grid-layout__center");
			el.addEventListener("scroll", this.onScrollBottomSafari);
		} else {
			window.addEventListener("scrollBottom", this.onScrollBottom);
		}
	}
	removeEventsListeners(){
		if(window.appBrowser == "safari" || window.appBrowser == "edge"){
			const el = document.querySelector(".three-grid-layout__center");
			el.removeEventListener("scroll", this.onScrollBottomSafari);
		} else {
			window.removeEventListener("scrollBottom", this.onScrollBottom);
		}
	}
	onScrollBottom = () => {
		this.loadMore();
	}
	onScrollBottomSafari = (e) => {
		const el = e.target;
		if(el.scrollTop === (el.scrollHeight - el.offsetHeight)) {
			this.loadMore();
        }
	}

	reloadData = () => {

		this.list.sendRequest("loadCampaigns", null, true);

	}

	loadMore = ()=>{
		this.isLoading = true;
		KRClient.getInstance().loadCampaigns(this.getClassroomFromURL(), this.refDate, this.getTabFromURL()).then(
				(data)=>{
					const {result:campaigns,more} = data;
					this.isFirstTime = false;
					this.reloadMore = more;

					KRUtils.each(campaigns, (campaignID, campaign) =>{
										this.campaigns[campaignID] = campaign;
								});

    			this.reloadData();
    		}).catch((error)=>{
						ModalManager.getInstance().alert(error.message);
    		}).finally(()=>{
					this.isLoading = false;
				});
	}

	groupByDate(_messages){
		let messages = {};
		if(Array.isArray(_messages)){
			_messages.forEach((message) => {
				const date = moment.unix(message.createdAt);
				let	day =	date.date();
				const month = date.month();
				const year = date.year();
				if(day < 10){
					day = `0${day}`;
				}
				const key = `${year}${month}${day}`;
				if(!messages[key]){
					messages[key] = []
				}
				const diffDays = moment().diff(date, 'days');
				message.today = (diffDays === 0);
				messages[key].push(message);
			});
		}
		return messages;
	}
	sendMessage = (event) => {
		event.preventDefault();
		this.props.history.push(`/choose-message`);
	}

	componentWillUpdate(nextProps, nextState) {
		if(this.props.type != nextProps.type){
			this.reloadData();
			this.refDate = new Date();
			this.isLoading = false;
			this.reloadMore = true;
			this.isFirstTime = true;
			this.loadMore();
		}
	}

	renderLoader() {
		return (
		<>
			<DotLoader
				sizeUnit={"px"}
				size={50}
				color={'#1f9aff'}
				loading={true}
			/>
		</>
		);
	}
	getOptionsSort() {
		return [
			{
				title: this.$t("By date"),
				value: "date",
			},
			{
				title: this.$t("By subject"),
				value: "subject",
			},
		]
	}
	onFilter = (value) =>{
		this.props.onFilter(value)
	}
	getSortFromUrl = () => {
		let _class = queryStringToObject().sort || "date";
		return decodeURI(_class);
	}
	renderEmptyPage() {
		return (
			<>
				<div className="my-messages-block__epmty">
					<img className="my-messages-block__epmty-img" src="/public/k-img/icons/dashboard-empty.svg"/>
					<HeaderText style={{marginBottom: "10px"}} textJSX={this.$t("You haven't created any messages!")}/>
					<HeaderTextSmall style={{marginBottom: "30px"}} textJSX={this.$t("It's empty! It seems like you have not added any messages this year.")}/>
				</div>
				<Button name={this.$t("Send my first message")} iconType="add-white" iconSide="left" typeDesign="primary" onClick={this.sendMessage}/>
			</>
		)
	}
	renderMessages(campaigns){
		return campaigns.map((campaign, index) => {
			if(!campaign.isSMS  && (this.props.type == "multimedia" || this.props.type == "all")){
				return <MultimediaMessageItem style={{zIndex: (campaigns.length - index)}} key={campaign.id} campaign={campaign}/>
			}
			if(campaign.isSMS && (this.props.type == "sms" || this.props.type == "all")){
				return <SMSMessageItem key={campaign.id} message={campaigns}/>
			}
			return null;
		})
	}
	renderDate(messages){
		let dateString = null;
		let today = messages[0] && messages[0].today;
		if(today){
			dateString = this.$t("Today");
		}
		if(!today){
			dateString = moment.unix(messages[0].createdAt).locale(this.i18n.language).format('ddd, MMMM Do YYYY');
		}
		let countMessages = 0;
		messages.forEach((message) => {
			if(this.props.type == "sms" && message.type == 'sms'){
				countMessages++;
			}
			if(this.props.type == "multimedia"  && message.type == 'multimedia'){
				countMessages++;
			}
			if(this.props.type == "all"){
				countMessages++;
			}
		});
		if(countMessages == 0){
			return null;
		}
		return (
			<div className="message-all__panel-2__left">
				{dateString} <span className="message-all__panel-2__count">{messages.length}</span>
			</div>
		)
	}
	renderGroup() {
		return (
			this.dataDate.map((date,index)=>{
					if(this.dataAttachmentByDate[date] && this.dataAttachmentByDate[date].length ){
						return (
							<div key={date}>
								<div className="message-all__panel-2">

									<div className="message-all__panel-2__left">
										{moment(date).locale(this.i18n.language).format("MMMM YYYY")} <span className="message-all__panel-2__count">{Object.values(this.dataAttachmentByDate[date]).length}</span>
									</div>
									<div className="message-all__panel-2__right">
									</div>
								</div>
								{this.renderMessages(this.dataAttachmentByDate[date])}
							</div>
						)
					}else{
						return <div key={index} />;
					}
			})
		)
		/*return Object.keys(_messages).sort((a,b) => {
			return b - a;
		}).map((key, index) => {
			const messages = _messages[key];
			return (<div key={key}>
				<div className="message-all__panel-2">

					{this.renderDate(messages)}

					<div className="message-all__panel-2__right">
						{index === 0 && this.list.getList().length > 0 && <SelectSmall
							style={{width: "190px"}}
							value={this.getSortFromUrl()}
							onChange={(value) => this.onFilter({"sort": value})}
							label={this.$t("Sort")}
							items={this.getOptionsSort()}
						/>}
					</div>
				</div>
				{this.renderMessages(messages)}
			</div>)
		})*/
	}
	getOptionsShow() {
		return [
			{
				title: this.$t("Post"),
				value: "post",
			},
			{
				title: this.$t("Events"),
				value: "events",
			},
			{
				title: this.$t("Videos"),
				value: "videos",
			},
			{
				title: this.$t("Documents"),
				value: "documents",
			},
			{
				title: this.$t("Audios"),
				value: "audios",
			},
			{
				title: this.$t("Photos"),
				value: "photos",
			},
			{
				title: this.$t("Lists"),
				value: "lists",
			},
			{
				title: this.$t("Polls"),
				value: "polls",
			},
			{
				title: this.$t("Locations"),
				value: "locations",
			},
		]
	}
	getFilterFromUrl = () => {
		let filter = queryStringToObject().filter || "post";
		return decodeURI(filter);
	}
	getShowFromURL = () => {
		let show = queryStringToObject().show || "all";
		return decodeURI(show);
	}

	getTabFromURL = () => {
		let show = queryStringToObject().tab || "all";
		return decodeURI(show);
	}

	getClassroomFromURL = () => {
		let show = queryStringToObject().class;
		return decodeURI(show);
	}

	renderSMSStatistic(){
		if(this.getShowFromURL() !== 'list' && (this.props.type == "sms" || this.props.type == "all")){
			return (<>
				<div className="message-all__messages">{this.$t("SMS Messages")}</div>
				<SMSStatistic credits={this.list.getCustomData().smsCredits} statistic={this.list.getCustomData().smsStatistic}/>
			</>)
		}
	}
	renderMultimediaStatistic(){
		if(this.getShowFromURL() !== 'list' && (this.props.type == "multimedia" || this.props.type == "all")){
			return (
			<>
				<div className="message-all__messages">{this.$t("Multimedia Messages")}</div>
				<MultimediaStatistic statistic={this.list.getCustomData().multimediaStatistic}/>
			</>)
		}
	}

	getFilterRangesFromUrl = () => {
		let query = queryStringToObject().range;
		let range = null;
		if(typeof query == "string" && query.indexOf("-") > -1){
			let decoded = decodeURI(query);
			let dates = decoded.split("-");
			if(dates.length == 2){
				range = {
					startDate: dates[0],
					endDate: dates[1],
				};
			}
		}
		return range;
	}
	onChangeRange = (range) => {
		if(range && range.startDate && range.endDate){
			this.props.onFilter({"range": moment(range.startDate).unix()+'-'+moment(range.endDate).unix()});
		}
	}
	renderLists(){
		return (<div className="message-all__content">
			<NewSMSAdvertising/>

			{this.getShowFromURL() !== 'list' && <div className="message-all__panel-1">
				<div className="message-all__panel-1__left" dangerouslySetInnerHTML={{__html: this.$t("<b>All campaigns</b> engagement")}}></div>
				<div className="message-all__panel-1__right">
					<DateRangePicker
						selectionRange={this.getFilterRangesFromUrl()}
						onChange={(range) => this.onChangeRange(range)}
						label={this.$t("Date")}
					/>
					<SelectSmall
							style={{width: "190px"}}
							value={this.getFilterFromUrl()}
							onChange={(value) => this.onFilter({"filter": value})}
							label={this.$t("Show")}
							items={this.getOptionsShow()}
					/>
				</div>
			</div>}

			{this.renderSMSStatistic()}
			{this.renderMultimediaStatistic()}

			<div className="message-all__today-container">


				{this.renderGroup()}
			</div>

		</div>)
	}


	render() {
		if(this.isFirstTime && this.dataDate.length == 0){


					return this.renderLoader();


		}else{

			if(this.dataDate.length == 0){

					return this.renderEmptyPage();

			}else{

				return (
					<div className="message-all__today-container">
							{this.renderGroup()}

							<center>{this.reloadMore &&  this.renderLoader()}</center>
					</div>
				)

			}


		}



		/*if(this.list.isLoading()){
			return this.renderLoader();
		}else{
			if(this.list.getCustomData().haveMessages){
				return <>{this.renderLists()}</>
			}
			return this.renderEmptyPage();
		}*/
	}
}
const TranslatedComponent = withTranslation()(MessageTabs_AllComponent);
export const MessageTabs_All = withRouter(props => <TranslatedComponent {...props}/>)
