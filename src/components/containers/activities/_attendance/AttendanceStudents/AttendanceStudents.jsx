import * as React from "react";
import { withTranslation } from 'react-i18next';
import {ThreeGridLayout} from "layouts";
import {HeaderBlock, LeftMenuBlock, AttendanceStudentsBlock} from "blocks";
import "./AttendanceStudents.scss";

export class AttendanceStudentsComponent extends React.Component {
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
				centerJSX={<AttendanceStudentsBlock/>}
				rightJSX={null}
			/>
		);
	}
}
export const AttendanceStudents = withTranslation()(AttendanceStudentsComponent)
