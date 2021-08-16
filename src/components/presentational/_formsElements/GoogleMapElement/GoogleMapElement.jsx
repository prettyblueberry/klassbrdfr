import * as React from "react";
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import "./GoogleMapElement.scss";

const mapStyles = {
  width: '100%',
  height: '100%'
};

class GoogleMapElementComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    var map;
    const scriptAPI = document.createElement("script");
    scriptAPI.setAttribute("src", "https://maps.googleapis.com/maps/api/js?key=AIzaSyAcNsNsS2UKx45XST6E3tlXieDLOt_6L_Q&callback=initMap");
    scriptAPI.setAttribute("async", true);
    scriptAPI.setAttribute("defer", true);
    document.body.append(scriptAPI);
    window.initMap = function() {
      map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 8
      });
    }
	}
	

	render() {
    return (
      <div id="map"></div>
    );
  }
}


export const GoogleMapElement =	GoogleMapElementComponent;