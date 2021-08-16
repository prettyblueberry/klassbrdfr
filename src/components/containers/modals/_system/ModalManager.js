import * as React from "react";
import {KRUtils,KRClient} from "@klassroom/klassroom-sdk-js";

import {
  ModalAlert
} from "../";


import {
  ModalWindowAlert
} from "./ModalWindowAlert";



export class ModalManager {
  constructor(opts = {}) {
    const instance = this.constructor.instance;
    if (instance) {
      return instance;
    }

    this.constructor.instance = this;

    this.modals = []
    this.components = []

  }


  alert(title,message,callback) {




    var params = {
        title:title,
        message:message,
        callback:callback
    };

    let modal = new ModalWindowAlert(params)
    this.showModal(modal);

    return modal

  }

  showModal(modal){

      this.modals.push(modal);
      KRClient.getInstance().triggerEvent("refreshModals")

  }

  hideModal(modalID, callback){
      const index = this.modals.findIndex((modal) => modal.id == modalID)
       this.modals.splice(index,1);
      if(index>=0){
          KRClient.getInstance().triggerEvent("refreshModals")
          if(callback) callback()
      }
  }

  renderModals(){

      return (
        <div>
        {this.modals.map((modal) => {
            return modal.render();
        })}
        </div>
      )


  }

  static getInstance(opts = {}) {
    return new ModalManager(opts);
  }
}
