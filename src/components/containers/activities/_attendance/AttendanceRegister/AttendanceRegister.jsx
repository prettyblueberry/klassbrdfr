import * as React from "react";
import { withTranslation } from 'react-i18next';
import {ThreeGridLayout} from "layouts";
import {HeaderBlock, LeftMenuBlock, DashboardRegisterBlock} from "blocks";
import "./AttendanceRegister.scss";

export class AttendanceRegisterComponent extends React.Component {
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
				headerJSX={<HeaderBlock pageType="attendance"/>}
				leftJSX={<LeftMenuBlock pageType="attendance"/>}
				centerJSX={<DashboardRegisterBlock/>}
				rightJSX={null}
			/>
		);
	}
}
export const AttendanceRegister = withTranslation()(AttendanceRegisterComponent)
