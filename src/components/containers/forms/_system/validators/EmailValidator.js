export class EmailValidator {
  static nameValidator = "email";
  static validate = (value, rule) => {
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const match = value.match(mailformat);
    let valid = false;
    if(match || value == null || value == "") {
      valid = true;
    }
    return {
      type: EmailValidator.nameValidator,
      valid,
      errorText: valid ? "" : rule.errorText,
      params: {}
    }
  }
}
