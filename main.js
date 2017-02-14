const fs = require("fs");
const response = require("ringo/jsgi/response");

exports.app = function(req) {
    if (req.pathInfo === "/") {
        return response.static(module.resolve("./index.html"));
    } else if (req.pathInfo === "/sintel-test.mp4") {
        return req.headers.range != null ?
            response.range(req, module.resolve("./sintel-test.mp4"), fs.size(module.resolve("./sintel-test.mp4")), "video/mp4") :
            response.static(module.resolve("./sintel-test.mp4"))
    }

    return response.html("<h1>Not Found</h1>").notFound();
};

if (require.main == module) {
    require("ringo/httpserver").main(module.id);
}