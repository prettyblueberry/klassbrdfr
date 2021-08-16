import * as React from "react";
import { withTranslation } from 'react-i18next';
import {uniqueId} from "utils";
import PropTypes from 'prop-types';
import "./AudioPlayer.scss";

class AudioComponent extends React.Component {
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
		const audio = this.props.audio;
			return (
				<div className="audio-component">
					<div className="audio-component__title">
						{audio.name}
					</div>
					<div className="audio-component__player">
						<div className="icon klassicon-audio"></div>
						<audio controls={true} src={audio.url}/>
					</div>

				</div>
			);

		return null;
	}
}
AudioComponent.propTypes = {
	audio: PropTypes.object.isRequired,
}
export const AudioPlayer = withTranslation()(AudioComponent)
