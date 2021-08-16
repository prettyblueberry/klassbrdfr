import * as React from "react";
import PropTypes from 'prop-types';
//import {CoordinatesContext} from "..";
import classnames from "classnames";
import "./InfinityScroll.scss";

class InfinityScrollComponent extends React.Component {
	static translate;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
		this.rootRef = React.createRef();
	}
	getRootClasses() {
		let classes = {
			"infinity-scroll": true,
		}
		if(this.props.className){
			classes[this.props.className] = true;
		}
		return classnames(classes);
	}
	/*$(window).scroll(function() {
		if($(window).scrollTop() + $(window).height() == $(document).height()) {
				alert("bottom!");
		}
 });*/
	onScroll = (event) => {
		const element = event.target;
		if (element.scrollHeight - element.scrollTop === element.clientHeight)
    {
			this.props.onScrollBottom();
    }
	}
	render() {
		return (
			<div onScroll={this.onScroll} ref={this.rootRef} className={this.getRootClasses()}>
				{this.props.children}
			</div>
		);
	}
}
InfinityScrollComponent.propTypes = {
	onScrollBottom: PropTypes.func.isRequired,
}
export const InfinityScroll = InfinityScrollComponent;