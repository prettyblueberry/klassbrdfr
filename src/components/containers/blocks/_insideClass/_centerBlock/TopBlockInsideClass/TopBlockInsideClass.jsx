import * as React from "react";
import { withTranslation } from 'react-i18next';
import {withRouter} from 'react-router-dom';
import {ListAPI} from "lists";
import PropTypes from 'prop-types';
import "./TopBlockInsideClass.scss";
import {RoundIconMiddle} from "presentational";

class TopBlockInsideClassComponent extends React.Component {
	static translate;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
		this.klass = this.props.klass;
		this.members = this.props.klass.active_members;

	}
	renderUsersList(){
		const members = Object.values(this.members);
		return members.slice(0,4).map((member, index) => {

			return (
				<div key={member.user.id} className="top-block-inside-class__user">
					{members.length > 3 && index == 3 && <div className="top-block-inside-class__user-count">+{members.length - 4}</div>}
					{member.user.thumb_image_url && <img src={member.user.thumb_image_url}/>}
					{!member.user.thumb_image_url && <RoundIconMiddle char={member.user.first_name[0]} style={{width: "100%", height: "100%"}}/>}

				</div>
			)
		});
	}
	renderBackground(){
		if(this.klass.cover_thumb_url){
			return <img style={{backgroundImage: `url(${this.klass.cover_thumb_url})`}} className="top-block-inside-class__cover-img"/>
		}
		return <img style={{backgroundImage: "url(/public/images/classroom.png)"}} className="top-block-inside-class__cover-img"/>;
	}
	render() {

		if(!this.klass){
			return null;
		}
		return (
			<div className="top-block-inside-class">

				<div className="top-block-inside-class__cover">
					{this.renderBackground()}
					<div className="top-block-inside-class__cover-background" style={{backgroundImage: "url(/public/images/curve_orange.png)"}}></div>
				</div>

				<div className="top-block-inside-class__users">

					{this.renderUsersList()}

				</div>

				<div className="top-block-inside-class__titles">
					<div className="top-block-inside-class__h1">
						{this.klass.natural_name}
					</div>
					<div className="top-block-inside-class__h2">
						{this.$t("By {{user}}", {user: this.klass.ownerDisplayName()})}
					</div>
				</div>

			</div>
		);
	}
}
TopBlockInsideClassComponent.propTypes = {

}

const TranslatedComponent = withTranslation()(TopBlockInsideClassComponent);
export const TopBlockInsideClass = withRouter(props => <TranslatedComponent {...props}/>)
