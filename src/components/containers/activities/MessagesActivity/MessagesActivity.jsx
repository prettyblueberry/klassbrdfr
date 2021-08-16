import * as React from "react";
import { withTranslation } from 'react-i18next';
import {ThreeGridLayout} from "../../layouts";
import {
	HeaderBlock,
	LeftMenuBlock,
	NotificationsBlock,
	MyMessagesBlock
} from '../../blocks';
import "./MessagesActivity.scss";

export class MessagesActivityComponent extends React.Component {
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
				centerJSX={<MyMessagesBlock/>}
				rightJSX={null}
			/>
		);
	}
}
export const MessagesActivity = withTranslation()(MessagesActivityComponent)