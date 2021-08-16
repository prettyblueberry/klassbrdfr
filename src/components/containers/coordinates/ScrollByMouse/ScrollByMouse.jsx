import * as React from "react";
import {CoordinatesContext} from "..";
import classnames from "classnames";
import "./ScrollByMouse.scss";

class ScrollByMouseComponent extends React.Component {
	// top || bottom
	scrollingType = null;
	intervalUpdateScroll = null;
	coordinatesAPI = null;
	timeoutScrollBottom = null;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
		this.previousScrollY = 0;
		this.rootElement = React.createRef();
	}
	componentWillUnmount() {
		this.stopScolling();
	}
	getClasses() {
		let classes = {
			"scroll-mouse-component": true,
		}
		if(this.props.className){
			classes[this.props.className] = true;
		}
		return classnames(classes);
	}
	getRootElement() {
		return this.rootElement.current;
	}
	scrollTop() {
		if(!this.scrollingType) {
			this.stopScolling();
			this.intervalUpdateScroll = setInterval(() => {
				this.scrollingType = "top";
				const element = this.getRootElement();
				element.scrollTop -= 35;
			}, 100);
		}
	}
	scrollBottom() {
		if(!this.scrollingType) {
			this.stopScolling();
			this.intervalUpdateScroll = setInterval(() => {
				this.scrollingType = "bottom";
				const element = this.getRootElement();
				element.scrollTop += 35;
			}, 100);
		}
	}
	stopScolling(){
		if(this.scrollingType || this.intervalUpdateScroll){
			clearInterval(this.intervalUpdateScroll);
			this.scrollingType = null;
		}
	}
	onMouseMove = (event) => {
		const element = this.getRootElement();
		const rect = element.getBoundingClientRect();
		const ghostData = this.coordinatesAPI.ghostData;
		const position = {
			left: event.pageX - rect.left,
			top: event.pageY - rect.top,
		};
		if(ghostData){
			if(position.top >= (element.offsetHeight - 50)){
				this.scrollBottom();
			} else if(position.top <= 50){
				this.scrollTop();
			} else {
				this.stopScolling();
			}
		} else {
			this.stopScolling();
		}
	}
	onScroll = (event) => {
		const element = event.target;
		clearTimeout(this.timeoutScrollBottom);
		this.props.onScroll(event);
		if (this.previousScrollY != element.scrollTop && (element.scrollHeight - element.scrollTop === element.clientHeight) && this.props.onScrollBottom) {
			this.previousScrollY = element.scrollTop;
			this.timeoutScrollBottom = setTimeout(() => {
				this.props.onScrollBottom();
			}, 100);
		}
	}
	render() {
		return (
			<CoordinatesContext.Consumer>
			{({coordinatesAPI}) => {
				this.coordinatesAPI = coordinatesAPI;
				return (
					<div onScroll={this.onScroll} onMouseMove={this.onMouseMove} ref={this.rootElement} className={this.getClasses()}>
						{this.props.children}
					</div>
				)}
			}
		 	</CoordinatesContext.Consumer>
		);
	}
}
export const ScrollByMouse = ScrollByMouseComponent
