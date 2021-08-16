import * as React from "react";
import { withTranslation } from 'react-i18next';
import {withRouter} from 'react-router-dom';
import "./ClassEmpty.scss";

export class ClassEmptyComponent extends React.Component {
	static translate;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;


		this.linkClass=()=>{
				this.props.history.push(`/link-class/${this.props.classroom.id}`);
		}
	}



	render() {
		return (
			<div className="class-item-right__empty">
				<img src="/public/pages/listClasses/link-icon.svg" className="class-item-right__empty-icon"/>
				<a className="class-item-right__empty-link" onClick={this.linkClass}>{this.$t("Link a Klassroom class")}</a>
			</div>
		);
	}
}
const TranslatedComponent = withTranslation()(ClassEmptyComponent);
export const ClassEmpty = withRouter(props => <TranslatedComponent {...props}/>)
