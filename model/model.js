exports.create = function (datasource) {
	return {
		authenticate: function (username, password, callback) {
			datasource.loadAccount(function (account) {
				var success =
					account.username == username && account.password == password
				callback(success)
			})
		},
	}
}
