import * as React from "react";
import { withTranslation } from 'react-i18next';
import {uniqueId} from "utils";
import PropTypes from 'prop-types';
import "./EventViewer.scss";
import * as moment from 'moment';


class EventViewerComponent extends React.Component {
	static translate;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
		this.idComponent = uniqueId();
	}
	componentWillUnmount(){

	}

	getEvent() {
		return this.props.event;
	}

	renderImage(){
		if(!this.getEvent().cover && !this.getEvent().cover_thumb_url){
			return (
				<div className="event-viewer__image">
					<div className="icon klassicon-image"></div>
				</div>
			)
		}

		return (
			<div className="event-viewer__image">
				<img className="event-viewer__image-src" src={this.getEvent().cover ? this.getEvent().cover.dataUrl : this.getEvent().cover_thumb_url}/>
			</div>
		)
	}
	render() {
		const data = this.getEvent();
		if(data){
			return (
				<div className="event-viewer">
					{this.renderImage()}
					<div className="event-viewer__footer">
						<div className="event-viewer__special-line"></div>
						<div className="event-viewer__date-container">
							<div className="event-viewer__date-spec">
								<div className="event-viewer__date">

									<div className="event-viewer__day">
										{this.getEvent().start_date && moment(this.getEvent().start_date).locale(this.i18n.language).format('D')}
									</div>

									<div className="event-viewer__month">
										{this.getEvent().start_date && moment(this.getEvent().start_date).locale(this.i18n.language).format('MMMM')}
									</div>
								</div>
							</div>
						</div>


						<div className="event-viewer__titles">
							<div className="event-viewer__range">{this.getEvent().start_date && moment(this.getEvent().start_date).locale(this.i18n.language).format('lll')} - {this.getEvent().end_date && moment(this.getEvent().end_date).format('lll')}</div>
							<div className="event-viewer__label">{this.getEvent().title}</div>
							<div className="event-viewer__location"><div className="icon klassicon-location"></div>{this.getEvent().location}</div>
						</div>

						{/*<div className="event-viewer__buttons">
							<div className="event-viewer__button"><div className="icon klassicon-empty"></div> {this.$t("Add to my calendar")}</div>
							<div className="event-viewer__button">
								<div className="event-viewer__button-2-h1"><div className="icon klassicon-empty"></div> {this.$t("Fill out the exit authorization")}</div>
								<div className="event-viewer__button-2-h2">
									{this.$t("Until")}{this.getEvent().end_date && moment(this.getEvent().end_date).format('lll')}
								</div>
							</div>
						</div>*/}

					</div>
				</div>
			);
		}
		return null;
	}
}
EventViewerComponent.propTypes = {
	event: PropTypes.object.isRequired,
}
export const EventViewer = withTranslation()(EventViewerComponent)
