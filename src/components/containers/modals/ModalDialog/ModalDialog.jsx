import * as React from "react";
import { withTranslation } from 'react-i18next';
import {Modal,Button} from "react-bootstrap";
import {BackButton} from "../../../presentational";
import PropTypes from 'prop-types';
import { ModalContext } from '../';
import "./ModalDialog.scss";
import _ from "lodash";
import {KRUtils} from "@klassroom/klassroom-sdk-js";

class ModalDialogComponent extends React.Component {
  static $t;
  static i18n;
  constructor(props) {
		super(props);
		this.$t  = this.props.t;
    this.i18n = this.props.i18n;

    this.state={
      show:true,
    }

    this._defaultOpts = {
        title: null,
        message: null,
        onEscape:() => {},
        onHide:() => {},
        show:true,
        backdrop:true,
        closeButton:true,
        backButton: false,
        backButtonAction: null,
        calssName:null,
        size:null,
        centerVerical:false,
        swapButtonOrder:false,
        updateTitle: this.updateTitle,
        enableBackButton: this.enableBackButton,
        disableBackButton: this.disableBackButton,
        updateOptions: this.updateOptions,
        modal: this,
        buttons: {}
    }
    var pOpts = _.cloneDeep(this.props.opts);

    this.opts = _.defaultsDeep(pOpts,this._defaultOpts );

    this.onClose = ()=>{
        this.hideModal(() =>{

        })
    }

    this.hideModal = ()=>{

      this.setState({
        show:false
      },()=>{
        }
      );
    }
  }

  componentDidMount(){
    this.state={
      show:true,
    }
  }
  updateTitle = (title) => {
    this.opts.title = title;
    this.forceUpdate();
  }
  enableBackButton = (backButtonAction) => {
    if(typeof backButtonAction == "function"){
      this.opts.backButton = true;
      this.opts.backButtonAction = backButtonAction;
      this.forceUpdate();
    }
  }
  disableBackButton = () => {
    this.opts.backButton = false;
    this.opts.backButtonAction = null;
    this.forceUpdate();
  }
  onBack = () => {
    if(typeof this.opts.backButtonAction == "function") {
      this.opts.backButtonAction();
    }
  }
  /**
   * array [
   *  {
   *    optionName: string,
   *    optionValue: any,
   *  }
   * ]
   */
  updateOptions = (options) => {
    options.forEach((option) => {
      this.opts[option.optionName] = option.optionValue;
    })
    this.forceUpdate();
  }

  render() {
    //let pOpts = _.cloneDeep(this.props.opts);
    //this.opts = _.defaultsDeep(pOpts,this._defaultOpts );

    return (
      <ModalContext.Consumer>
      {({addModal,removeModals}) => {
        if(this.state.show){
          addModal(this.props.opts.index,this);
        }else{
          removeModals(this.props.opts.index);
        }
      return (
        <>
        {this.state.show  && <div className={this.state.show ? "fade modal-backdrop show" : "fade modal-backdrop"}  aria-hidden="true" />}
        <Modal show={this.state.show} dialogClassName={this.opts.dialogClassName || null} className="modal-dlg" centered backdrop={false} onHide={this.onClose}>
        <Modal.Header closeButton={this.opts.closeButton} >
          <div className="modal__back-button">{this.opts.backButton && <BackButton onClick={this.onBack}/>}</div>
          {this.opts.title && <div className="modal____h1">{this.opts.title}</div>}
          <div></div>
        </Modal.Header>
        <Modal.Body>{this.opts.message}</Modal.Body>
        {Object.keys(this.opts.buttons).length > 0 &&
        <Modal.Footer>
            {Object.keys(this.opts.buttons).reverse().map((key,index) => {

              return (
              <Button variant={this.opts.buttons[key].className} onClick={this.opts.buttons[key].callback} key={index}>
                {this.opts.buttons[key].label}
              </Button>
              )
              })
            }
        </Modal.Footer>
      }
      </Modal>
      </>
    )} }
      </ModalContext.Consumer>
    )
  }
}
ModalDialogComponent.propTypes = {
	opts: PropTypes.object.isRequired,
}

export const ModalDialog = withTranslation()(ModalDialogComponent)
