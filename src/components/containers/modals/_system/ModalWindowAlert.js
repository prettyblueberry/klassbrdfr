import * as React from "react";
import {KRUtils,KRClient} from "@klassroom/klassroom-sdk-js";

import {
  ModalAlert
} from "../";
import {
  ModalWindow
} from "./ModalWindow";



export class ModalWindowAlert extends ModalWindow {
  constructor(opts = {}) {

    super(opts)

    this.id =  opts.id || KRUtils.uniqid()
    this.title =  opts.title || ""
    this.type =   "alert"
    this.message = opts.message || ""
    this.callback = opts.callback
    this.onClose = () => {
        this.hide(opts.callback)
    }
  }




  render(){

      return <ModalAlert modal={this} key={this.id}/>

  }

}
