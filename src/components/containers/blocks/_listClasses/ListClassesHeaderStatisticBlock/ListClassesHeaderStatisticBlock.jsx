import * as React from "react";
import { withTranslation } from 'react-i18next';
import "./ListClassesHeaderStatisticBlock.scss";
import {KRClient} from "@klassroom/klassroom-sdk-js";

class ListClassesHeaderStatisticBlockComponent extends React.Component {
	static translate;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
	}
	render() {
		return (
			<div className="list-classes-header-statistic">
				<div className="list-classes-header-statistic__left">
					<div className="list-classes-header-statistic__h1" dangerouslySetInnerHTML={{__html: this.$t('<b>Klassboard</b> Classes')}}></div>
					<div className="list-classes-header-statistic__statistic">
						<span className="list-classes-header-statistic__count">{Object.values(KRClient.getInstance().classrooms).length}</span> <span className="list-classes-header-statistic__h2" dangerouslySetInnerHTML={{__html: this.$t('<b>CREATED</b> CLASSES')}}></span>
					</div>
				</div>
				<div className="list-classes-header-statistic__center">
					<span></span>
				</div>
				<div className="list-classes-header-statistic__right">
					<div className="list-classes-header-statistic__h1" dangerouslySetInnerHTML={{__html: this.$t('<b>Klassroom</b> Classes')}}></div>
					<div className="list-classes-header-statistic__statistic">
						<span className="list-classes-header-statistic__count">{KRClient.getInstance().getLinkedKlassesCount()}</span> <span className="list-classes-header-statistic__h2" dangerouslySetInnerHTML={{__html: this.$t('<b>LINKED</b> CLASSES')}}></span>
					</div>
				</div>
			</div>
		);
	}
}
export const ListClassesHeaderStatisticBlock = withTranslation()(ListClassesHeaderStatisticBlockComponent)
