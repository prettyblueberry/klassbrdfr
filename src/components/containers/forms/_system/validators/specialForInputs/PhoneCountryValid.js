export class PhoneCountryValid  {
  static nameValidator = "phone_country_valid";
  static validate = (value, rule) => {
    return {
      type: PhoneCountryValid.nameValidator,
      valid: value.valid,
      errorText: value.valid ? "" : rule.errorText,
      params: {}
    }
  }
}
