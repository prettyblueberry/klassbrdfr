import * as React from "react";
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import {withRouter} from 'react-router-dom';
import {CurrentYear, BackButton} from "presentational";
import {MessageDetailData} from "mockup-data";
import {LevelReadingMessagesMultimedia, StatisticCountsMessageMultimedia, DetailMultimediaMessage} from "blocks";
import "./DetailMultimediaBlock.scss";
import {KRClient} from "@klassroom/klassroom-sdk-js";
import { DotLoader } from 'react-spinners';

class DetailMultimediaBlockComponent extends React.Component {
	static $t;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
		this.campaignID = this.props.match.params.id;
		this.campaign = KRClient.getInstance().campaigns[this.campaignID];
	}


	componentDidMount(){
		this.refreshCampaign();

	}

	refreshCampaign = () => {
		KRClient.getInstance().loadCampaign(this.campaignID).then(()=>{

			this.campaign = KRClient.getInstance().campaigns[this.campaignID];

			this.forceUpdate();
		}).catch((error)=>{
				alert(error.message);
		});
	}



	goBack = () => {
		this.props.history.goBack();
	}
	renderStatistic(){

		let level = 0;

		return <>
			{ false && <LevelReadingMessagesMultimedia level={level}/>}
			<StatisticCountsMessageMultimedia campaign={this.campaign}/>
		</>
	}
	renderHeader(){

		return (
			<>
				<CurrentYear style={{marginTop: "20px", marginBottom: "20px"}} title={this.$t("SCHOOL YEAR")}/>
				<div className="detail-multimedia-block__header">
					<BackButton className="detail-multimedia-block__back" onClick={this.goBack} absolute/>
					<div className="detail-multimedia-block__header-h1">
						{this.campaign.name}
					</div>
					<div  className="detail-multimedia-block__header-h2">
						{this.$t("Multimedia Message")}
					</div>
				</div>
			</>
		)
	}

	renderLoader() {

		return (
		<div style={{textAlign: "center"}}>
		<br/><br/>
		<DotLoader
				sizeUnit={"px"}
				size={50}
				color={'#1f9aff'}
				loading={true}
				css={{"display":"inline-block"}}
			/>
		</div>
		);


	}

	render(){

		if(!this.campaign || !this.campaign.post ){

				return this.renderLoader();

		}else{
			return (
				<div className="detail-multimedia-block">
					{this.renderHeader()}
					{this.renderStatistic()}
					<DetailMultimediaMessage campaign={this.campaign}/>
				</div>
			);
		}

	}
}
DetailMultimediaBlockComponent.propTypes = {

}

const TranslatedComponent = withTranslation()(DetailMultimediaBlockComponent);
export const DetailMultimediaBlock = withRouter(props => <TranslatedComponent {...props}/>)
