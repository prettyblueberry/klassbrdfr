import * as React from "react";
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import "./ExamplePresentational.scss";

class ExamplePresentationalComponent extends React.Component {
	static translate;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
	}
	onClick = () => {
		this.props.onClick(this.props.item);
	}
	render() {
		return (
			<p onClick={this.onClick}>{this.props.item.title}</p>
		);
	}
}
ExamplePresentationalComponent.propTypes = {

}
export const ExamplePresentational = withTranslation()(ExamplePresentationalComponent)