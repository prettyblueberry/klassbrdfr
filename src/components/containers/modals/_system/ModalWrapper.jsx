import * as React from "react";
import { withTranslation } from 'react-i18next';
import {ModalManager} from "./ModalManager";
import {KRClient} from "@klassroom/klassroom-sdk-js";

class ModalWrapperComponent extends React.Component {
  static $t;
  static i18n;

  constructor(props) {
    super(props);
    this.$t  = this.props.t;
    this.i18n = this.props.i18n;

  }

  componentDidMount(){
    KRClient.getInstance().addListener(this, (event, options)=>{
        if(event == "refreshModals"){
            this.forceUpdate()
        }
    })
  }

  componentWillUnmount(){
      KRClient.getInstance().removeListener(this)
  }

  render() {

    return (
      <div>
        {ModalManager.getInstance().renderModals()}
      </div>
    )

  }
}

export const ModalWrapper = withTranslation()(ModalWrapperComponent)
