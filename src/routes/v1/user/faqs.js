const express = require("express");
const { getFAQs} = require("../../../controllers/v1/user/faqs");

const router = express.Router({mergeParams: true});

router.route("/").get(getFAQs);

module.exports = router;
