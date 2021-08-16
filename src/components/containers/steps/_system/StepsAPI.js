
export class StepsAPI {
  steps = null;
  constructor(steps) {
    this.steps = steps;
    /* example steps: [
      {
        id: "SMSEditor",
        component: <SMSEditorStep/>,
        data: null,
      }
    ] */
    this.stepSettings = {
      currentSteps: [],
      allSteps: [],
    };
  }
  setAllSteps = (steps) => {
    this.stepSettings.allSteps = steps;
  }
  getStepFromAll(stepId) {
    let step = null;
    this.stepSettings.allSteps.some((_step) => {
      if(_step.component.props.id == stepId){
        step = _step;
        return true;
      }
      return false;
    });
    return step;
  }
  getCurrentStepById(stepId) {
    let step = null;
    let indexStep = -1;
    this.stepSettings.currentSteps.some((_step, _indexStep) => {
      if(_step.component.props.id == stepId){
        step = _step;
        indexStep = _indexStep;
        return true;
      }
      return false;
    });
    return {step, indexStep};
  }
  addStep = (stepId, data) => {
    const step = this.getStepFromAll(stepId);
    if(step) {
      this.stepSettings.currentSteps.push(step);
      if(data){
        this.stepSettings.currentSteps[this.stepSettings.currentSteps.length - 1].data = data;
      }
      this.updateViewSteps();
    }
  }
  goBack() {
    if(this.stepSettings.currentSteps.length > 1) {
      this.stepSettings.currentSteps.splice(-1,1);
      this.updateViewSteps();
    }
  }
  updateStepData(data, componentStep) {
    const stepId = componentStep.props.id || null;
    if(stepId) {
      const {step, indexStep} = this.getCurrentStepById(stepId);
      this.stepSettings.currentSteps[indexStep].data = data;
    }
  }
  getStepData(stepId) {
    const {step, indexStep} = this.getCurrentStepById(stepId);
    if(step) {
      return step;
    }
    return undefined;
  }
  updateViewSteps = () => {
    this.steps.forceUpdate();
  }
  getLastStep() {
    if(this.stepSettings.currentSteps.length > 0) {
      return this.stepSettings.currentSteps[this.stepSettings.currentSteps.length -1];
    }
    return null;
  }
  renderLastStep() {
    return this.getLastStep() ? this.getLastStep().component : null;
  }
}
