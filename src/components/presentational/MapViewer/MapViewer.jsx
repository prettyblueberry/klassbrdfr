import * as React from "react";
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import "./MapViewer.scss";

class MapViewerComponent extends React.Component {
	static translate;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;
		this.connectGoogleAPI();
		this.mapRef = React.createRef();
		this.map = null;
		this.marker = null;
	}
	componentDidMount() {
		setTimeout(() => {
			if(this.mapRef.current){
				this.map = new google.maps.Map(this.mapRef.current, {
					mapTypeControl: false,
					zoomControl: true,
					scaleControl: false,
					streetViewControl: false,
					rotateControl: false,
					fullscreenControl: false,
					center: {lat: this.props.lat || 0, lng: this.props.lng || 0},
					zoom: 8
				});
				this.setIcon(this.props.lat || 0, this.props.lng || 0);
			}
		}, 1000);
	}
	shouldComponentUpdate(nextProps) {
		//lat: 40.7127753, lng: -74.0059728
		if(nextProps.lat && nextProps.lng && (nextProps.lat !== this.props.lat || nextProps.lng !== this.props.lng) && this.map){
			this.map.setCenter({lat: nextProps.lat, lng: nextProps.lng});
			this.setIcon(nextProps.lat, nextProps.lng);
		}
		return true;
	}
	setIcon = (lat, lng) => {
		const icon = {
			url: "/public/images/Pin.svg",
			//anchor: new google.maps.Point(25,50),
			scaledSize: new google.maps.Size(80, 80)
		};

		this.marker = new google.maps.Marker({
			position: {lat, lng},
			icon,
			map: this.map,
		});
	}
	connectGoogleAPI(){
		if(!document.getElementById("google-api-script") && !window.google){
			let element = document.createElement("script");
			element.setAttribute("src", `https://maps.googleapis.com/maps/api/js?key=${"AIzaSyDx-n45-N6QveRzQ1KX8XbD5TWSMGUkrqs"}`);
			element.setAttribute("async", true);
			element.setAttribute("defer", true);
			element.setAttribute("id", "google-api-script");
			document.body.append(element);
		}
	}
	render() {
		return (
			<div style={this.props.style || {}} className="map-viewer">
				<div ref={this.mapRef} className="map-viewer__map"></div>
				<div className="map-viewer__address">

					<div>
						<div className="icon klassicon-location"></div>
					</div>
					<div>
						<div className="map-viewer__address-title">{this.props.title || ""}</div>
						<div className="map-viewer__address-adr">{this.props.address}</div>
					</div>

				</div>
			</div>
		);
	}
}
MapViewerComponent.propTypes = {
	style: PropTypes.object,
	lat: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	lng: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	title: PropTypes.string,
	address: PropTypes.string,
}
export const MapViewer = withTranslation()(MapViewerComponent)