const express = require("express");
const {authenticate} = require("../../../middleware/v1/admin/authentication/authentication");
const {
    createMessage,
} = require("../../../controllers/v1/user/messages");

const router = express.Router({mergeParams: true});

router.route("/").post(createMessage)

module.exports = router;
