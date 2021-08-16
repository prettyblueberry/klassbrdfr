import * as React from "react";
import { withTranslation } from 'react-i18next';
import {ClassEmpty} from "./components/ClassEmpty/ClassEmpty";
import {ClassLinked} from "./components/ClassLinked/ClassLinked";
import {ClassNotLinked} from "./components/ClassNotLinked/ClassNotLinked";
import PropTypes from 'prop-types';
import "./ClassItemRight.scss";
import {KROrgKlassRequest} from "@klassroom/klassroom-sdk-js";

export class ClassItemRightComponent extends React.Component {
	static translate;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
	}
	renderNotLinked() {
		return (
			<ClassNotLinked {...this.props} />
		);
	}
	renderLinked() {
		return (
			<ClassLinked {...this.props}/>
		)
	}
	renderEmpty() {
		return (
			<ClassEmpty {...this.props}/>
		);
	}
	render() {
		let classComponent = this.renderEmpty();
		if(this.props.classroom.request && this.props.classroom.request.status == KROrgKlassRequest.Status.pending){
			classComponent = this.renderNotLinked();
		}else if(this.props.classroom.klass){
			classComponent = this.renderLinked();
		}
		return (
			<div className="class-item-right">
				{classComponent}
			</div>
		);
	}
}
ClassItemRightComponent.propTypes = {
	type: PropTypes.string,
	index: PropTypes.number,
}
export const ClassItemRight = withTranslation()(ClassItemRightComponent)
