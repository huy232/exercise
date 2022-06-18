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

function loadProduct(productId, filePath, callback) {
	fs.readFile(filePath, function (err, data) {
		var product = JSON.parse(data)
		product.id = productId
		callback(product)
	})
}

function getProductsFolder() {
	return path("products")
}

function parseProductId(jsonFileName) {
	var idString = jsonFileName.substring(0, jsonFileName.length - 5)
	return parseInt(idString)
}

exports.loadProducts = function (callback) {
	var folder = getProductsFolder()

	fs.readdir(folder, function (err, files) {
		var count = 0
		var total = files.length
		var products = []

		for (let i = 0; i < total; ++i) {
			var filePath = folder + "/" + files[i]
			var productId = parseProductId(files[i])

			loadProduct(productId, filePath, function (product) {
				products.push(product)
				++count
				if (count == total) {
					callback(products)
				}
			})
		}
	})
}

function getNewProductId(folder, callback) {
	fs.readdir(folder, function (err, files) {
		var max = 0
		for (let i = 0; i < files.length; ++i) {
			var productId = parseProductId(files[i])
			if (productId > max) {
				max = productId
			}
		}
		callback(max + 1)
	})
}

exports.addProduct = function (name, imageTmpPath, callback) {
	var folder = getProductsFolder()

	getNewProductId(folder, function (id) {
		var product = { name: name }
		fs.writeFile(
			folder + "/" + id + ".json",
			JSON.stringify(product),
			function (err) {
				if (err) {
					callback(err)
					return
				}
				fs.rename(
					imageTmpPath,
					"public/images/products/" + id + ".jpg",
					callback
				)
			}
		)
	})
}
