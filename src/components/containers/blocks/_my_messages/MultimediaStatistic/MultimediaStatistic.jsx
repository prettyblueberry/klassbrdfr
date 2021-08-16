import * as React from "react";
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import "./MultimediaStatistic.scss";

class MultimediaStatisticComponent extends React.Component {
	static translate;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
	}
	getStatistic(){
		return this.props.statistic;
	}
	render() {
		if(!this.getStatistic()){
			return null;
		}
		return (
			<div className="multimedia-statistic">

				<div className="multimedia-statistic__left">
					<div className="multimedia-statistic__left-label">{this.$t("Multimedia Messages")} {this.$t("(Last 7 days)")}</div>
					<div className="multimedia-statistic__left-count">{this.getStatistic().multimediaMessages}</div>
				</div>

				<div className="multimedia-statistic__right">
					<div className="multimedia-statistic__block multimedia-statistic__views">
						<div className="multimedia-statistic__s1">{this.getStatistic().viewOf}%</div>
						<div className="multimedia-statistic__s2">{this.getStatistic().view}</div>
						<div className="multimedia-statistic__s3">{this.$t("Views")}</div>
					</div>

					<div className="multimedia-statistic__block multimedia-statistic__signature">
						<div className="multimedia-statistic__s1">{this.getStatistic().signatureOf}%</div>
						<div className="multimedia-statistic__s2">{this.getStatistic().signature}</div>
						<div className="multimedia-statistic__s3">{this.$t("Signature")}</div>
					</div>

					<div className="multimedia-statistic__block multimedia-statistic__comments">
						<div className="multimedia-statistic__s1">{this.getStatistic().commentsOf}%</div>
						<div className="multimedia-statistic__s2">{this.getStatistic().comments}</div>
						<div className="multimedia-statistic__s3">{this.$t("Comments")}</div>
					</div>

					<div className="multimedia-statistic__block multimedia-statistic__reactions">
						<div className="multimedia-statistic__s1">{this.getStatistic().reactionsOf}%</div>
						<div className="multimedia-statistic__s2">{this.getStatistic().reactions}</div>
						<div className="multimedia-statistic__s3">{this.$t("Reactions")}</div>
					</div>

				</div>

			</div>
		);
	}
}
MultimediaStatisticComponent.propTypes = {
	statistic: PropTypes.object,
}
export const MultimediaStatistic = withTranslation()(MultimediaStatisticComponent)