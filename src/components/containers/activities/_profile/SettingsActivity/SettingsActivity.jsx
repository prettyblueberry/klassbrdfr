import * as React from "react";
import {ThreeGridLayout} from "../../../layouts";
import {
	HeaderBlock,
	LeftMenuProfileBlock,
} from '../../../blocks';
import { withTranslation } from 'react-i18next';
import "./SettingsActivity.scss";

class SettingsActivityComponent extends React.Component {
	static $t;
	static i18n;

	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
	}

	render() {
		return (
			<ThreeGridLayout
				headerJSX={<HeaderBlock pageType="school"/>}
				leftJSX={<LeftMenuProfileBlock/>}
				centerJSX={<div></div>}
				rightJSX={null}
			/>
		);
	}
}
export const SettingsActivity = withTranslation()(SettingsActivityComponent);
