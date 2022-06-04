var session = require("./session")

function render(response, webconfig, errorMessage, model){
    model.getGeneralInfo(function (generalInfo){
        response.render('edit-general-info',{
            root: webconfig.root,
            logged: true,
            generalInfo: generalInfo,
            errorMessage: errorMessage
        })
    })
}

exports.get = function (request, response, webconfig, model){
    if(!session.logged(request)){
        response.redirect(webconfig.root)
        return
    }
    render(response, webconfig, false, model)
}

exports.post = function (request, response, webconfig, model){
    if(!session.logged(request)){
        response.redirect(webconfig.root)
        return
    }
    
    var featureImageTmpPath = request.file ? request.file.path : false
    model.editGeneralInfo(request.body, featureImageTmpPath, function(errorMessage){
        if(errorMessage){
            render(response, webconfig, errorMessage, model)
            return
        }
        response.redirect(webconfig.root)
    })
}