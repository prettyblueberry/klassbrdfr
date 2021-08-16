import * as React from "react";
import { withTranslation } from 'react-i18next';
import classnames from "classnames";
import PropTypes from 'prop-types';
import "./MessagesLayout.scss";

class MessagesLayoutComponent extends React.Component {
	static $t;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
	}
	getClassesRoot() {
		let classes = {
			"messages-layout": true,
		}
		if(this.props.className){
			classes[this.props.className] = true;
		}
		return classnames(classes);
	}
	render() {
		return (
			<div className={this.getClassesRoot()}>
				{this.props.headerHTML}
				<div className="messages-layout__body">
					<div className="messages-layout__left">
						{this.props.leftPanelHTML}
					</div>
					<div></div>
					<div className="messages-layout__right">
						{this.props.rightPanelHTML}
					</div>
				</div>
			</div>
		);
	}
}
MessagesLayoutComponent.propTypes = {
	leftPanelHTML: PropTypes.node.isRequired,
	rightPanelHTML: PropTypes.node.isRequired,
	headerHTML: PropTypes.node.isRequired,
}
export const MessagesLayout = withTranslation()(MessagesLayoutComponent)
