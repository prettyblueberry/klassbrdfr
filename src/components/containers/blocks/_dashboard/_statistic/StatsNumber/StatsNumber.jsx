import * as React from "react";
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import "./StatsNumber.scss";

class StatsNumberComponent extends React.Component {
	static translate;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;

	}
	render() {
		return (
			<div className="parents-number">

				<div className="parents-number-left">
					<div className="parents-number-h1">{this.props.title}</div>
					<div className="parents-number-h2">{this.props.number}</div>
				</div>

			{false &&	<div className="parents-number-right">

					<div className="parents-number__user">
						<img src="https://d255ekdjj05c2f.cloudfront.net/asset/klassroom/Profile/Students/S00JLAZTJGK/7f6547b716573ecd6e87fb0.thumb_a.jpg"/>
					</div>
					<div className="parents-number__user">
						<img src="https://d357z0wweac9e6.cloudfront.net/avatars/11.png"/>
					</div>



				</div>
			}
			</div>
		);
	}
}
StatsNumberComponent.propTypes = {

}
export const StatsNumber = withTranslation()(StatsNumberComponent)
