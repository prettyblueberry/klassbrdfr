import * as React from "react";
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import {withRouter} from 'react-router-dom';
import {Button, YearSelector, Description} from "../../../../presentational";
import {ListClasses} from "../../../lists";
import {ListClassesHeaderStatisticBlock} from "../ListClassesHeaderStatisticBlock/ListClassesHeaderStatisticBlock";
import "./ListClassesMainBlock.scss";
import {KRClient, KREvent} from "@klassroom/klassroom-sdk-js";

class ListClassesMainBlockComponent extends React.Component {
	static $t;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
		this.state = {
			selectedYear: null,
		}

		this.createClass = (event) => {
			event.preventDefault();
			this.props.history.push(`/add-class`)
		}
	}


	componentDidMount() {
		KRClient.getInstance().addListener(this,(event, options)=>{
				if(event == KREvent.app_connect){
						this.forceUpdate()
				}
		});
	}

	componentWillUnmount(){
		KRClient.getInstance().removeListener(this);
	}

	getSelectedYear() {
		return KRClient.getInstance().getPeriod();
	}
	
	gotoAddClassPage = (event) => {
		event.preventDefault();
		this.props.history.push(`/add-class`)
	}
	renderHeader() {
		return (
			<div className="listclasses-main-block__header">

				<div className="listclasses-main-block__header-left">
					<img className="listclasses-main-block__header-img" src="/public/pages/listClasses/classes-icon.svg"/>
					<span className="listclasses-main-block__header-title">{this.$t("My Classes")}</span>
				</div>

				<div className="listclasses-main-block__header-right">
					<Button onClick={this.gotoAddClassPage} iconType="add-white" iconSide="left" typeDesign="primary" name={this.$t("Add a new class")}/>
				</div>

			</div>
		)
	}

	renderEmpty() {
		return (
			<>
				<div className="listclasses-main-block__epmty">

				</div>
			</>
		)
	}
	renderClasses() {

		return (
			<>
				<ListClassesHeaderStatisticBlock/>
				<ListClasses />
			</>
		);
	}
	render() {
		return (
			<div className="listclasses-main-block">
				{this.renderHeader()}
				<YearSelector
					selectedYear={this.getSelectedYear()}
				/>
				<Description/>
				{Object.values(KRClient.getInstance().classrooms).length == 0 && this.renderEmpty()}
				{Object.values(KRClient.getInstance().classrooms).length> 0 && this.renderClasses()}
			</div>
		);
	}
}
ListClassesMainBlockComponent.propTypes = {

}

const TranslatedComponent = withTranslation()(ListClassesMainBlockComponent);
export const ListClassesMainBlock = withRouter(props => <TranslatedComponent {...props}/>)
