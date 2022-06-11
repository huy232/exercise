exports.create = function (datasource) {
	return {
		authenticate: function (username, password, callback) {
			datasource.loadAccount(function (account) {
				var success =
					account.username == username && account.password == password
				callback(success)
			})
		},
		getGeneralInfo: datasource.loadGeneralInfo,

		editGeneralInfo: function (info, featureImageTmpPath, callback) {
			if (info.companyNameShort == "") {
				callback("Company name short cannot be empty")
				return
			}
			if (info.companyNameLong == "") {
				callback("Company name long cannot be empty")
				return
			}
			datasource.saveGeneralInfo(info, featureImageTmpPath, function (err) {
				if (err) {
					callback("Could not save general info")
					return
				}
				callback(false)
			})
		},
		getAbout: datasource.loadAbout,

		editAbout: function (text, callback) {
			if (text == "") {
				callback("About text cannot be empty")
				return
			}
			datasource.saveAbout(text, function (err) {
				if (err) {
					callback("Coul not save about text")
					return
				}
				callback(false)
			})
		},
	}
}
