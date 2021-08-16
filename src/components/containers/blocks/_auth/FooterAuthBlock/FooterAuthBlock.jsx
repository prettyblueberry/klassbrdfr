import * as React from "react";
import { withTranslation } from 'react-i18next';
import classnames from "classnames";
import "./FooterAuthBlock.scss";

export class FooterAuthBlockComponent extends React.Component {
	static $t;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
	}
		/** Change language */
	changeLanguage(language) {
		this.i18n.changeLanguage(language);
	}
	getLanguage() {
		return this.i18n.language;
	}
	isLanguageButtonActive(language) {
		return this.getLanguage() === language;
	}
	getFlagOfLanguageSrc() {
		return `/public/k-img/flags/${this.getLanguage()}.svg`;
	}
	render() {
		return (
			<div className="k-footer">
					<div className="ad-buttons hide-desktop">
						<a className="btn-download" href="https://play.google.com/store/apps/details?id=co.roomapp.klassroom&amp;hl=en" target="_blank"  rel="noreferrer">
							<img src="/public/k-img/button-android.svg"/>
						</a>
						<a className="btn-download" href="https://itunes.apple.com/us/app/klassroom/id964833134?mt=8" target="_blank"  rel="noreferrer">
							<img src="/public/k-img/button-ios.svg"/>
						</a>
					</div>
					<div className="k-footer-lang">
            <img src={this.getFlagOfLanguageSrc()}/>
            <span className={classnames({active: this.isLanguageButtonActive('fr')})}><a onClick={ () => this.changeLanguage("fr")}>Français</a></span> ●
            <span className={classnames({active: this.isLanguageButtonActive('en')})}><a onClick={ () => this.changeLanguage("en")}>English</a></span> ●
            <span className={classnames({active: this.isLanguageButtonActive('es')})}><a onClick={ () => this.changeLanguage("es")}>Español</a></span>
					</div>
						<div className="k-footer-legal">
							{this.$t("©{{year}} Klassroom SAS, All rights reserved",{year:new Date().getFullYear()})} <a href="http://klassroom.co/terms-of-use" target="_blank"  rel="noreferrer">{this.$t("Terms and Conditions")}</a>
						</div>
				</div>
		);
	}
}
export const FooterAuthBlock = withTranslation()(FooterAuthBlockComponent)
