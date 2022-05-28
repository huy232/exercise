exports.logged = function (request) {
	return request.cookies.logged ? true : false
}

exports.setLogged = function (response) {
	response.cookie("logged", true)
}

exports.clear = function (response) {
	response.clearCookie("logged")
}
