import * as React from "react";
import {CenteredLayout} from "layouts";
import {
	HeaderBlock
} from '../../../blocks';
import {BuySMSSteps} from "steps";
import { withTranslation } from 'react-i18next';
import "./BuySMSCreditsActivity.scss";

class BuySMSCreditsActivityComponent extends React.Component {
	static $t;
	static i18n;

	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
	}

	render() {
		return (
			<CenteredLayout
				headerJSX={<HeaderBlock pageType="school"/>}
				centerJSX={<BuySMSSteps/>}
			/>
		);
	}
}
export const BuySMSCreditsActivity = withTranslation()(BuySMSCreditsActivityComponent);
