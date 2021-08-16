import * as React from "react";
import PropTypes from 'prop-types';
import {
  Link
} from 'react-router-dom';
import classnames from "classnames";
import {queryStringToObject, objectToQueryString} from "../../../../../lib/Utils";
import "./TabButton.scss";

class TabButtonComponent extends React.Component {
	static translate;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
	}
	getQueries(){
		let queries = queryStringToObject();
		let queriesInTab = this.getTabData().queries;
		Object.keys(queriesInTab).forEach((keyQuery) => {
			queries[keyQuery] = queriesInTab[keyQuery];
		});
		return queries;
	}
	getQueriesString() {
		const queriesObj = this.getQueries();
		return objectToQueryString(queriesObj);
	}
	getTabData(){
		return this.props.tab;
	}
	getClasses() {
		let classes = {
			"tab-button": true,
		}
		if(this.props.isActive){
			classes["tab-button--active"] = true;
		}
		return classnames(classes);
	}
	render() {
		return (
			<Link
				className={this.getClasses()}
				to={{ pathname: "/messages", search: `?${this.getQueriesString()}`}}
			>{this.getTabData().title}</Link>
		);
	}
}
TabButtonComponent.propTypes = {
	tab: PropTypes.object.isRequired,
	isActive: PropTypes.bool.isRequired,
}
export const TabButton = TabButtonComponent