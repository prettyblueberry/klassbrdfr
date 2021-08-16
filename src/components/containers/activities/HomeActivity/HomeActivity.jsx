import * as React from "react";
import { withTranslation } from 'react-i18next';
import {ThreeGridLayout} from "../../layouts";
import {
	HeaderBlock,
	LeftMenuBlock,
	DashboardBlock,
	NotificationsBlock
} from '../../blocks';
import "./HomeActivity.scss";

class HomeActivityComponent extends React.Component {
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
				className="home-activity__layout"
				headerJSX={<HeaderBlock pageType="school"/>}
				leftJSX={<LeftMenuBlock pageType="school"/>}
				centerJSX={<DashboardBlock/>}
				rightJSX={null}
			/>
		);
	}
}
export const HomeActivity = withTranslation()(HomeActivityComponent)
