import * as React from "react";
import { withTranslation } from 'react-i18next';
import {ThreeGridLayout} from "../../layouts";
import {
	HeaderBlock,
	LeftMenuBlock,
	NotificationsBlock,
	ListClassesMainBlock,
} from '../../blocks';
import "./MyClassesActivity.scss";
import {KRClient, KBEvent} from "@klassroom/klassroom-sdk-js";

export class MyClassesActivityComponent extends React.Component {
	static $t;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
		this.handleEvent = (ev, opts)=>{
				switch(ev){
						case KBEvent.classroom_updated:
							this.forceUpdate();
							break;
				}
		}
		KRClient.getInstance().addListener(this,this.handleEvent);

	}

	componentWillUnmount(){
		KRClient.getInstance().removeListener(this);
	}
	render() {

		return (
			<ThreeGridLayout
				className="my-classses-grid"
				headerJSX={<HeaderBlock pageType="school"/>}
				leftJSX={<LeftMenuBlock pageType="school"/>}
				centerJSX={<ListClassesMainBlock/>}
				rightJSX={null}
			/>
		);
	}
}
export const MyClassesActivity = withTranslation()(MyClassesActivityComponent)
