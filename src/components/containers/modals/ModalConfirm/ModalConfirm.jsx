import * as React from "react";
import { withTranslation } from 'react-i18next';
import {Modal,Button} from "react-bootstrap";
import { ModalContext } from '../';
import "./ModalConfirm.scss";
import _ from "lodash";

class ModalConfirmComponent extends React.Component {
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

        message: null,
        buttons: {
          confirm: {
              label: this.$t('Ok'),
              variant: 'primary'
          },
          cancel: {
              label: this.$t('Cancel'),
              variant: 'secondary'
          }
        },
        callback:(value) =>{}
    }
    var pOpts = _.cloneDeep(this.props.opts);
    this.opts = _.defaultsDeep(pOpts,this._defaultOpts );


    this.onCancelClick = ()=>{
        this.hideModal(() =>{
          if(this.opts.callback){
            this.opts.callback(false);
          }
        })
    }

    this.onConfirmClick = ()=>{
        this.hideModal(() =>{
          if(this.opts.callback){
            this.opts.callback(true);
          }
        })
    }

    this.hideModal = (callback)=>{

      this.setState({
        show:false
      },()=>{
          if(callback) callback()
        }
      );

    }
  }


  render() {

    var pOpts = _.cloneDeep(this.props.opts);
    this.opts = _.defaultsDeep(pOpts,this._defaultOpts );


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

        <Modal show={this.state.show} className="modal-confirm" centered backdrop={false}>
        {this.opts.title &&
        <Modal.Header>
          <Modal.Title >{this.opts.title}</Modal.Title>
        </Modal.Header>
        }
        <Modal.Body>{this.opts.message}</Modal.Body>
        <Modal.Footer>
          <Button variant={this.opts.buttons.cancel.variant} onClick={this.onCancelClick}>
            {this.opts.buttons.cancel.label}
          </Button>
          <Button variant={this.opts.buttons.confirm.variant} onClick={this.onConfirmClick}>
            {this.opts.buttons.confirm.label}
          </Button>
        </Modal.Footer>
      </Modal>
      </>


    )} }
      </ModalContext.Consumer>
    )
  }
}
export const ModalConfirm = withTranslation()(ModalConfirmComponent)
