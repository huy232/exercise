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

exports.loadGeneralInfo = function (callback) {
	fs.readFile(path("general-info.json"), function (err, data) {
		var generalInfo = JSON.parse(data)
		callback(generalInfo)
	})
}

exports.saveGeneralInfo = function (info, featureImageTmpPath, callback) {
	fs.writeFile(path("general-info.json"), JSON.stringify(info), function (err) {
		if (err) {
			callback(err)
			return
		}
		if (featureImageTmpPath) {
			fs.rename(featureImageTmpPath, "public/images/feature.jpg", callback)
			return
		}
		callback(false)
	})
}

exports.loadAbout = function (callback) {
	fs.readFile(path("about.txt"), function (err, data) {
		callback(data)
	})
}

exports.saveAbout = function (text, callback) {
	fs.writeFile(path("about.txt"), text, callback)
}
