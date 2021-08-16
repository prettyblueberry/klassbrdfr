import * as React from "react";
import PropTypes from 'prop-types';
import "./Space.scss";

class SpaceComponent extends React.Component {
	static translate;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
	}
	render() {
		return (
			<div style={{display: "inline-table", width: this.props.with || "100%", height: this.props.height || "100%"}}></div>
		);
	}
}
SpaceComponent.propTypes = {
	width: PropTypes.string,
	height: PropTypes.string,
}
export const Space = SpaceComponent