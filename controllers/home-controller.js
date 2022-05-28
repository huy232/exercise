var session = require("./session")

exports.get = function (request, response, webconfig, model) {
	var logged = session.logged(request)
	response.render("home", {
		root: "",
		logged: logged,
	})
}
