import * as React from "react";
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import Geosuggest from 'react-geosuggest';
import "./GeoInput.scss";

class GeoInputComponent extends React.Component {
	static translate;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
	}
	render() {
		return (
			<div className="geo-input">
				<Geosuggest
					//	ref={el=>this._geoSuggest=el}
					placeholder={this.props.placeholder}
					onSuggestSelect={this.props.onSuggestSelect}
					location={this.props.location}
					radius="20" />
			</div>
		);
	}
}
GeoInputComponent.propTypes = {
	placeholder: PropTypes.string,
	onSuggestSelect: PropTypes.func.isRequired,
	location: PropTypes.any,
}
export const GeoInput = withTranslation()(GeoInputComponent)