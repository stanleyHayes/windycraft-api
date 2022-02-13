const express = require("express");
const {
    getClients,
} = require("../../../controllers/v1/user/clients");

const router = express.Router({mergeParams: true});

router.route("/").get(getClients);
module.exports = router;
