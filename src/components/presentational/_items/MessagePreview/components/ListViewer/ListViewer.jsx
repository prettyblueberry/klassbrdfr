import * as React from "react";
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import "./ListViewer.scss";

class ListViewerComponent extends React.Component {
	static translate;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
	}
	getData(){
		return this.props.list;
	}
	renderOptions(){
		const options = this.getData().items;
		return options.map((option, index) => {
			return (
			<div className="list-viewer__option" key={"list-viewer" + index}>
				<div className="list-viewer__index">{(index + 1)}</div>
				<div className="list-viewer__value">{option}</div>
			</div>)
		});
	}
	render() {
		return (
			<div className="list-viewer">
				<div className="list-viewer__header">{this.getData().title}</div>
				<div className="list-viewer__options">
					{this.renderOptions()}
				</div>
			</div>
		);
	}
}
ListViewerComponent.propTypes = {
	list: PropTypes.object.isRequired,
}
export const ListViewer = withTranslation()(ListViewerComponent)
