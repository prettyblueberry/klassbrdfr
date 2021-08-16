import * as React from "react";
import { withTranslation } from 'react-i18next';
import {ScrollByMouse} from "../../coordinates";
import classnames from "classnames";
import PropTypes from 'prop-types';
import "./ThreeGridLayout.scss";

class ThreeGridLayoutComponent extends React.Component {
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
	onScroll = (event) => {
		const _event = new CustomEvent("_scroll", {detail: {event}});
		window.dispatchEvent(_event);
	}
	getRootClass() {
		let classes = {
			"three-grid-layout cb-scroll-list": true,
		}
		if(this.props.className){
			classes[this.props.className] = true;
		}
		if(this.props.rightJSX){
			classes["three-grid-layout--have-right-block"] = true;
		}
		return classnames(classes);
	}
	render() {
		return (
		<ScrollByMouse onScroll={this.onScroll} onScrollBottom={this.onScrollBottom} className={this.getRootClass()}>
			<div className="three-grid-layout__header">
				{this.props.headerJSX}
			</div>
			<div className="three-grid-layout__body">
				<div className="three-grid-layout__left">
					{this.props.leftJSX}
				</div>

				<div className="three-grid-layout__center" id="listscroll">
					{this.props.showShapes && (<>
						<div className="small-butterscotch"></div>
						<div className="small-coral"></div>
						<div className="small-turquoise-blue"></div>
						<div className="small-purple"></div>
					</>)}
					{this.props.centerJSX}
					<br /><br />
				</div>

				{this.props.rightJSX && <div className="three-grid-layout__right">
					{this.props.rightJSX}
				</div>
				}
			</div>
		</ScrollByMouse>
		);
	}
}
ThreeGridLayoutComponent.propTypes = {
	headerJSX: PropTypes.node.isRequired,
	leftJSX: PropTypes.node.isRequired,
	centerJSX: PropTypes.node.isRequired,
	rightJSX: PropTypes.node,
}
export const ThreeGridLayout = withTranslation()(ThreeGridLayoutComponent)
