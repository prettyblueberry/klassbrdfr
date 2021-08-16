import * as React from "react";
import { withTranslation } from 'react-i18next';
import * as d3 from "d3";
import classnames from "classnames";
import PropTypes from 'prop-types';
import "./CircleProgress.scss";

class CircleProgressComponent extends React.Component {
	static translate;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
		this.progressRef = React.createRef();
		this.progressBackRef = React.createRef(); 
	}
	componentDidMount() {
		if(this.progressRef.current){
			this.renderCircle(this.progressRef.current, this.props.level);
		}
		if(this.progressBackRef.current){
			this.renderCircle(this.progressBackRef.current, 9, true);
		}
	}
	renderCircle(element, level, isBack){
		const radius = 60,
		padding = 0,
		radians = 2 * Math.PI;
		let oneLevel = 0.080;
		if(level <= 3){
			oneLevel = 0.080;
		}
		if(level > 3 && level <= 5){
			oneLevel = 0.082;
		}
		if(level >= 6 && level < 9){
			oneLevel = 0.084;
		}
		if(level == 9){
			oneLevel = 0.085;
		}

		const dimension = (2 * radius) + (2 * padding),
				points = 50, percentage = oneLevel * level;

		const angle = d3.scaleLinear()
				.domain([0, points-1])
				.range([0, radians]);

		let last_point = null;

		const line = d3.radialLine()
				.curve(d3.curveBasis)
				
				.radius(radius)
				.angle((d, i) => {
					if(i < (points*percentage + 1)) {
						let _a = angle(i);
						last_point = angle(i);
						return angle(i);
					} else {
						return last_point;
					}
				});

		const svg = d3.select(element).append("svg")
				.attr("width", "200px")
				.attr("height", "200px")
		.append("g")

		let _circle = svg.append("path").datum(d3.range(points))
				.attr("class", "line")
				.attr("fill", "none")
		_circle.attr("stroke-dasharray", "27 7");
		_circle.attr("stroke-width", "10px");

		if(isBack){
			_circle.attr("stroke", "#f4f5f6");
		} else {
			if(level <= 3){
				_circle.attr("stroke", "#f15b5b");
			}
			if(level > 3 && level <= 6){
				_circle.attr("stroke", "#ffb53a");
			}
			if(level > 6){
				_circle.attr("stroke", "#46e297");
			}
		}
		_circle.attr("d", line).attr("transform", "translate(110,120) rotate(-140)");
	}
	
	getRootClass() {
		const level = this.props.level;
		let classes = {
			"circle-progress": true
		}
		if(level <= 3){
			classes["circle-progress__low"] = true;
		}
		if(level > 3 && level <= 6){
			classes["circle-progress__medium"] = true;
		}

		if(level > 6){
			classes["circle-progress__hight"] = true;
		}
		return classnames(classes);
	}
	render() {
		return (
			<div className={this.getRootClass()}>

				<div className="circle-progress__special">
					<div className="circle-progress__level">{this.props.level}</div>
					<div ref={this.progressRef} className="circle-progress__circle"></div>
					<div ref={this.progressBackRef} className="circle-progress__circle-back"></div>
				</div>

			</div>
		);
	}
}
CircleProgressComponent.propTypes = {
	level: PropTypes.number.isRequired,
}
export const CircleProgress = withTranslation()(CircleProgressComponent)