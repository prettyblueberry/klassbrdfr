import * as React from "react";
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
} from 'recharts';
import "./StatsLine.scss";

class StatsLineComponent extends React.Component {
	static translate;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
		this.data = this.props.data || [];
		this.total = 0;

	}

  renderTooltip = ({active, payload, label} )=>{
    if (active && label) {
    return (
      <div className="custom-tooltip" style={{background:"white", padding:20, border:"1px solid black"}}>
        <p className="label">{label}</p>
        <p className="label">{this.props.label}: {payload[0].value} {this.props.unit || ""}</p>

      </div>
    );
  }

  return null;
};


	render() {

		return (
			<div className="percent-of-views">
				<div className="percent-of-views__top-block">
					<div className="percent-of-views__left">
						<div className="percent-of-views__h1">{this.props.title}</div>
						<div className="percent-of-views__h2">{this.props.total} {this.props.unit || ""}</div>
					</div>
					<div className="percent-of-views__right">

					</div>
				</div>
				<div className="percent-of-views__charts">
					<ResponsiveContainer height={150} width='100%'>
						<AreaChart
								data={this.data}
								margin={{
									top: 10, right: 0, left: 0, bottom: 0,
								}}
							>
							<XAxis padding={{ left: 20, right: 20 }} dataKey="name" axisLine={false} tickLine={false} />
							<Tooltip content={this.renderTooltip} />
							<Area activeDot={{fill: this.props.color, stroke: '#fff', strokeWidth: 4 }} baseLine={10} type="monotone" dataKey="value" strokeWidth="2px" stroke={this.props.color} fill="#e8f4ff" />
						</AreaChart>
					</ResponsiveContainer>
				</div>
			</div>
		);
	}
}
StatsLineComponent.propTypes = {

}
export const StatsLine = withTranslation()(StatsLineComponent)
