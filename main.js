var express = require("express")
var app = express()

app.set("view engine", "ejs")

var router = express.Router()

router.use(express.static("public"))

var webconfig = require("./webconfig")

function controller(name) {
	return require("./controllers" + name + "-controller")
}

router.get("/", function (request, response) {
	controller("home").get(request, response)
})

app.use(webconfig.root, router)

app.listen(8080, function () {
	console.log("Server started OK!")
})
