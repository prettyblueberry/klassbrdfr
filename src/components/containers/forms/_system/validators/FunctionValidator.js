export class FunctionValidator {
 static nameValidator = "function";
 static validate = (value, rule) => {
    let valid = true;
    if(rule.validationProperties && typeof rule.validationProperties.func === "function") {
      valid = (rule.validationProperties.func(value));
    }
    return {
      type: FunctionValidator.nameValidator,
      valid,
      errorText: valid ? "" : rule.errorText,
      params: {}
    }
  }
}
