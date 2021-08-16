export default class {
  $t = null;
  constructor($t) {
    this.$t = $t;
    this._packages = {
      eco: {
        name: this.$t("ECO PACKAGE"),
        credits: 500,
        description: this.$t("The economic recharge of credits at a low price!"),
        cost: "4.99€",
        type: "eco",
      },
      comfort: {
        name: this.$t("COMFORT PACKAGE"),
        credits: 1000,
        description: this.$t("The basic comfort recharge to be serene!"),
        cost: "9.99€",
        type: "comfort",
      },
      premium: {
        name: this.$t("PREMIUM PACKAGE"),
        credits: 5000,
        description: this.$t("Top up your sms credits with our premium package!"),
        cost: "14.99€",
        type: "premium",
      }
    }
  }
  getPackages() {
    return this._packages;
  }
}
