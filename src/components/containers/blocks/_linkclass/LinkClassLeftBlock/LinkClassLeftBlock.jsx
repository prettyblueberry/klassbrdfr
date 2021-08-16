import * as React from "react";
import { withTranslation } from 'react-i18next';
import classnames from "classnames";
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import {SchoolPhoto} from "../../../../presentational";
import "./LinkClassLeftBlock.scss";
import {KRClient} from '@klassroom/klassroom-sdk-js';

class LinkClassLeftBlockComponent extends React.Component {
	static $t;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
		this.state = {
			showPopup: false
		}
	}
	gotoDashboard = (event) => {
		event.preventDefault();
		this.props.history.push(`/`)
	}
	render() {
		if(KRClient.getInstance().organization){
			return (
			<div className="add-class-left-block">
				<img src="/public/images/left-panel-add-class.png" className="add-class-left-block__image" />
				<SchoolPhoto/>
				<div className="add-class-left-block__h1">{this.$t("MY SCHOOL")}</div>
				<div className="add-class-left-block__h2" dangerouslySetInnerHTML={{__html: KRClient.getInstance().organization.name}}></div>
				<div className="add-class-left-block__rectangle"></div>

				<div className="add-class-left-block__h3" dangerouslySetInnerHTML={{__html:this.$t("<b>Link</b> a class")}}></div>
				<div className="add-class-left-block__description" dangerouslySetInnerHTML={{__html:this.$t("Link your classes created in Klassboard with Klassroom classes.<br/><br/>A simple way for you to organize and manage all your classes in one place!")}}></div>
			</div>
			)
		}
		return null;
	}
}
LinkClassLeftBlockComponent.propTypes = {
	class: PropTypes.object
}

export const LinkClassLeftBlock = withRouter(withTranslation()(LinkClassLeftBlockComponent))
