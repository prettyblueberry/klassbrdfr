import * as React from "react";
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import "./StudentsNumber.scss";

class StudentsNumberComponent extends React.Component {
	static translate;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
	}
	render() {
		return (
			<div className="students-number">

				<div className="students-number-left">
					<div className="students-number-h1">{this.$t("Students")}</div>
					<div className="students-number-h2">{this.props.statistic.number}</div>
				</div>

				<div className="students-number-right">

					<div className="students-number__user">
						<img src="https://d255ekdjj05c2f.cloudfront.net/asset/klassroom/Profile/Students/S00JLAZTJGK/7f6547b716573ecd6e87fb0.thumb_a.jpg"/>
					</div>
					<div className="students-number__user">
						<img src="https://d357z0wweac9e6.cloudfront.net/avatars/11.png"/>
					</div>



				</div>

			</div>
		);
	}
}
StudentsNumberComponent.propTypes = {
	statistic: PropTypes.object.isRequired,
}
export const StudentsNumber = withTranslation()(StudentsNumberComponent)
