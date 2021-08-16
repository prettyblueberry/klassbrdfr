import * as React from "react";
import { withTranslation } from 'react-i18next';
import classnames from "classnames";
import PropTypes from 'prop-types';
import {PhotoSelector} from "../../../presentational";
import { connect } from 'react-redux';
import "./StepsLeftBlock.scss";

class StepsLeftBlockComponent extends React.Component {
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
	getClassesStep(step, index) {
		return classnames({
			"steps-left-block__item": true,
			active: index === (this.props.step - 1),
			inactive: index !== (this.props.step - 1),
			done: step.data !== null
		});
	}
	renderSteps() {
		return this.props.stepsData.map((step, index) => {
				return (
				<div key={index} className={this.getClassesStep(step, index)}>
					<div className="steps-left-block__oval">{index + 1}</div>
					<div className="steps-left-block__step">{this.$t(step.title)}</div>
					<div className="steps-left-block__checked">
						<div className="steps-left-block__check-sign"> &#10003;</div>
					</div>
				</div>
				)
		});
	}
	changePhoto = (photo) => {
		this.props.changePhoto(photo);
	}
	renderPhoto() {
		if(this.props.showingPhotoButton) {
			return (
				<div className="steps-left-block__photo">
					<PhotoSelector
						photo={this.props.photo}
						callbackChangePhoto={this.changePhoto}
					/>
				</div>
			);
		}
		return null;
	}
	render() {
		return (
		<div className="steps-left-block">
			<img src="/public/images/left-panel.png" className="steps-left-block__image" />
			{this.renderPhoto()}
			<div className="steps-left-block__wellcome">{this.props.textJSX}</div>
			<div className="steps-left-block__create-account" dangerouslySetInnerHTML={{__html: this.props.text2JSX}}>
			</div>
			{this.renderSteps()}
		</div>
		);
	}
}
StepsLeftBlockComponent.propTypes = {
	step: PropTypes.number.isRequired,
	stepsData: PropTypes.array.isRequired,
	textJSX: PropTypes.string.isRequired,
	text2JSX: PropTypes.string.isRequired,
	showingPhotoButton: PropTypes.bool,
	changePhoto: PropTypes.func,
	photo: PropTypes.object
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    changePhoto: (photo) => dispatch({
			type: "ADD_SCHOOL_PAGE.CHANGE_PHOTO",
			data: {photo}
		})
  }
}

export const StepsLeftBlock = connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslation()(StepsLeftBlockComponent));
