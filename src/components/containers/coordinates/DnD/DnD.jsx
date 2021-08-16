import * as React from "react";
import {CoordinatesContext} from "../";
import PropTypes from 'prop-types';
import classnames from "classnames";
import "./DnD.scss";

export class DnDComponent extends React.Component {
	static translate;
	static i18n;
	coordinatesAPI = null;
	rootElement = null;
	itDragged = false;
	delayStartDrag = null;
	constructor(props) {
		super(props);
		this.rootElement = React.createRef();
	}
	componentDidMount() {
		this.subscribeEvents();
	}
	componentWillUnmount() {
		this.unsubscribeEvents();
	}
	// ======= Events, subscribes. =======
	subscribeEvents() {
		this.coordinatesAPI.on('mouseup', this.onMouseUp);
	}
	unsubscribeEvents() {
		this.coordinatesAPI.off(this.onMouseUp);
	}
	canUploadFiles() {
    return this.props.type === 'files';
	}
	canReceiveData() {
		const dataForReceiver = this.coordinatesAPI.getDataForReceiver();
    return (
			(this.props.type === 'drop' || this.props.type === 'drag-drop') &&
			dataForReceiver &&
      Array.isArray(this.props.typesSenders) &&
      dataForReceiver.typeRecipient &&
			dataForReceiver.data &&
			!this.itDragged &&
      this.props.typesSenders.includes(dataForReceiver.typeRecipient)
    );
  }
  addDashedBorder() {
		this.rootElement.current.className += " dnd-component--dragged-file"
  }
  removeDashedBorder() {
		this.rootElement.current.className = this.rootElement.current.className.replace(" dnd-component--dragged-file", "");
	}
	onMouseUp = () => {
		clearTimeout(this.delayStartDrag);
		if (this.isEnter && this.canReceiveData()) {
			const dataForReceiver = this.coordinatesAPI.getDataForReceiver();
			this.props.onDrop(dataForReceiver.data, this.props.data);
		} else if (this.props.type === 'files') {}
		this.removeStyle();
		this.itDragged = false;
		if( typeof this.props.onEndDrag == 'function') {
			this.props.onEndDrag();
		}
	}
	onDragEnter = (event) => {
    if (this.canUploadFiles()) {
			event.preventDefault();
      this.addDashedBorder();
    }
	}
	onDragOver = (event) => {
    if (this.canUploadFiles()) {
			event.preventDefault();
    }
	}
	onDragLeave = (event) => {
    if (this.canUploadFiles()) {
			event.preventDefault();
			this.removeDashedBorder();
    }
	}
	onDropFiles = (event) => {
    if (this.canUploadFiles()) {
			event.preventDefault();
      const dt = event.dataTransfer;
      const files = dt.files;
      this.props.onDrop(files);
      this.removeDashedBorder();
    }
	}
	onMouseDown = (event) => {
		if(!this.props.buttonDnDClass || (this.props.buttonDnDClass && event.nativeEvent.target.className.indexOf(this.props.buttonDnDClass) > -1 && event.nativeEvent.which === 1)){
			if (this.props.ghostComponent && this.props.data && (this.props.type === 'drag' || this.props.type === 'drag-drop')) {
				clearTimeout(this.delayStartDrag);
				const startPosition = {
					top: event.pageY,
					left: event.pageX,
				}
				this.delayStartDrag = setTimeout(() => {
					this.itDragged = true;
					if( typeof this.props.onStartDrag == 'function') {
						this.props.onStartDrag();
					}
					this.coordinatesAPI.setGhost({
						component: this.props.ghostComponent,
						data: this.props.data,
						typeRecipient: this.props.typeRecipient,
						startPosition,
						shiftLeft: this.props.shiftLeft || 0,
						shiftTop: this.props.shiftTop || 0,
					});
				}, 150);
	    }
		}
	}
	onMouseEnter = (event) => {
    if (this.canReceiveData()) {
      this.isEnter = true;
      this.styleWhenHover();
    }
	}
	onMouseLeave = (event) => {
    this.isEnter = false;
    this.removeStyle();
	}
	styleWhenHover = () => {
		this.rootElement.current.style.opacity = '0.6';
		this.rootElement.current.style.border = "1px dashed #333";
  }
  removeStyle = () => {
		if(this.rootElement && this.rootElement.current){
			this.rootElement.current.style.opacity = '1';
			this.rootElement.current.style.border = "1px dashed transparent";
		}
	}
	getRootClass() {
		let classes = {
			"dnd-component": true,
		}
		if(this.props.className){
			classes[this.props.className] = true;
		}
		return classnames(classes);
	}
	renderBody() {
		if(this.itDragged) {
			return (
				<div className="dnd-component__dragged-container">
					<div className="dnd-component__dragged">
						{this.props.children}
					</div>
				</div>
			)
		} else {
			return this.props.children;
		}
	}
	render() {
		return (
			<CoordinatesContext.Consumer>
        {({coordinatesAPI}) => {
				 this.coordinatesAPI = coordinatesAPI;
				 return (
						<div
						onDragEnter={this.onDragEnter}
						onDragOver={this.onDragOver}
						onDragLeave={this.onDragLeave}
						onDrop={this.onDropFiles}
						onMouseDown={this.onMouseDown}
						onMouseEnter={this.onMouseEnter}
						onMouseLeave={this.onMouseLeave}
						ref={this.rootElement}
						className={this.getRootClass()}>
							{this.renderBody()}
						</div>
					)}
				}
		 	</CoordinatesContext.Consumer>
		);
	}
}
DnDComponent.propTypes = {
	buttonDnDClass: PropTypes.any,
	ghostComponent: PropTypes.any,
	data: PropTypes.any,
	type: PropTypes.any,
	onDrop: PropTypes.any,
	typesSenders: PropTypes.any,
	shiftLeft:  PropTypes.number,
	shiftTop:  PropTypes.number,
	onStartDrag: PropTypes.func,
	onEndDrag: PropTypes.func,
}
export const DnD = DnDComponent;
