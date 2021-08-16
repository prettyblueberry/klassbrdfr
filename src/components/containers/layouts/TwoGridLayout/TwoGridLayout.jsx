import * as React from "react";
import { withTranslation } from 'react-i18next';
import classnames from "classnames";
import PropTypes from 'prop-types';
import "./TwoGridLayout.scss";

class TwoGridLayoutComponent extends React.Component {
	static $t;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
	}
	getClassesRoot() {
		let classes = {
			"two-grid-layout": true,
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
				<div className="center">
					<div className="left">
						{this.props.leftPanelHTML}
					</div>
					<div className="right">
						<div className="small-butterscotch" />
						<div className="small-coral" />
						<div className="small-turquoise-blue" />
						<div className="small-purple" />

						{this.props.rightPanelHTML}
					</div>
				</div>
			</div>
		);
	}
}
TwoGridLayoutComponent.propTypes = {
	leftPanelHTML: PropTypes.node.isRequired,
	rightPanelHTML: PropTypes.node.isRequired,
	headerHTML: PropTypes.node.isRequired,
}
export const TwoGridLayout = withTranslation()(TwoGridLayoutComponent)
