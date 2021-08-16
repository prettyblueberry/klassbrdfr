import * as React from "react";
import {CoordinatesContext} from "../";
import "./Ghost.scss";

class GhostComponent extends React.Component {
	static translate;
	static i18n;
	coordinatesAPI = null;
	constructor(props) {
		super(props);
		this.rootElement = React.createRef();
	}
	componentDidMount() {
		this.subscribeEvents();
		if(this.getGhostData() && this.getGhostData().startPosition){
			this.updatePosition(this.getGhostData().startPosition);
		}
	}
	componentWillUnmount() {
		this.unsubscribeEvents();
	}
	// ======= Events, subscribes. =======
	subscribeEvents() {
		this.coordinatesAPI.on('mousemove', this.onMouseMove);
	}
	unsubscribeEvents(){
		this.coordinatesAPI.off(this.onMouseMove);
	}
	onMouseMove = ({event}) => {
		if(this.getGhostData()){
			this.updatePosition({
				top: event.pageY - this.getGhostData().shiftTop,
				left: event.pageX - this.getGhostData().shiftLeft
			});
		}
	}
	getGhostElement(){
		return this.rootElement.current;
	}
	getGhostData() {
		return this.props.ghostData;
	}
	/** Update position of ghost */
	updatePosition(position) {
		const ghostElement = this.getGhostElement();
		if(ghostElement && this.getGhostData()) {
			// set horizontal position of ghost
			if (position.top <= (document.body.offsetHeight - ghostElement.offsetHeight) && position.top >= 0) {
				ghostElement.style.top = `${position.top}px`;
			} else {
					if (position.top < 0) {
						ghostElement.style.top = '0px';
					} else {
						ghostElement.style.top = `${document.body.offsetHeight - ghostElement.offsetHeight}px`;
				}
			}
			// set vertical position of ghost
			if (position.left <= (document.body.offsetWidth - ghostElement.offsetWidth) && position.left >= 0) {
				ghostElement.style.left = `${position.left}px`;
			} else {
				if (position.left < 0) {
					ghostElement.style.left = '0px';
				} else {
					ghostElement.style.left = `${document.body.offsetWidth - ghostElement.offsetWidth}px`;
				}
			}
		}
	}
	renderGhostComponent() {
		if(this.getGhostData() && this.getGhostData().component){
			return (
				<>
					{this.getGhostData().component}
				</>
			)
		}
		return null;
	}
	render() {
		return (
			<CoordinatesContext.Consumer>
			{({coordinatesAPI}) => {
				this.coordinatesAPI = coordinatesAPI;
				return ( 
					<div ref={this.rootElement} className="ghost-component">
						{this.renderGhostComponent()}
					</div>
				)}
			}
		 	</CoordinatesContext.Consumer>
		);
	}
}
export const Ghost = GhostComponent