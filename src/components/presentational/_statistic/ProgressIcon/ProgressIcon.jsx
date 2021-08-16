import * as React from "react";
import { withTranslation } from 'react-i18next';
import classnames from "classnames";
import PropTypes from 'prop-types';
import * as d3 from "d3";
import "./ProgressIcon.scss";
import "./colors.scss";

class ProgressIconComponent extends React.Component {
	static translate;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
		this.refCircle = React.createRef();
		this.pieValue = null;
	}
	componentDidMount() {
		setTimeout(() => {
			this.drawDonutChart(this.props.percent, 80);
		}, 500);
	}
	calcPercent(percent) {
		return [percent, 100-percent];
	};
	drawDonutChart(percent, width) {
		let element = this.refCircle.current;
		const height = width;
		const duration= 300;
		const transition = 300;

		let dataset = {
					lower: this.calcPercent(0),
					upper: this.calcPercent(percent)
				},
				radius = width / 2,
				pie = d3.pie().sort(null);

		let arc = d3.arc()
					.innerRadius(radius - 6)
					.outerRadius(radius);

		let svg = d3.select(element).append("svg")
					.attr("width", width)
					.attr("height", height)
					.append("g")
					.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

		let path = svg.selectAll("path")
					.data(pie(dataset.lower))
					.enter().append("path")
					.attr("class", (d, i) => { return "color" + i })
					.attr("d", arc)
					.each((d) => { this.pieValue = d; }); // store the initial values

		let progress = 0;

		path = path.data(pie(dataset.upper)); // update the data
		path.transition().duration(duration).attrTween("d", (a) => {
			let i  = d3.interpolate(this.pieValue, a);
			let i2 = d3.interpolate(progress, percent)
			this.pieValue = i(0);
			return (t) => {
				i2(t);
				return arc(i(t));
			};
		});
	};

	getClassIcon() {
		let classes = {
			"icon": true
		}
		if(this.props.icon){
			classes['klassicon-'+this.props.icon] = true;
		}
		return classnames(classes);
	}
	getRootClass() {
		let classes = {
			"round-icon": true,
			"progress-icon": true
		}
		classes[this.props.color] = true;
		if(this.props.className){
			classes[this.props.className] = true;
		}
		return classnames(classes);
	}
	render() {
		return (
			<div className={this.getRootClass()}>
				<div ref={this.refCircle} className="progress-icon__pie"></div>
				<div className={this.getClassIcon()}></div>
				<div className="icon klassicon-link"></div>
			</div>
		);
	}
}
ProgressIconComponent.propTypes = {
	style: PropTypes.object,
	color: PropTypes.string,
	icon: PropTypes.string,
	char: PropTypes.string,
	percent: PropTypes.number.isRequired,
}
export const ProgressIcon = withTranslation()(ProgressIconComponent)
