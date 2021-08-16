import * as React from "react";
import {connect} from "react-redux";
import { Modal } from 'react-bootstrap';
import { withTranslation } from 'react-i18next';
import "./Loader.scss";

import store from "../../../store/store";

import {LoaderActions} from '../../../store/actions'

window.showLoader = (msg) => store.dispatch( LoaderActions.show(msg));
window.hideLoader = () => store.dispatch( LoaderActions.hide());


class LoaderComponent extends React.Component {
	static translate;
	static i18n;
	constructor(props) {
		super(props);
		this.$t  = this.props.t;
		this.i18n = this.props.i18n;

	}

	render() {

    if(!this.props.isShowing){
      return  (
        <div></div>
      )
    }else{
      return (
        <Modal  show={true} backdrop={false} centered className="k-loader">

          <Modal.Body className="shadow" >
              <div className="k-loading-popup"><img src="/public/k-img/unicorns/hero.svg" height="100"/><p id="k-loading-message">{this.props.msg}</p></div>
          </Modal.Body>

        </Modal>

  		);
    }

	}
}

const mapStateToProps = state => {
  let r = {isShowing : state.LoaderReducer.isShowing, msg: state.LoaderReducer.msg};

  return r;
}

export const Loader = connect(mapStateToProps)(LoaderComponent);
