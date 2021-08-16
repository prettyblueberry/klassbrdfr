import * as React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import {AuthService} from "services";
import './SplashContainer.scss';
import {KRClient,KlassroomConfig} from "@klassroom/klassroom-sdk-js";

class SplashContainerComponent extends React.Component {
  constructor(props) {
    super(props);

    this.i18n = this.props.i18n;

    this.i18n.changeLanguage(KlassroomConfig.CULTURE);

  }


  render() {
    return (
      <div className="app-pages">
        <div className="splash-page">
          <div className="logo">
            <img src="/public/img/klassboard_logo.png" alt="logo" />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  return {}
};

const mapDispatchToProps = function(dispatch) {
  return {};
};

export const SplashContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslation()(SplashContainerComponent));
