import * as React from "react";
import { withTranslation } from 'react-i18next';
import {uniqueId} from "utils";
import PropTypes from 'prop-types';
import "./VideoPlayer.scss";

class VideoPlayerComponent extends React.Component {
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

	render() {
		const video = this.props.video;
			return (
				<div className="video-component">
					<div className="video-component__title">
						{video.name}
					</div>
					<video controls={true} src={video.url}/>

				</div>
			);

		return null;
	}
}
VideoPlayerComponent.propTypes = {
	video: PropTypes.object.isRequired,
}
export const VideoPlayer = withTranslation()(VideoPlayerComponent)
