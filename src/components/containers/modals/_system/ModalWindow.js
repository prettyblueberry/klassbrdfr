import * as React from "react";
import {KRUtils} from "@klassroom/klassroom-sdk-js";
import {ModalManager} from "./ModalManager"




export class ModalWindow {
  constructor(opts = {}) {
    this.id =  opts.id || KRUtils.uniqid()
    this.title =  opts.title || ""
    this.type =   opts.type || "dialog"
    this.onClose = (callback) => {
        this.hide(callback)
    }
  }

  show(){
      this.render()
  }
  hide(callback){
    setTimeout(() => {
      ModalManager.getInstance().hideModal(this.id,callback)
    }, 50);

  }

  render(){
      return null
  }

}
