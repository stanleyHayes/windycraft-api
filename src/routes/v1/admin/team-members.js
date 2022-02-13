const express = require("express");
const {authenticate} = require("../../../middleware/v1/admin/authentication/authentication");
const {
    updateTeamMember,
    getTeamMembers,
    getTeamMember,
    deleteTeamMember,
    createTeamMember
} = require("../../../controllers/v1/admin/team-members");

const router = express.Router({mergeParams: true});

router.route("/")
    .post(authenticate, createTeamMember)
    .get(authenticate, getTeamMembers);

router.route('/:id').get(getTeamMember).put(updateTeamMember).delete(deleteTeamMember);

module.exports = router;
