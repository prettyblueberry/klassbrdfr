/** This validator return always valid value */
export const DefaultValidator = {

  validate: function() {
    return {
      type: "none_validation",
      valid: true,
      errorText: "",
      params: {}
    }
  }

}