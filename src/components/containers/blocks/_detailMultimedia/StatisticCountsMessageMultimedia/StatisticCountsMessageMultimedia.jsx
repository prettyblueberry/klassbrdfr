import * as React from "react";
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import "./StatisticCountsMessageMultimedia.scss";
import {KRClient} from "@klassroom/klassroom-sdk-js";
import {
	Views,
	Reactions,
	MessagePreview
} from "presentational";

class StatisticCountsMessageMultimediaComponent extends React.Component {
	static translate;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
		this.campaign = this.props.campaign;
	}

	getStatistic(){
		return {
			views: this.campaign.post.views_count,
			reactions: this.campaign.post.reactions_count,
			comments: this.campaign.post.comments_count,
			viewsOf: Math.max(this.campaign.post.views_count, (this.campaign.getTotalMembers() + this.campaign.getTotalStudents()))
		}
	}

	getPost = () => {
		return this.props.campaign.post;
	}

	openViewsModal = () => {
		this.modalAPI = kbApp.modalAPI.dialog({
			dialogClassName: 'views',
			title: this.getTitle(),
			closeButton: true,
			message: <Views post={this.getPost()}  />,
		});
	}

	getTitle = () =>{
		if(this.campaign.post.require_signature){
			return this.$t("Signatures");
		}else if(this.campaign.post.require_reply){
			return this.$t("Replies");
		}else{
			return this.$t("Views");
		}

  }

	openReactionsModal = () => {
		this.modalAPI = kbApp.modalAPI.dialog({
			dialogClassName: 'reactions',
			title: this.$t('Reactions'),
			closeButton: true,
			message: <Reactions post={this.getPost()}  />,
		});
	}

	openCommentsModal = () => {
		  this.modalAPI = kbApp.modalAPI.dialog({
			dialogClassName: 'comments',
			title: this.$t('Comments'),
			closeButton: true,
			message:
			<div className="message-preview__comments">
			<MessagePreview
			  post={this.getPost()}
			  statistic={this.getStatistic()}
			  showComments={true}
			  modal={this.modalAPI}
			  isInModalMode={true}
			  />
			</div>
		  });

	};

	getTitle = () =>{
    if(this.getPost().require_signature){
      return this.$t("Signatures");
    }else if(this.getPost().require_reply){
      return this.$t("Replies");
    }else{
      return this.$t("Views");
    }

  }

	render() {

		return (
			<div className="statistic-counts-message-multimedia">

				<div className="statistic-counts-message-multimedia__block-views statistic-counts-message-multimedia__block"
					onClick={this.openViewsModal}>
					<div className="statistic-counts-message-multimedia__count">{this.getStatistic().views}</div>
					<div className="statistic-counts-message-multimedia__label">{this.getTitle()}</div>
				</div>


				<div className="statistic-counts-message-multimedia__block-reactions statistic-counts-message-multimedia__block"
					onClick={this.openReactionsModal}>
					<div className="statistic-counts-message-multimedia__count">{this.getStatistic().reactions}</div>
					<div className="statistic-counts-message-multimedia__label">{this.$t("Reactions")}</div>
				</div>


				<div className="statistic-counts-message-multimedia__block-comments statistic-counts-message-multimedia__block"
				onClick={this.openCommentsModal}>
					<div className="statistic-counts-message-multimedia__count">{this.getStatistic().comments}</div>
					<div className="statistic-counts-message-multimedia__label">{this.$t("Comments")}</div>
				</div>



			</div>
		);
	}
}
StatisticCountsMessageMultimediaComponent.propTypes = {

}
export const StatisticCountsMessageMultimedia = withTranslation()(StatisticCountsMessageMultimediaComponent)
