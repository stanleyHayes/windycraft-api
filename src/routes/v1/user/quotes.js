const express = require("express");
const {createQuote} = require("../../../controllers/v1/user/quotes");

const router = express.Router({mergeParams: true});

router.route("/").post( createQuote);

module.exports = router;
