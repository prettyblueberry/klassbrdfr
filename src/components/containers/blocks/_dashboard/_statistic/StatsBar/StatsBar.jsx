import * as React from "react";
import { withTranslation } from 'react-i18next';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,ResponsiveContainer
} from 'recharts';
import PropTypes from 'prop-types';
import "./StatsBar.scss";

class StatsBarComponent extends React.Component {
	static translate;
	static i18n;
	constructor(props) {
		/**
		 *
		 *    mon: 6,
    tue: 10,
    wed: 1,
    thu: 2,
    fri: 10,
    new: 2,
		 */
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
		this.data = this.props.data || [];

		this.state = {
			activeIndex: 0,
		}
	}

	componentDidMount(){
		const element = document.querySelector(".recharts-tooltip-cursor");

	}
	addBackground(index) {
		this.setState({
			activeIndex: index,
		});
  }

  getData() {




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
		const { activeIndex } = this.state;
		const activeItem = this.data[activeIndex];


		return (
			<div className="absent-students">
				<div className="absent-students__values">
					<div className="absent-students__values-left">
						<div className="absent-students__values-h1">{this.props.title}</div>
						<div className="absent-students__values-h2">{this.props.total} {this.props.unit || ""}</div>
					</div>
					<div className="absent-students__values-right">

					</div>
				</div>
        <ResponsiveContainer height={150} width='100%'>

        <BarChart  data={this.data}>
					<XAxis dataKey="name" axisLine={false} tickLine={false}/>
          <Tooltip content={this.renderTooltip} />

          <Bar dataKey="value" >
            {
                this.data.map((entry, index) => {
                  return <Cell onMouseEnter={() => this.addBackground(index)} cursor="pointer" fill={index === activeIndex ? this.props.color : this.props.color} key={`cell-${index}`}>
										{entry.value}
									</Cell>
								})
              }
          </Bar>
        </BarChart>
        </ResponsiveContainer>
			</div>
		);
	}
}
StatsBarComponent.propTypes = {

}
export const StatsBar = withTranslation()(StatsBarComponent)
