export class NotEmptyValidator {
  static nameValidator = "not_empty";
  static validate = (value, rule) => {
    let valid = (value != null && value !== '');
    if(Array.isArray(value)) {
      valid = value.length > 0;
    }
    return {
      type: NotEmptyValidator.nameValidator,
      valid,
      errorText: valid ? "" : rule.errorText,
      params: {}
    }
  }
}