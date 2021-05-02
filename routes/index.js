const router = require("express").Router();

const apiRoutes = require("./api/api");
const htmlRoutes = require("./homeRoutes");

router.use("/", htmlRoutes);
router.use("/api", apiRoutes);

module.exports = router;
