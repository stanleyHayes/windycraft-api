const express = require("express");
const {authenticate} = require("../../../middleware/v1/admin/authentication/authentication");
const { getFAQs} = require("../../../controllers/v1/user/faqs");

const router = express.Router({mergeParams: true});

router.route("/").get(getFAQs);

module.exports = router;
