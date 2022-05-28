var datasource = require("./datasource/simple-datasource")
var model = require("./model/model").create(datasource)

var express = require("express")
var app = express()

app.set("view engine", "ejs")
app.use(require("cookie-parser")())

var router = express.Router()
router.use(express.static("public"))
var webconfig = require("./webconfig")
var urlencodedParser = require("body-parser").urlencoded({ extended: false })

function controller(name) {
	return require("./controllers/" + name + "-controller")
}

router.get("/", function (request, response) {
	controller("home").get(request, response, webconfig, model)
})

router.get("/login", function (request, response) {
	controller("login").get(request, response, webconfig, model)
})

router.post("/login", urlencodedParser, function (request, response) {
	controller("login").post(request, response, webconfig, model)
})

router.get("/logout", function (request, response) {
	controller("logout").get(request, response, webconfig)
})

app.use(webconfig.root, router)

app.listen(8080, function () {
	console.log("Server started OK!")
})
