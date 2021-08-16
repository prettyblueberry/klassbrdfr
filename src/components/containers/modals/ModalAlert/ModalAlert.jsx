import * as React from "react";
import { withTranslation } from 'react-i18next';
import {Modal,Button} from "react-bootstrap";
import "./ModalAlert.scss";

class ModalAlertComponent extends React.Component {
  static $t;
  static i18n;
  constructor(props) {
		super(props);
		this.$t  = this.props.t;
    this.i18n = this.props.i18n;
    this.modal = this.props.modal;
    this.state={
      show:true || this.props.show,
    }
    this.onClick = ()=>{

      this.setState({
        show:false
      },()=>{
        }
      );
    }
  }

  componentDidMount(){



  }

  render() {
    return (

        <>
        {this.state.show  && <div className={this.state.show ? "fade modal-backdrop show" : "fade modal-backdrop"}  aria-hidden="true" />}

        <Modal show={this.state.show} className="modal-alert" centered backdrop={false} onExited={

            () => {


                  this.modal.onClose()
            }

        }>


        {this.modal.title &&
        <Modal.Header>
          <Modal.Title >{this.modal.title}</Modal.Title>
        </Modal.Header>
        }
        <Modal.Body>{this.modal.message}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={this.onClick}>
            {this.$t("Ok")}
          </Button>
        </Modal.Footer>
      </Modal>
      </>
    )
  }
}
export const ModalAlert = withTranslation()(ModalAlertComponent)
