var session = require("./session")

exports.get = function (request, response, webconfig) {
	session.clear(response)
	response.redirect(webconfig.root)
}
