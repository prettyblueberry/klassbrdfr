export const AuthActions = {
	login: function ({user, klassboard_token}) {
		return {
			user,
			klassboard_token,
			type: "AUTH.USER_LOGIN"
		}
  },
  logout: function () {
		return {
			type: "AUTH.USER_LOGOUT"
		}
	}
}