export const LoaderActions = {
	show: function (msg) {
		return {
      msg,
			type: "LOADER.SHOW"
		}
  },
  hide: function () {
		return {
			type: "LOADER.HIDE"
		}
	}
}
