const express = require("express");
const {
    getServices,
} = require("../../../controllers/v1/user/services");

const router = express.Router({mergeParams: true});

router.route("/").get(getServices);


module.exports = router;
