import * as React from "react";
import { withTranslation } from 'react-i18next';
import {TwoGridLayout} from "../../layouts";
import {
	HeaderBlock,
	ChooseTypeMessageLeftBlock,
	ChooseTypeMessageRightBlock,
} from '../../blocks';
import {
	StepsAPI
} from '../../steps';
import "./ChooseTypeMessageActivity.scss";

class ChooseTypeMessageActivityComponent extends React.Component {
	static $t;
	static i18n;
	steps = {}
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
		this.steps = new StepsAPI(this);
	}
	render() {
		return (
			<TwoGridLayout
        headerHTML={<HeaderBlock pageType="school"/>}
        leftPanelHTML={<ChooseTypeMessageLeftBlock/>}
        rightPanelHTML={<ChooseTypeMessageRightBlock/>}
      />
		);
	}
}
export const ChooseTypeMessageActivity = withTranslation()(ChooseTypeMessageActivityComponent)