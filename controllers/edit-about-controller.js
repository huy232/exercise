var session = require("./session")

function render(response, webconfig, errorMessage, model) {
	model.getGeneralInfo(function (generalInfo) {
		model.getAbout(function (about) {
			response.render("edit-about", {
				root: webconfig.root,
				logged: true,
				generalInfo: generalInfo,
				about: about,
				errorMessage: errorMessage,
			})
		})
	})
}

exports.get = function (request, response, webconfig, model) {
	if (!session.logged(request)) {
		response.redirect(webconfig.root)
		return
	}
	render(response, webconfig, false, model)
}

exports.post = function (request, response, webconfig, model) {
	if (!session.logged(request)) {
		response.redirect(webconfig.root)
		return
	}

	model.editAbout(request.body.about, function (errorMessage) {
		if (errorMessage) {
			render(response, webconfig, errorMessage, model)
			return
		}
		response.redirect(webconfig.root + "#about")
	})
}
