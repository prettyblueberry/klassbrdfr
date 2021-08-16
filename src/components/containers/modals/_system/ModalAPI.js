import * as React from "react";
import { withTranslation } from 'react-i18next';
import {
  ModalMembers,
  ModalAlert,
  ModalChooseAvatar,
  ModalConfirm,
  ModalDialog,
  ModalEditClassroom
} from "../";
import "./ModalAPI.scss";
import {KRUtils} from "@klassroom/klassroom-sdk-js";
import {TextInput2} from "components/presentational";
export const ModalContext = React.createContext(
  {
    showModal: () => {},
    removeModals: () => {},
    addModal: () => {},
    hideModal: () => {},
    modals:[],
    components:[],
  }
);
export const ModalSystem = ModalContext.Consumer;

class ModalProviderComponent extends React.Component {
  static $t;
  static i18n;

  constructor(props) {
    super(props);
    this.$t  = this.props.t;
    this.i18n = this.props.i18n;

    this.opts = {};
    this.modals=[];
    this.components=[];
    this.state = {
      modalId: null,
      show:false,
      modals:[],
    };
  }

  submitCallback = () => {}

  alert = (title,message,callback) => {
    var params = {
        title:title,
        message:message,
        callback:callback
    };
    const opts = params;

    let component = <ModalAlert opts={opts} key={KRUtils.uniqid("MW")}/>;

    opts.index = this.modals.length;
    this.modals.push(component);

    opts.hideModal = ()=>{
        this.components[opts.index].hideModal();
    };
    this.setState({
      modalId:null,
    })
    this.forceUpdate();

    return opts;

  }


  prompt = (message,callback) => {

    var promptInputValue = null;
    const dlg =  this.dialog({
        closeButton:false,
        message:
          <div>
            <div>{message}</div>
            <br/>
            <TextInput2
								onChange={(value)=>{
                    promptInputValue = value;
                }}

								label={null}
							/>
          </div>
          ,
        buttons:{
          ok:{
            className:"primary",
            label:this.$t("Ok"),
            callback:()=>{
                if(callback && promptInputValue) callback(promptInputValue);
            }
          },
          cancel:{
            className:"secondary",
            label:this.$t("Cancel"),
            callback:()=>{
                  dlg.hideModal();
            }
          }
        }
    });

    return dlg;

  }

  confirm = (...theArgs) => {
    var params = {};
   if(theArgs.length == 1){
      params = theArgs[0];
   }else{
    params = {
         message:theArgs[0],
         callback:theArgs[1],
     };
     if(theArgs[2]){
       params.buttons= {
         confirm: {
             label: this.$t('Yes'),
             variant: 'primary'
         },
         cancel: {
             label: this.$t('No'),
             variant: 'secondary'
         }
       };
     }
   }
   const opts = params;
   opts.show = true;

   let component = <ModalConfirm opts={opts} key={KRUtils.uniqid("MC")} />;

   opts.index = this.modals.length;
   this.modals.push(component);

   opts.hideModal = ()=>{
       this.components[opts.index].hideModal();
   };
   this.setState({
     modalId:null,
   })
   this.forceUpdate();

   return opts;
  }


  dialog = (...theArgs) => {
    var params = {};
    params = theArgs[0];

    const opts = params;
    opts.show = true;

    let component = <ModalDialog opts={opts} key={KRUtils.uniqid("MD")} />;

    opts.index = this.modals.length;
    this.modals.push(component);

    opts.hideModal = ()=>{
        this.components[opts.index].hideModal();
    };

    this.setState({
      modalId: null,
    })
    this.forceUpdate();

    return opts;
  }

  showModal = (modalId, opts = {}) => {
    this.opts = opts;
    this.setState({
      modalId:modalId,
      show: true,
    }
    );
  }

  removeModals = (index)=>{
    this.components.splice(index,this.components.length-index);
    this.modals.splice(index,this.modals.length-index);
  }

  addModal = (index,modal)=>{
    this.components[index]=modal;
  }

  hideModal = (callbackHide = () => {}) => {
    let index = this.modals.indexOf(this);
    this.setState({
      show: false,
    }, ()=>{
      if(callbackHide) callbackHide();
    });
  }
  // connect form here
  renderModal() {
    switch(this.state.modalId) {
      case "members":
        return <ModalMembers show={this.state.show} opts={this.opts} />;
      case "chooseAvatar":
        return <ModalChooseAvatar opts={this.opts} />;
      case "confirm":
          return <ModalConfirm opts={this.opts} />;
      case "dialog":
          return <ModalDialog opts={this.opts} />;
      case "alert":
        return <ModalAlert opts={this.opts}  />;
      case "edit_classroom":
        return <ModalEditClassroom opts={this.opts}/>
      default:
        return null;
    }
  }

  renderSingleModal() {

    return (

      <>

      </>

    );



  }
  render() {
    const { children } = this.props;
    if(this.state.modalId){
      return (
      <>
      <ModalContext.Provider
        value={{
          showModal: this.showModal,
          hideModal: this.hideModal,
          removeModals: this.removeModals,
          addModal: this.addModal,
          modalAPI: this,
          modalId:this.state.modalId,
          show: this.state.show,
          components: this.components,
          modals: this.modals,

        }}
      >
      {this.renderModal()}
      {children}
    </ModalContext.Provider>
      </>
    )
    }else{
      return (
      <>
      <ModalContext.Provider
        value={{
          showModal: this.showModal,
          hideModal: this.hideModal,
          removeModals: this.removeModals,
          addModal: this.addModal,
          modalAPI: this,
          modalId:this.state.modalId,
          show: this.state.show,
          components: this.components,
          modals: this.modals,

        }}
      >
      {this.modals.map((modal,index)=>{

          return modal;
      })}
      
      {children}

    </ModalContext.Provider>
      </>
    )
    }

  }
}

export const ModalProvider = withTranslation()(ModalProviderComponent)
