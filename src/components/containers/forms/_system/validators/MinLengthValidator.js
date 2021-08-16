export class  MinLengthValidator {
  static nameValidator = "min_length";
  static validate = (value, rule) => {
    let valid = true;
    if(rule.validationProperties && rule.validationProperties.min) {
      valid = value.length >= rule.validationProperties.min;
    }
    return {
      type: MinLengthValidator.nameValidator,
      valid,
      errorText: valid ? "" : rule.errorText,
      params: rule.validationProperties || {}
    }
  }
}
