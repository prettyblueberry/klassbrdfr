import * as React from "react";
import { withTranslation } from 'react-i18next';
import {CircleImage, ColorBar} from "presentational";
import {
  Link
} from 'react-router-dom';
import PropTypes from 'prop-types';
import "./ClassLinked.scss";

class ClassLinkedComponent extends React.Component {
	static translate;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
	}
	render() {
		return (
			<div className="class-linked">
				<ColorBar index={2}/>
				<div className="class-linked-header">

					<div className="class-linked-header__logo-container">
						<CircleImage
							photo={this.props.classroom.klass.cover_thumb_url || "/public/pages/listClasses/class-icon.svg"}

						/>
					</div>

					<div className="class-linked-header__name-container">
						<span title={this.props.classroom.klass.natural_name} className="class-linked-header__name">{this.props.classroom.klass.natural_name}</span>
						<span className="class-linked-header__by" dangerouslySetInnerHTML={{__html: this.$t("by <b>{{by}}</b>", {by: this.props.classroom.klass.ownerDisplayName()})}}></span>
            <span className="class-linked-data__row">
  						<img className="class-linked-data__icon" src="/public/pages/listClasses/link-transparent.svg"/>
  						<span>{this.props.classroom.klass.key}</span>
  					</span>
          </div>

					<div className="class-linked-header__icon-container">
						<img src="/public/pages/listClasses/link-blue-icon.svg"/>
					</div>

				</div>{/** class-linked-header[END] */}

			


				<div className="class-linked-bottom">
					<Link to={`/inside-class/${this.props.classroom.id}`} className="class-linked-link">
						{this.$t("Go the the class")} <img className="class-linked-arrow" src="/public/pages/listClasses/arrow-right-blue.svg"/>
					</Link>
				</div>

			</div>
		);
	}
}
ClassLinkedComponent.propTypes = {
	type: PropTypes.string,
	index: PropTypes.number,
	classroom: PropTypes.object.isRequired,
}
export const ClassLinked = withTranslation()(ClassLinkedComponent)
