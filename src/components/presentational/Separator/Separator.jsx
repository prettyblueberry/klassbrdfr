import * as React from "react";
import { withTranslation } from 'react-i18next';
import "./Separator.scss";

export class SeparatorComponent extends React.Component {
	static translate;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
	}
	render() {
		return (
			<div className="separator">
				<div className="separator__left"><span></span></div>
				<div className="separator__center">{this.props.textJSX}</div>
				<div className="separator__right"><span></span></div>
			</div>
		);
	}
}
export const Separator = withTranslation()(SeparatorComponent)