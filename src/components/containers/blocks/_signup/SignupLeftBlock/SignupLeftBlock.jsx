import * as React from "react";
import { withTranslation } from 'react-i18next';
import classnames from "classnames";
import PropTypes from 'prop-types';
import "./SignupLeftBlock.scss";

class SignupLeftBlockComponent extends React.Component {
	static $t;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
	}
	getClassesStep(step, index) {
		return classnames({
			"left-list-item": true,
			active: index === (this.props.step - 1),
			inactive: index !== (this.props.step - 1),
			done: step.data !== null
		});
	}
	renderSteps() {
		return this.props.stepsData.map((step, index) => {
				return (
				<div key={index} className={this.getClassesStep(step, index)}>
					<div className={`left-list-oval`}>{index + 1}</div>
					<div className={`left-list-step`}>{this.$t(step.title)}</div>
					<div className={`left-list-checked`}>
						<div className="check-sign"> &#10003;</div>
					</div>
				</div>
				)
		});
	}
	render() {
		return (
		<div className="left-panel">
			<img src="/public/images/left-panel.png" className="left-panel-image" />
			<div className="left-wellcome">{this.$t('WELCOME')}</div>
			<div className="left-create-account">
				<span className="left-create-text">{this.$t('Create my account')}</span>
			</div>
			{this.renderSteps()}
		</div>
		);
	}
}
SignupLeftBlockComponent.propTypes = {
	step: PropTypes.number.isRequired,
	stepsData: PropTypes.array.isRequired,
}
export const SignupLeftBlock = withTranslation()(SignupLeftBlockComponent)
