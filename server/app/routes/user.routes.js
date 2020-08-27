const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

/**
 * Routes for the different roles
 */
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", controller.allAccess);

  app.get(
    "/api/test/user",
    [authJwt.verifyToken],
    controller.userBoard
  );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );

  app.get(
    "/api/test/farmer",
    [authJwt.verifyToken, authJwt.isFarmer],
    controller.farmerBoard
  );

  app.get(
    "/api/test/helper",
    [authJwt.verifyToken, authJwt.isHelper],
    controller.helperBoard
  );
};