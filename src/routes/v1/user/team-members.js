const express = require("express");
const {authenticate} = require("../../../middleware/v1/admin/authentication/authentication");
const {
    getTeamMembers,
} = require("../../../controllers/v1/user/team-members");

const router = express.Router({mergeParams: true});

router.route("/").get(getTeamMembers);

module.exports = router;
