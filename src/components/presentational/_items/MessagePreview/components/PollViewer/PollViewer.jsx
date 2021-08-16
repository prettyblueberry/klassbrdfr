import * as React from "react";
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import {PollViewerOption} from "./components/PollViewerOption/PollViewerOption";
import {PollResults} from "./components/PollResults/PollResults";
import {
	Button
} from "presentational";
import {KRClient} from "@klassroom/klassroom-sdk-js";
import "./PollViewer.scss";
import * as moment from 'moment';

class PollViewerComponent extends React.Component {
	static translate;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
		this.post = this.props.post;
		this.klass = this.props.klass;
	}
	getData(){

		return this.post.poll;
	}

	vote = (id) => {
		this.post.vote(id, true, (post) => {
			this.forceUpdate()
		})
	}

	undoVote = (id) => {
		this.post.vote(id, false, (post) => {
			this.forceUpdate()
		})
	}

	viewPollResult = () => {
		const t = this.getData();
		this.modalAPI = kbApp.modalAPI.dialog({
		dialogClassName: "poll-result",
		title: this.$t("Results"),
		closeButton: true,
		message: <PollResults post={	this.post} klass={this.klass}/>

	});
	}

	renderOptions(){
		const options = this.getData().options;
		return options.map((option, index) => {
			return <PollViewerOption
				onVote={this.vote}
				onUndoVote={this.undoVote}
				post={this.props.post}
				index={index}
				option={option}
				isPreview = {this.props.isPreview}
				key={ 'pollviewer' + index} />;
		});
	}
	renderIsAnonymous() {
		if(this.getData().is_anonymous){
			return (<div className="poll-viewer__anonymous">
				<div className="icon klassicon-views-hide"></div>
				<div className="poll-viewer__anonymous-texts">
					<div className="poll-viewer__anonymous-t1">{this.$t("This poll is ANONYMOUS")}</div>
					<div className="poll-viewer__anonymous-t2">{this.$t("Only teachers see your answer.")}</div>
				</div>

			</div>)
		}else{

			return (
				<div className="poll-viewer__anonymous">
					<p>
						{
							this.$t("This poll is NOT anonymous. Teachers will see your answer but not the other parents.")
						}
					</p>
					{(this.post.userID == KRClient.getInstance().user.id  || this.post.userID == KRClient.getInstance().organization.id) &&
						<Button
						onClick={this.viewPollResult}
						iconType="without-icon"
						typeDesign="outline-white"
						name={this.$t("View Results")}
					/>}
				</div>
			)

		}


	}
	renderDate(){
		const data = this.getData();
			return (
				<div className="poll-viewer__header-h2">
					{this.getData().ends < new Date().getTime() ? this.$t("on {{date}}",{date: moment(data.ends).locale(this.i18n.language).format('lll')}) : this.$t("until {{date}}",{date:moment(data.ends).locale(this.i18n.language).format('lll')})}
				</div>
			)
		}

	renderPollQuestion = () => {
		return (
			<div className="poll-viewer__question">
				{this.post.poll.question}
			</div>
		)
	}
	renderHeader() {
		return (
			<div className="poll-viewer__header">
				<div className="poll-viewer__header-left">
					<div className="poll-viewer__header-h1">
						{this.getData().ends < new Date().getTime() ? this.$t("The poll has ended") : this.$t("The poll is running")}
					</div>

					{this.renderDate()}
				</div>

				<div className="poll-viewer__header-right">
					<div className="icon klassicon-poll"></div>
				</div>

			</div>
		)
	}
	renderDescription() {
		return (<div className="poll-viewer__desc">
			{this.getData().question}
		</div>)
	}

	render() {

		return (
			<div className="poll-viewer">

				{this.renderHeader()}
				{this.renderDescription()}
				{this.renderOptions()}
				{this.renderIsAnonymous()}
			</div>
		);
	}
}
PollViewerComponent.propTypes = {

}
export const PollViewer = withTranslation()(PollViewerComponent)
