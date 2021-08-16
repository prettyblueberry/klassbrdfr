import * as React from "react";
import { withTranslation } from 'react-i18next';
import {ClassItemLink} from "../../../presentational";
import {ListAPI} from "lists";
import {DnD} from "../../coordinates";
import "./ListClasses.scss";
import {KRClient, KBEvent, KREvent} from "@klassroom/klassroom-sdk-js";


export class ListClassesComponent extends React.Component {
	static translate;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
		this.rootElement = React.createRef();
		this.widthOfGhost = 400;
		this.list = new ListAPI(this);
	}
	componentDidMount() {
		//this.addEventsListeners();
		if(this.rootElement && this.rootElement.current && this.rootElement.current.offsetWidth){
			this.widthOfGhost = this.rootElement.current.offsetWidth;
			this.forceUpdate();
		}


		KRClient.getInstance().addListener(this, (ev, opts)=>{
				switch(ev){
						case KBEvent.classroom_updated:
							this.forceUpdate();
							break;
							case 	KREvent.counts_updated:
								this.forceUpdate();
								break;


				}
		});

	}


	componentWillUnmount() {
		KRClient.getInstance().removeListener(this);
	}

	onDropClassRoom = (droppedItemData, currentItemData) => {
		console.clear();
		// here should write REST logic fro reorder classrooms

		showLoader()
		droppedItemData.classroom.setPosition(currentItemData.index)
		.finally(()=>{hideLoader()});

	}
	renderGhost(classroom) {
		return <ClassItemLink
			style={{
				height: "300px",
				width: `${this.widthOfGhost}px`,
				margin: "0",
			}}
			className="class-item-link--dragged"
			classroom={classroom}
		/>
	}
	render() {
		 const classrooms = Object.values(KRClient.getInstance().classrooms);
		 classrooms.sort((a,b) => {
			 	return a.position - b.position;
		 });
		return (
			<div ref={this.rootElement} className="list-classes">
				{classrooms.map((classroom, index) => {
					return (
						<DnD
							key={index}
							type="drag-drop"
							// Items which can send data, array of types items
							typesSenders={['myclasses']}
							// Type this item
							typeRecipient="myclasses"
							onDrop={this.onDropClassRoom}
							ghostComponent={this.renderGhost(classroom)}
							buttonDnDClass="class-item-left__dnd-inactive"
							data={{
								classroom,
								index,
							}}
						>
							<ClassItemLink listAPI={this.list} index={index} classroom={classroom} />
						</DnD>
					)
				})}
			</div>
		);
	}
}
export const ListClasses = withTranslation()(ListClassesComponent)
