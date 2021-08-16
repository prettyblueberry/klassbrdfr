import * as React from "react";
import { withTranslation } from 'react-i18next';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
} from 'recharts';
import * as d3 from "d3";
import PropTypes from 'prop-types';
import "./PublicationsShared.scss";
import {KRColor} from "@klassroom/klassroom-sdk-js";

class PublicationsSharedComponent extends React.Component {
	static translate;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;

	}
	componentDidMount(){
		this.doChart();
	}
	getData(){
    var data = []
    if(this.props.documents.message){
      data.push({title:this.$t("Messages"), value:this.props.documents.message, color:KRColor.krRed});
    }
    if(this.props.documents.image){
      data.push({title:this.$t("Photos"), value:this.props.documents.image, color:KRColor.krOrange});
    }
    if(this.props.documents.video){
      data.push({title:this.$t("Videos"), value:this.props.documents.video, color:KRColor.krYellow});
    }
    if(this.props.documents.audio){
      data.push({title:this.$t("Audios"), value:this.props.documents.audio, color:KRColor.krNeonGreen});
    }
    if(this.props.documents.document){
      data.push({title:this.$t("Documents"), value:this.props.documents.document, color:KRColor.krGreen});
    }
    if(this.props.documents.poll){
      data.push({title:this.$t("Polls"), value:this.props.documents.poll, color:KRColor.krTurquoise});
    }
    if(this.props.documents.checklist){
      data.push({title:this.$t("Lists"), value:this.props.documents.checklist, color:KRColor.krBlue});
    }
    if(this.props.documents.event){
      data.push({title:this.$t("Events"), value:this.props.documents.event, color:KRColor.krIndigo});
    }
    if(this.props.documents.location){
      data.push({title:this.$t("Locations"), value:this.props.documents.location, color:KRColor.krPurple});
    }
    if(this.props.documents.homework){
      data.push({title:this.$t("Homework"), value:this.props.documents.homework, color:KRColor.krBrown});
    }

    data.sort((a,b)=>{
      return a.value > b.value ? -1 : 1;
    })

    return data;

	}
	getTotalSum = () => {
		let total_time = 0;
		this.getData().forEach((doc) => {
			total_time+=doc.value;
		});
		return total_time;
	}
	doChart() {
			const chart = d3.select("#chart");
			if(chart){
				let data = this.getData().map((doc)=> doc.value);
				//data.sort(d3.descending());
				let width = "100%";
				let	height = 39;
				let	goal = 600;
				let	perc_so_far = 0;
				let bar_x = 0;
				let total_time = this.getTotalSum();

				chart.attr("width", "100%");
				chart.attr("height", height);
				bar_x = 0;
				let chart_width = parseInt(chart.style("width"));

				let bar = chart.selectAll("g")
					.data(data)
					.enter().append("g");
				bar.append("rect")
					.attr("width", function(d) { return ((d/total_time)*100) + "%"; } )
					.attr("x", function(d) {
						let prev_perc = perc_so_far;
						let this_perc = 100*(d/total_time);
						perc_so_far = perc_so_far + this_perc;
						return prev_perc + "%";
					})
					.attr("height", height)
					.attr("fill",  (d, index) =>{
						return this.getData().map((doc)=> doc.color)[index];
					} );

				d3.select(window).on('resize', resize);

				function resize () {
					let width = parseInt(chart.style("width"));
					//console.log(width);
					//console.log(bar);
				}
			}
	}
	render() {
		return (
			<div className="publications-shared">

				<div className="publications-shared__top-panel">
					<div className="publications-shared__top-panel-left">
						<div className="publications-shared-h1">{this.$t("Publications shared")}</div>
						<div className="publications-shared-h2">{this.getTotalSum()}</div>
					</div>
					<div className="publications-shared__top-panel-right">

					</div>
				</div>

				<div className="publications-shared__body">
					<svg className="publications-shared__body-chart" id="chart"></svg>

					<div className="publications-shared__markers">

            { this.getData().map((doc,index) =>{


                return (

                  <div key={index} className="publications-shared__marker publications-shared__marker--medias">
                    <div className="publications-shared__marker-h1"><span style={{color:doc.color}}>●</span> {doc.title}</div>
                    <div className="publications-shared__marker-h2 " style={{color:doc.color}}>{doc.value}</div>
                  </div>

                )

            })


            }





					</div>
				</div>


			</div>
		);
	}
}
PublicationsSharedComponent.propTypes = {

}
export const PublicationsShared = withTranslation()(PublicationsSharedComponent)
