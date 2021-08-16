import {uniqueId} from "utils";
import { withTranslation } from 'react-i18next';

export class Attachment {
  id = null;
  editor = null;
  type = "non_file";
  loadingPercent = 100;
  indexAttachment = 0;
  typeEntity = "none_file"
  data = null;
  constructor(editor, data, type, i, id = null) {
    this.id = id || uniqueId();
    this.editor = editor;
    this.indexAttachment = i;
    this.data = data;
    this.type = type;
    this.updateData = this.updateData.bind(this);
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
  edit = () => {
    switch(this.type) {
      case("event"):
      this.editor.attachEvent(this.data, this.id);
      break;
      case("poll"):
      this.editor.attachPoll(this.data, this.id);
      break;
      case("location"):
      this.editor.attachLocation(this.data, this.id);
      break;
      case("event"):
      this.editor.attachEvent(this.data, this.id);
      case("list"):
      this.editor.attachList(this.data, this.id);
      break;
    }
  }
  updateData(data) {
    this.data = data;
  }
  updateEditor(){
    this.editor.forceUpdate();
  }
}