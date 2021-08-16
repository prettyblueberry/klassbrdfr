import * as React from "react";
import { withTranslation } from 'react-i18next';
import {ThreeGridLayout} from "../../layouts";
import {
	HeaderBlock,
	LeftMenuBlock,
	NotificationsBlock,
	DetailMultimediaBlock
} from 'blocks';
import "./DetailMultimediaActivity.scss";

export class DetailMultimediaActivityComponent extends React.Component {
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
				centerJSX={<DetailMultimediaBlock/>}
				rightJSX={null}
			/>
		);
	}
}
export const DetailMultimediaActivity = withTranslation()(DetailMultimediaActivityComponent)