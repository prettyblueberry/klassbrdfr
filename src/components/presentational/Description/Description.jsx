import * as React from "react";
import { withTranslation } from 'react-i18next';
import "./Description.scss";

export class DescriptionComponent extends React.Component {
	static translate;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
	}
	render() {
		return (
			<div className="description-component">
				<div className="description-component__left">
					<img className="description-component__link-icon" src="/public/pages/listClasses/link-icon.svg"/>
				</div>
				<div className="description-component__center">
					<div className="description-component__h1" dangerouslySetInnerHTML={{__html: this.$t('<b>Link</b> your classes')}}></div>
					<div className="description-component__h2">{this.$t('Link your classes created in Klassboard to Klassroom classes.')}</div>
				</div>
				<div className="description-component__right">
					<img className="description-component__book" src="/public/pages/listClasses/books-icon.svg"/>
				</div>
			</div>
		);
	}
}
export const Description = withTranslation()(DescriptionComponent)
