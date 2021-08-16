import * as React from "react";
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { UserIcon, CheckBox } from "presentational";
import "./RelativeUser.scss";
import {KRClient} from "@klassroom/klassroom-sdk-js";

class ParentToChildrenItemComponent extends React.Component {
	static translate;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
        this.i18n = this.props.i18n;
        
        //TODO
		
	}

	render() {
		return (
            <>
            </>
        )
	}
}
ParentToChildrenItemComponent.propTypes = {

}
export const ParentToChildrenItem = withTranslation()(ParentToChildrenItemComponent)
