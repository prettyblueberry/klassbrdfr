import * as React from "react";
import { withTranslation } from 'react-i18next';
import {Select} from "../../../../../presentational";
import {deepClone} from "../../../../../../lib/Utils";
import PropTypes from 'prop-types';
import "./ListStep2Item.scss";
import {ModalManager} from "containers/modals"

class ListStep2ItemComponent extends React.Component {
	static translate;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
	}
	componentDidMount(){
		if(this.props.columnItems.length > 4000){
			if(this.props.index === 0){
				ModalManager.getInstance().alert(this.$t("Warning"), this.$t("Maximum count of parents in CSV file is 4000. You can break CSV file to several and load them."));
				this.props.steps.goBack();
				//this.props.steps.addStep('MaximumCountParents', {countColumns: this.props.columnItems.length});
			}
		}
	}
	shouldComponentUpdate(nextProps, nextState) {
		if(nextProps.disableHeader !== this.props.disableHeader){
			let columns = deepClone(nextProps.columnItems);
			if(nextProps.disableHeader){
				columns.shift();
				this.props.onChange(this.props.columnId, nextProps.value, columns);
			} else {
				this.props.onChange(this.props.columnId, nextProps.value, columns);
			}
			return false;
		}
		return true;
	}
	onChange = (value) => {
		let columns = deepClone(this.props.columnItems);
		if(this.props.disableHeader) {
			columns.shift();
		}
		this.props.onChange(this.props.columnId, value, columns);
	}
	renderItems() {
		if(!this.props.columnItems || this.props.columnItems.length == 0){
			return null;
		}
		return this.props.columnItems.slice(0, 25).map((item, index) => {
			if(this.props.disableHeader && index == 0){
				return null;
			}
			return <div key={"column-list__item"+index} className="column-list__item">{item}</div>
		});
	}
	render() {
		return (
			<div className="list-step2-item">
				<Select
					value={this.props.value}
					onChange={this.onChange}
					label={this.$t("Match with")}
					placeholder={this.$t("Select a tag")}
					items={this.props.options}
					useEmptyValue={true}
				/>
				<div className="column-list">
					{this.renderItems()}
				</div>
			</div>
		);
	}
}
ListStep2ItemComponent.propTypes = {
	columnId: PropTypes.string.isRequired,
	options: PropTypes.array.isRequired,
	value: PropTypes.any.isRequired,
	onChange: PropTypes.func.isRequired,
	columnItems: PropTypes.array.isRequired,
	disableHeader: PropTypes.bool,
	steps: PropTypes.object,
	index: PropTypes.number,
}
export const ListStep2Item = withTranslation()(ListStep2ItemComponent)
