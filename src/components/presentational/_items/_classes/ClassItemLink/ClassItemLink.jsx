import * as React from "react";
import { withTranslation } from 'react-i18next';
import classnames from "classnames";
import PropTypes from 'prop-types';
import {ClassItemLeft} from "../ClassItemLeft/ClassItemLeft";
import {ClassItemRight} from "../ClassItemRight/ClassItemRight";
import "./ClassItemLink.scss";
import {KROrgKlassRequest} from "@klassroom/klassroom-sdk-js";

class ClassItemLinkComponent extends React.Component {
	static translate;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
	}
	getLinkClasses() {
		return classnames({
			"class-item-link__line": true,
			"class-item-link__gray": !this.props.type,
			"class-item-link__blue": this.props.classroom.klassID,
			"class-item-link__gold": this.props.classroom.request && this.props.classroom.request.status == KROrgKlassRequest.Status.pending
			,
		});
	}
	getStyle() {
		return this.props.style || {};
	}
	getClasses() {
		let classes = {
			"class-item-link": true,
		}
		if(this.props.className){
			classes[this.props.className] = true;
		}
		return classnames(classes);
	}
	render() {
		return (
			<div style={this.getStyle()} className={this.getClasses()}>
				<ClassItemLeft listAPI={this.props.listAPI} classroom={this.props.classroom}/>
				<div className={this.getLinkClasses()}>
					<span className="class-item-link__line-icon"></span>
					<span className="class-item-link__circles"></span>
				</div>
				<ClassItemRight index={this.props.index} classroom={this.props.classroom}/>
			</div>
		);
	}
}

ClassItemLinkComponent.propTypes = {
	classroom: PropTypes.object.isRequired,
	index: PropTypes.number,
	listAPI: PropTypes.object,
}
export const ClassItemLink = withTranslation()(ClassItemLinkComponent)
