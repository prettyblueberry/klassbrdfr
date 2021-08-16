import {uniqueId} from "utils";
import { withTranslation } from 'react-i18next';

export class AttachmentFile {
  id = null;
  editor = null;
  base64 = null;
  thumb = null;
  typeFile = "*";
  type = "other";
  typeEntity = "file";
  fileName = "";
  fileSize = "";
  loadingPercent = 0;
  observers = [];
  convertFileToBase64 = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.base64 = reader.result;
      this.updateEditor();
      this.setLoading();
    };
    reader.onerror = (error) => {
      console.log('Error: ', error);
    };
  }
  getFileType(file) {
    if(file.type.indexOf('image') > -1){
      this.type = "image";
    }
    if(file.type.indexOf('video') > -1){
      this.type = "video";
    }
    if(file.type.indexOf('audio') > -1){
      this.type = "audio";
    }
    this.typeFile = file.type;
  }
  constructor(editor, file, i) {
    this.id = uniqueId();
    this.editor = editor;
    this.indexAttachment = i;
    this.fileName = file.name;
    this.fileSize = file.size;
    this.getFileType(file);
    this.convertFileToBase64(file);
    // observer pattern
    this.observers = {};
  }
  // observer pattern
  // working by id component
  // need unsetObserver in component before un-mount. 
  setObserver = (listener, idComponent) => {
    this.observers[idComponent] = listener;
  }
  unsetObserver = (idComponent) => {
    delete this.observers[idComponent];
  }

  broadcast = (data, typeEvent) => {
    this.observers.forEach(subscriber => subscriber(data, typeEvent))
  }
   // observer pattern [END]

  delete = () => {
    this.editor.deleteAttachment(this.id);
  }
  getBase64 = () => {
    return this.base64;
  }
  updateEditor(){
    this.editor.forceUpdate();
  }
  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	getRandomTime() {
		const times = [
      100,
      200,
      300,
      400,
      500,
		];
		return times[this.getRandomInt(0, times.length - 1)];
	}
  setLoading() {
    const element = document.querySelector("#editor-message__file"+this.indexAttachment+" .progress-bar");
    let interval = null;
    if(element){
      interval = setInterval(() => {
        this.loadingPercent += 5;
        if(this.loadingPercent >= 100){
          this.loadingPercent = 100;
          this.updateEditor();
          // this event when all operations for image finished
          this.broadcast(this, 'fileUploaded');
          clearInterval(interval);
        } else {
          //element.style.width = this.loadingPercent+"px";
          this.updateEditor();
        }
      }, this.getRandomTime())
    }
  }
}