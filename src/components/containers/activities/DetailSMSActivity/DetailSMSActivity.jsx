import * as React from "react";
import { withTranslation } from 'react-i18next';
import {ThreeGridLayout} from "../../layouts";
import {
	HeaderBlock,
	LeftMenuBlock,
	NotificationsBlock,
	DetailSMSBlock
} from 'blocks';
import "./DetailSMSActivity.scss";

export class DetailSMSActivityComponent extends React.Component {
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
				leftJSX={<LeftMenuBlock pageType="school"/>}
				centerJSX={<DetailSMSBlock/>}
				rightJSX={null}
			/>
		);
	}
}
export const DetailSMSActivity = withTranslation()(DetailSMSActivityComponent)