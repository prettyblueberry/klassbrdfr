import * as React from "react";
import { withTranslation } from 'react-i18next';
import {Button} from "../../../../presentational";
import "./AdvertisingAuthBlock.scss";

export class AdvertisingAuthBlockComponent extends React.Component {
	static $t;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
	}
	render() {
		return (
			<aside className="k-activity-advertising">
				<img className="floating-unicorn" src="/public/k-img/unicorns/1.png"/>
				<img className="floating-unicorn" src="/public/k-img/unicorns/2.png"/>
				<img className="floating-unicorn" src="/public/k-img/unicorns/3.png"/>
				<img className="floating-unicorn" src="/public/k-img/unicorns/4.png"/>
				<img className="floating-unicorn" src="/public/k-img/unicorns/5.png"/>
				<img className="floating-unicorn" src="/public/k-img/unicorns/6.png"/>
				<img className="floating-unicorn" src="/public/k-img/unicorns/7.png"/>
				<div className="ad-text">
					<h1>{this.$t("With Klassboard, easily broadcast information to all the students parents")}</h1>
					<Button iconType="arrow-white" typeDesign="outline-white" link={this.$t("https://klassroom.co/discover/klassroom-for-schools")} target="_blank"  rel="noreferrer" absoluteLink={true} name={this.$t("Learn more")}/>
				</div>
				<div className="ad-buttons">
						<a className="btn-download" href={this.$t("https://play.google.com/store/apps/details?id=co.roomapp.klassroom&hl=en")} target="_blank" rel="noreferrer"><img src="/public/k-img/button-android.svg"/></a>
						<a className="btn-download" href={this.$t("https://itunes.apple.com/us/app/klassroom/id964833134?mt=8")} target="_blank"  rel="noreferrer"><img src="/public/k-img/button-ios.svg"/></a>
				</div>
			</aside>
		);
	}
}
export const AdvertisingAuthBlock = withTranslation()(AdvertisingAuthBlockComponent)
