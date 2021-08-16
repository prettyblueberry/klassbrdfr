import * as React from "react";
import { withTranslation } from 'react-i18next';
import {
	ListStep2Item,
	CheckBoxLabeled,
	SelectSmall,
	CountWithLabel,
} from "presentational";
import {deepClone} from "../../../../../../lib/Utils";
import PropTypes from 'prop-types';
import "./ListStep2.scss";

class ListStep2Component extends React.Component {
	static translate;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
		this.steps = this.props.stepsAPI;
		this.form = this.props.formAPI;
		this.columnsVariants = this.props.columnsVariants;
		this.showAll = true;
		this.columns = [];
	}
	componentDidMount() {
		setTimeout(() => {
			this.fillColumns(this.form.getValueInputForm('delimiter'));
			this.forceUpdate();
		}, 50);
	}
	fillColumns = (delimiter) => {
		const step1Data = this.steps.getStepData("CSV_Step1");
		if(step1Data.data && step1Data.data.csv_file && step1Data.data.csv_file.result) {
			this.columns = this.convertCSVToArray(step1Data.data.csv_file.result, delimiter);
		}
	}


	convertCSVToArray( strData, strDelimiter ){
		// Check to see if the delimiter is defined. If not,
		// then default to comma.
		strDelimiter = (strDelimiter || ",");

		// Create a regular expression to parse the CSV values.
		var objPattern = new RegExp(
			(
			// Delimiters.
			"(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +

			// Quoted fields.
			"(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +

			// Standard fields.
			"([^\"\\" + strDelimiter + "\\r\\n]*))"
			),
			"gi"
			);

		// Create an array to hold our data. Give the array
		// a default empty first row.
		var arrData = [[]];

		// Create an array to hold our individual pattern
		// matching groups.
		var arrMatches = null;


		// Keep looping over the regular expression matches
		// until we can no longer find a match.
		while (arrMatches = objPattern.exec( strData )){

			// Get the delimiter that was found.
			var strMatchedDelimiter = arrMatches[ 1 ];

			// Check to see if the given delimiter has a length
			// (is not the start of string) and if it matches
			// field delimiter. If id does not, then we know
			// that this delimiter is a row delimiter.
			if (
		strMatchedDelimiter.length &&
			(strMatchedDelimiter != strDelimiter)
			){

			// Since we have reached a new row of data,
			// add an empty row to our data array.
			arrData.push( [] );

			}

			// Now that we have our delimiter out of the way,
			// let's check to see which kind of value we
			// captured (quoted or unquoted).
			if (arrMatches[ 2 ]){

			// We found a quoted value. When we capture
			// this value, unescape any double quotes.
			var strMatchedValue = arrMatches[ 2 ].replace(
			new RegExp( "\"\"", "g" ),
			"\""
			);

			} else {

			// We found a non-quoted value.
			var strMatchedValue = arrMatches[ 3 ];

			}

			// Now that we have our value string, let's add
			// it to the data array.
			arrData[ arrData.length - 1 ].push( strMatchedValue );
		}

		// Return the parsed data.

		return(  arrData[0].map((col, i) => arrData.map(row => row[i])));
	}
	_showAll = () => {
		this.showAll = true;
		this.forceUpdate();
	}
	showUnmatched = () => {
		this.showAll = false;
		this.forceUpdate();
	}
	getValueSelect = (columnId) => {
		const columns = this.form.getValueInputForm('columns');
		let selectedOption = "";
		Object.keys(columns).some((key) => {
			if(columns[key] && columns[key].columnId === columnId){
				selectedOption = key;
				return true;
			}
			return false;
		});
		return selectedOption;
	}
	getColumnId = (index) => {
		return "column" + index;
	}
	deleteOldValue(columns, columnId) {
		Object.keys(columns).some((key) => {
			if(columns[key].columnId == columnId){
				delete columns[key];
				return true;
			}
			return false;
		});
	}
	changeValue = (columnId, value, columnItems) => {
		let columns = deepClone(this.form.getValueInputForm('columns'));
		this.deleteOldValue(columns, columnId);
		if(value && value !== "") {
			columns[value] = {
				columnId,
				columnItems
			};
		}
		this.form.updateValueForm('columns', columns);
	}
	getOptions = (currentColumnId) => {
		const columns = this.form.getValueInputForm('columns');
		let columnsVariants = this.columnsVariants.filter((columnVariant) => {
			let filter = true;
			Object.keys(columns).forEach((column) => {
				if(columnVariant.value !== "" && columnVariant.value == column && columns[column].columnId != currentColumnId){
					filter = false;
				}
			});
			return filter;
		});
		return columnsVariants;
	}
	getCountColumns () {
		return this.columns.length;
	}
	filterIsChecked(isShowAll) {
		if(isShowAll && !this.showAll){
			return "csv_step-2-form__select-deselect--unselect"
		}
		if(!isShowAll && this.showAll){
			return "csv_step-2-form__select-deselect--unselect"
		}
		return "";
	}
	onToggleRemoveHeaders = () => {
		const checked = this.form.getValueInputForm('remove_header');
		this.form.updateValueForm("remove_header", !checked);
	}
	onChangeDelimiter = (value) => {
		this.fillColumns(value);
		this.form.updateValuesForm([
			{
				nameInput: "columns",
				valueInput: {},
			},
			{
				nameInput: "delimiter",
				valueInput: value,
			},
		]);
	}
	getDelimiters = () => {
		return this.props.delimiters;
	}
	renderColumns() {
		if(this.columns.length == 0 || (this.columns.length == 1 && (!this.columns.columnItems || this.columns.columnItems.length == 1) )) {
			return (
			<div className="list-step2__error">
				{this.$t("The columns have wrong format or empty. Please try change delimiter and see result.")}
			</div>
			)
		}
		return this.columns.map((columnItems, index) => {
			if(!this.showAll) {
				if(this.getValueSelect(this.getColumnId(index)) !== ""){
					return null;
				}
			}
			return (
			<ListStep2Item
				index={index}
				steps={this.steps}
				key={this.getColumnId(index)}
				columnId = {this.getColumnId(index)}
				options = {this.getOptions(this.getColumnId(index))}
				value = {this.getValueSelect(this.getColumnId(index))}
				onChange = {this.changeValue}
				columnItems={columnItems}
				disableHeader={this.form.getValueInputForm('remove_header')}
			/>)
		});
	}
	render() {
		return (
			<>
				<div className="list-step2__csv-panel">
					<CountWithLabel
						label={this.$t("CSV Columns")}
						count={this.getCountColumns()}
					/>
					<div className="list-step2__csv-panel--right">
						<div className="csv_step-2-form__select-deselect">
							<span onClick={this._showAll} className={this.filterIsChecked(true)}>{this.$t("Show all")}</span>・<span onClick={this.showUnmatched} className={this.filterIsChecked(false)}>{this.$t("Show unmatched")}</span>
						</div>
					</div>
				</div>
				<div className="list-step2__csv-panel2">
					<CheckBoxLabeled
						checked={this.form.getValueInputForm('remove_header')}
						onToggle={this.onToggleRemoveHeaders}
						label={this.$t("Remove header")}
					/>
					<SelectSmall
						style={{width: "116px"}}
						value={this.form.getValueInputForm('delimiter')}
						onChange={this.onChangeDelimiter}
						label={this.$t("Delimiter")}
						items={this.getDelimiters()}
					/>
				</div>
				<div className="list-step2">
						<div className="list-step2__wrapper">
							{this.renderColumns()}
						</div>
				</div>
			</>
		);
	}
}
ListStep2Component.propTypes = {
	formAPI: PropTypes.object.isRequired,
	stepsAPI: PropTypes.object.isRequired,
	columnsVariants: PropTypes.array.isRequired,
	delimiters: PropTypes.array.isRequired,
}
export const ListStep2 = withTranslation()(ListStep2Component)
