var session = require("./session")

function render(response, webconfig, product, errorMessage, model) {
	model.getGeneralInfo(function (generalInfo) {
		response.render("edit-product", {
			root: webconfig.root,
			logged: true,
			generalInfo: generalInfo,
			product: product,
			errorMessage: errorMessage,
		})
	})
}

exports.get = function (request, response, webconfig, model) {
	if (!session.logged(request)) {
		response.redirect(webconfig.root)
		return
	}
	model.getProduct(request.query.id, function (product) {
		render(response, webconfig, product, false, model)
	})
}

exports.post = function (request, response, webconfig, model) {
	if (!session.logged(request)) {
		response.redirect(webconfig.root)
		return
	}

	var productId = request.body.productId
	var productName = request.body.productName
	var imageTmpPath = request.file ? request.file.path : ""

	model.addProduct(
		productId,
		productName,
		imageTmpPath,
		function (errorMessage) {
			if (errorMessage) {
				var product = { id: productId, name: productName }
				render(response, webconfig, product, errorMessage, model)
				return
			}
			response.redirect(webconfig.root + "#products")
		}
	)
}
