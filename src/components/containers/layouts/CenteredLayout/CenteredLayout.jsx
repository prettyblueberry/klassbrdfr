import * as React from "react";
import { withTranslation } from 'react-i18next';
import {ScrollByMouse} from "../../coordinates";
import PropTypes from 'prop-types';
import "./CenteredLayout.scss";

class CenteredLayoutComponent extends React.Component {
	static $t;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
	}
	onScrollBottom = () => {
		const event = new CustomEvent("scrollBottom", {});
		window.dispatchEvent(event);
	}
	render() {
		return (
		<ScrollByMouse onScrollBottom={this.onScrollBottom} className="centered-layout">
			<div className="centered-layout__header">
				{this.props.headerJSX}
			</div>
			<div className="centered-layout__body">
				<div className="centered-layout__center">
					{this.props.centerJSX}
				</div>
			</div>
		</ScrollByMouse>
		);
	}
}
CenteredLayoutComponent.propTypes = {
	headerJSX: PropTypes.node.isRequired,
	centerJSX: PropTypes.node.isRequired,
}
export const CenteredLayout = withTranslation()(CenteredLayoutComponent)
