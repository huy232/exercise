var fs = require("fs")

function path(file) {
	return "data/" + file
}

exports.loadAccount = function (callback) {
	fs.readFile(path("account.json"), function (err, data) {
		var account = JSON.parse(data)
		callback(account)
	})
}
