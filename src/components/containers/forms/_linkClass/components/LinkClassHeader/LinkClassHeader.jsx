import * as React from "react";
import { withTranslation } from 'react-i18next';
import "./LinkClassHeader.scss";

class LinkClassHeaderComponent extends React.Component {
	static translate;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
	}

	goBack = () => {
		this.props.callbackOnBack();
	}

	render() {
		return (
			<div className="link-class-header">
			 {!this.props.noback && <div onClick={this.goBack} className="add-class-confirm__back-button"><img src="/public/pages/addClass/back-btn.svg" />{this.$t("Back")}</div>}
				<div className="link-class-header__h1">{this.$t('MY KLASSBOARD CLASS')}</div>
				<div className="link-class-header__h2">{this.props.classroom.name}</div>
			</div>
		);
	}
}
export const LinkClassHeader = withTranslation()(LinkClassHeaderComponent)
