import * as React from "react";
import { withTranslation } from 'react-i18next';
import classnames from "classnames";
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import {SchoolPhoto, ClassNumber, Button} from "../../../../presentational";
import "./AddClassLeftBlock.scss";
import {KRClient} from '@klassroom/klassroom-sdk-js';

class AddClassLeftBlockComponent extends React.Component {
	static $t;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
		this.state = {}
	}
	gotoDashboard = (event) => {
		event.preventDefault();
		this.props.history.push(`/`)
	}
	renderLists() {
		if(!this.props.allClasses || this.props.allClasses === 0) {
			return (
				<>
					<div className="add-class-left-block__h3" dangerouslySetInnerHTML={{__html:this.$t("<b>Add</b> your classes")}}></div>
					<div className="add-class-left-block__description" dangerouslySetInnerHTML={{__html:this.$t("Add your different classes in Klassboard in a few clicks.<br/><br/>A simple way for you to organize and manage all your classes in one place!")}}></div>
				</>
			)
		} else {
			return (
				<div className="add-class-left-block__count">
					<div className="add-class-left-block__h3" dangerouslySetInnerHTML={{__html:this.$t("<b>My</b> classes")}}></div>
					<ClassNumber count={this.props.allClasses}/>
					<Button onClick={this.gotoDashboard} iconType="arrow-blue" iconSide="right" typeDesign="outline-blue" name={this.$t("Go to my dashboard")}/>
				</div>
			)
		}
	}
	render() {
		return (
		<div className="add-class-left-block">
			<img src="/public/images/left-panel-add-class.png" className="add-class-left-block__image" />
			<SchoolPhoto/>
			<div className="add-class-left-block__h1">{this.$t("MY SCHOOL")}</div>
			<div className="add-class-left-block__h2" dangerouslySetInnerHTML={{__html: KRClient.getInstance().organization.name}}></div>
			<div className="add-class-left-block__rectangle"></div>
			{this.renderLists()}
		</div>
		);
	}
}
AddClassLeftBlockComponent.propTypes = {
	step: PropTypes.number.isRequired,
	class: PropTypes.object
}

export const AddClassLeftBlock = withRouter(withTranslation()(AddClassLeftBlockComponent))
